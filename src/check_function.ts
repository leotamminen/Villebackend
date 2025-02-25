import { getExerciseById } from "./db";

/**
 * Checks the submitted code against the correct answer.
 * Returns only the result (correct, incorrect, partial), but never the correct answer.
 */
export async function checkSubmission(
  exerciseId: number,
  submittedCode: string
): Promise<{ exerciseId: number; result: string }> {
  try {
    console.log(`🔎 Checking submission for Exercise ID: ${exerciseId}`);

    const exercise = await getExerciseById(exerciseId);

    if (!exercise) {
      console.error(`❌ Exercise ${exerciseId} not found in database.`);
      throw new Error("Exercise not found");
    }

    const correctAnswer = exercise.correctAnswer;
    if (!correctAnswer) {
      console.error(
        `⚠️ Exercise ${exerciseId} does not have a correct answer.`
      );
      throw new Error("Correct answer not available");
    }

    console.log(`✅ Retrieved correct answer for Exercise ${exerciseId}`);

    // Compare the submitted code with the correct answer
    const similarity = compareCode(submittedCode, correctAnswer);

    let result: string;
    if (similarity === 1) {
      result = "correct";
    } else if (similarity > 0.7) {
      result = "partial"; // Almost correct
    } else {
      result = "incorrect";
    }

    return { exerciseId, result };
  } catch (error) {
    console.error("Error in checkSubmission:", error);
    return { exerciseId, result: "error" };
  }
}

/**
 * Compares two pieces of code using a Levenshtein distance-based method.
 */
function compareCode(submitted: string, correct: string): number {
  submitted = submitted.trim();
  correct = correct.trim();

  if (submitted === correct) {
    return 1; // Fully correct
  }

  const distance = levenshteinDistance(submitted, correct);
  const maxLength = Math.max(submitted.length, correct.length);

  return 1 - distance / maxLength; // Normalize distance to 0-1 range
}

/**
 * Levenshtein distance (calculates how many changes needed to convert one string to another).
 */
function levenshteinDistance(a: string, b: string): number {
  const dp: number[][] = Array(a.length + 1)
    .fill(null)
    .map(() => Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[a.length][b.length];
}
