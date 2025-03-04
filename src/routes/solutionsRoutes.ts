import { Router, Request, Response } from "express";
import { Solution } from "../models";
import { Exercise } from "../models";
import { checkSubmission } from "../check_function";

const router = Router();

// Helper function to give descriptions to every scores 1-10.
function getScoreDescription(score: number): string {
  const descriptions: { [key: number]: string[] } = {
    1: ["Incorrect.", "Not even close.", "Way off!"],
    2: ["Needs serious work.", "Very poor.", "Barely started."],
    3: [
      "Needs improvement.",
      "Not great, keep trying.",
      "Lots of room for improvement.",
    ],
    4: ["Getting there.", "A small step forward.", "Could be better."],
    5: ["Halfway there.", "You're making progress.", "Not bad, keep going!"],
    6: ["Decent effort.", "More than halfway!", "You're getting closer!"],
    7: ["Good!", "You're doing well!", "Keep up the good work!"],
    8: ["Very good!", "Almost there!", "Looking solid!"],
    9: ["Almost perfect!", "Just a small tweak needed!", "So close!"],
    10: ["Perfect!", "Flawless!", "You nailed it!"],
  };

  const options = descriptions[score] || ["Unknown score."]; // Default if something breaks
  return options[Math.floor(Math.random() * options.length)]; // Pick a random phrase
}

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

      res.json({
        message: "Solution processed",
        score: `${score}/10 - ${getScoreDescription(score)}`, // Merged into one string
      }); // string format
    } catch (error) {
      console.error("Error submitting solution:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  }
);

export default router;
