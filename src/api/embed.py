from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, constr
from sentence_transformers import SentenceTransformer, util
import os
from functools import lru_cache
from concurrent.futures import ThreadPoolExecutor
import asyncio


app = FastAPI()

# Load the model (use an environment variable or default)
model = SentenceTransformer(os.getenv("MODEL_NAME", "paraphrase-albert-small-v2"))
executor = ThreadPoolExecutor(max_workers=4)

MAX_LENGTH = 5000  # Adjust based on your requirements

class SubmissionRequest(BaseModel):
    user_submission: str
    example_solution: str

@app.get("/")
async def root():
    """Simple GET request to check if API is running"""
    return {"message": "Sentence Similarity API is running!"}

@app.get("/api/score")
async def get_example():
    """Example usage for GET request (read-only, no computation)"""
    return {
        "info": "Use POST /api/score to submit your code for evaluation.",
        "example_request": {
            "user_submission": "let a = 1; let b = 2; let sum = a + b;",
            "example_solution": "let num1 = 1; let num2 = 2; let sum = num1 + num2;"
        }
    }

class SubmissionRequest(BaseModel):
    user_submission: str
    example_solution: str

@lru_cache(maxsize=1000)
def cached_encode(text: str):
    return model.encode(text, convert_to_tensor=True)

async def async_encode(text: str):
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(executor, cached_encode, text)

@app.post("/api/score")
async def score_submission(request: SubmissionRequest):
    if len(request.user_submission) > MAX_LENGTH or len(request.example_solution) > MAX_LENGTH:
        raise HTTPException(
            status_code=400,
            detail=f"Submission or solution exceeds maximum length of {MAX_LENGTH} characters."
        )
    try:
        user_emb, example_emb = await asyncio.gather(
            async_encode(request.user_submission),
            async_encode(request.example_solution)
        )
        
        similarity = util.cos_sim(user_emb, example_emb).item()
        return {"score": f"{round(similarity * 10)}/10"}
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Processing error: {str(e)}"
        )

# Example usage for local testing (Optional)
#if __name__ == "__main__":
#    import uvicorn
#    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
