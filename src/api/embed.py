from sentence_transformers import SentenceTransformer, util
from fastapi import FastAPI
from pydantic import BaseModel
import os

app = FastAPI()

# Load the model (use an environment variable or default)
model_name = os.getenv("MODEL_NAME", "sentence-transformers/paraphrase-albert-small-v2")
model = SentenceTransformer(model_name)

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

@app.post("/api/score")
async def score_submission_api(request: SubmissionRequest):
    """API endpoint to score user submissions based on similarity to example solutions."""
    embedding_1 = model.encode(request.user_submission, convert_to_tensor=True)
    embedding_2 = model.encode(request.example_solution, convert_to_tensor=True)

    # Compute cosine similarity
    similarity = util.pytorch_cos_sim(embedding_1, embedding_2).item()

    # Convert similarity to a percentage score
    score = round(similarity * 10)
    
    return {"score": f"{score}/10"}

# Example usage for local testing (Optional)
#if __name__ == "__main__":
#    import uvicorn
#    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
