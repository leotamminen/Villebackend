import { Router, Request, Response } from "express";
import axios from "axios";
import { Solution } from "../models";
import { Exercise } from "../models";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

// Route to GET specific solutions
router.get(
  "/:courseId/:exerciseId/:userId",
  async (req: Request, res: Response) => {
    const { courseId, exerciseId, userId } = req.params;

    try {
      const solution = await Solution.findOne({ courseId, exerciseId, userId });

      if (solution) {
        res.json(solution?.solution); // Return user-saved solution
      } else {
        const exercise = await Exercise.findOne({ courseId, id: exerciseId });
        res.json(exercise?.Exercise_code); // Return default exercise_code
      }
    } catch (error) {
      console.error("Error fetching solutions:", error);
      res.status(500).json({ message: "Failed to fetch solutions" });
    }
  }
);

// Route to PUT solutions (Uses FastAPI from .env)
// Changed from POST to PUT!
router.put(
  "/:courseId/:exerciseId/:userId/submit",
  async (req: Request, res: Response): Promise<void> => {
    const { courseId, exerciseId, userId } = req.params;
    const { solution } = req.body;

    try {
      // Fetch the correct answer from the Exercise model
      const exercise = await Exercise.findOne({
        courseId,
        id: exerciseId,
      }).lean();

      if (!exercise) {
        res.status(404).json({ message: "Exercise not found" });
        return;
      }

      const example_solution = exercise.correctAnswer;

      // This uses the FastAPI URL from env variables!!!!
      const fastApiUrl = process.env.FASTAPI_SCORE_URL;
      if (!fastApiUrl) {
        throw new Error("FASTAPI_SCORE_URL is not defined in .env");
      }

      // Call the FastAPI to get the similarity score
      const apiResponse = await axios.post<{ score: string }>(fastApiUrl, {
        user_submission: solution,
        example_solution: example_solution,
      });

      const score = apiResponse.data.score; // Get score from FastAPI response

      // Find and update existing solution (or create if not found)
      const updatedSolution = await Solution.findOneAndUpdate(
        { courseId, exerciseId, userId },
        { solution },
        { new: true, upsert: true } // upsert ensures a new document is created if it doesn't exist
      );

      if (!updatedSolution) {
        res.status(500).json({ message: "Failed to update solution" });
        return;
      }

      res.status(200).json({
        message: "Solution updated successfully",
        score,
        solution: updatedSolution,
      });
    } catch (error: any) {
      console.error("Error updating solution:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
);

export default router;
