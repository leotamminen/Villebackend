import { Router, Request, Response } from "express";
import { Solution } from "../models";
import { Exercise } from "../models";

const router = Router();

// Route to get specific solutions
router.get("/:courseId/:exerciseId/:userId", async (req: Request, res: Response) => {
    const { courseId, exerciseId, userId } = req.params;

  try {
    const solution = await Solution.findOne({
        courseId: courseId,
        exerciseId:exerciseId,
        userId: userId });

    if (solution){
        res.json(solution?.solution); // return user-saved solution
    } else {
        const exercise = await Exercise.findOne({
            courseId: courseId,
            id: exerciseId
        })
        res.json(exercise?.Exercise_code)} // return default exercise_code

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
        let existingSolution = await Solution.findOne({
            courseId: courseId,
            exerciseId:exerciseId,
            userId: userId });

        if (existingSolution) {
            // Update existing solution
            existingSolution.solution = solution;
            await existingSolution.save();
            res.json({ message: "Solution updated", solution: existingSolution });
        } else {
            // Create new solution
            const newSolution = await Solution.create({ 
                courseId: courseId,
                exerciseId: exerciseId,
                userId: userId,
                solution: solution });
            res.json({ message: "Solution created", solution: newSolution });
        }
    } catch (error) {
        console.error("Error submitting solution:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});

export default router;