import { Router, Request, Response } from "express";
import { Solution } from "../models";
import { Exercise } from "../models";
import { checkSubmission } from "../check_function";

const router = Router();

// Route to get specific solutions
router.get(
  "/:courseId/:exerciseId/:userId",
  async (req: Request, res: Response) => {
    const { courseId, exerciseId, userId } = req.params;

    try {
      const solution = await Solution.findOne({
        courseId: courseId,
        exerciseId: exerciseId,
        userId: userId,
      });

      if (solution) {
        res.json(solution?.solution); // return user-saved solution
      } else {
        const exercise = await Exercise.findOne({
          courseId: courseId,
          id: exerciseId,
        });
        res.json(exercise?.Exercise_code);
      } // return default exercise_code
    } catch (error) {
      console.error("Error fetching solutions:", error);
      res.status(500).json({ message: "Failed to fetch solutions" });
    }
  }
);

// Route to put (update or create) solutions
router.put(
  "/:courseId/:exerciseId/:userId/submit",
  async (req: Request, res: Response) => {
    const { courseId, exerciseId, userId } = req.params;
    const { solution } = req.body;

    try {
      // Tarkista, onko ratkaisu jo olemassa
      let existingSolution = await Solution.findOne({
        courseId,
        exerciseId,
        userId,
      });

      if (existingSolution) {
        existingSolution.solution = solution;
        await existingSolution.save();
      } else {
        existingSolution = new Solution({
          courseId,
          exerciseId,
          userId,
          solution,
        });
        await existingSolution.save();
      }

      // Return the score to frontend as string
      const checkResult = await checkSubmission(parseInt(exerciseId), solution);
      const score = checkResult.score; // now 1/10 to 10/10 format

      res.json({ message: "Solution processed", score: score.toString() }); // string format
    } catch (error) {
      console.error("Error submitting solution:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  }
);

export default router;
