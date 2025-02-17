import { Router, Request, Response } from "express";
import { Solution } from "../models";

const router = Router();

// Route to get all solutions by userId
router.get("/:userId", async (req: Request, res: Response) => {
    const courseId = parseInt(req.params.id);
    const exerciseId = parseInt(req.params.exerciseId);
    const userId = parseInt(req.params.userId);
  try {
    const solutions = await Solution.findOne({ where: { courseId, id: exerciseId, userId } });
    res.json(solutions);
  } catch (error) {
    console.error("Error fetching solutions:", error);
    res.status(500).json({ message: "Failed to fetch solutions" });
  }
});

// Route to put (update or create) solutions
router.put("/:courseId/:exerciseId/:userId/submit", async (req: Request, res: Response) => {
    const { courseId, exerciseId, userId } = req.params;
    const { solution } = req.body;

    try {
        // Check if the solution exists
        let existingSolution = await Solution.findOne({ where: { courseId, exerciseId, userId } });

        if (existingSolution) {
            // Update existing solution
            existingSolution.solution = solution;
            await existingSolution.save();
            res.json({ message: "Solution updated", solution: existingSolution });
        } else {
            // Create new solution
            const newSolution = await Solution.create({ courseId, id: exerciseId, userId, solution });
            res.json({ message: "Solution created", solution: newSolution });
        }
    } catch (error) {
        console.error("Error submitting solution:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});

export default router;