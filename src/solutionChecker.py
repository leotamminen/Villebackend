from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer("paraphrase-MiniLM-L6-v2")

def score_submission(user_submission, example_solution):
    # Compute embeddings
    embedding_1 = model.encode(user_submission, convert_to_tensor=True)
    embedding_2 = model.encode(example_solution, convert_to_tensor=True)

    # Compute cosine similarity
    similarity = util.pytorch_cos_sim(embedding_1, embedding_2).item()

    # Convert similarity to a percentage score
    score = round(similarity * 10)
    return score

# Example usage
example_solution = """
let num1 = 1;
let num2 = 10;
let sum = num2 + num1;
console.log(sum);"""

user_submission = """
// define variables
let n1 = 10;
let n2 = 1;
let sum = n1 + n2;
// print
console.log(sum); """

score = score_submission(user_submission, example_solution)
print(f"Submission Score: {score}/10")