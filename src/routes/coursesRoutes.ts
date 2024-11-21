import { Router, Request, Response } from "express";
import { courses } from "../data/courses";
import { exercises } from "../data/exercises";

const router = Router();

interface Params {
  id: string; // Course ID as a string
  exerciseId: string; // Exercise ID as a string
}

interface Body {
  submittedCode: string; // Submitted code should be a string
}

// Route to get all courses
router.get("/", (req: Request, res: Response) => {
  res.json(courses);
});

// Route to get a specific course by ID
router.get("/:id", (req: Request, res: Response) => {
  const courseId = parseInt(req.params.id);
  const course = courses.find((c) => c.id === courseId);

  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

// Route to get all exercises for a specific course
router.get("/:id/exercises", (req: Request, res: Response) => {
  const courseId = parseInt(req.params.id);
  const courseExercises = exercises[courseId];

  if (courseExercises) {
    res.json(courseExercises);
  } else {
    res.status(404).json({ message: "Exercises not found for this course" });
  }
});

// Route to get a specific exercise by ID within a course
router.get("/:id/exercises/:exerciseId", (req: Request, res: Response) => {
  const courseId = parseInt(req.params.id);
  const exerciseId = parseInt(req.params.exerciseId);
  const courseExercises = exercises[courseId];

  if (courseExercises) {
    const exercise = courseExercises.find((ex) => ex.id === exerciseId);
    if (exercise) {
      res.json(exercise);
    } else {
      res.status(404).json({ message: "Exercise not found" });
    }
  } else {
    res.status(404).json({ message: "Exercises not found for this course" });
  }
});

// PUT route to submit/update code for an exercise
router.put(
  "/:id/exercises/:exerciseId/submit",
  (req: Request<Params, any, Body>, res: Response) => {
    const courseId = parseInt(req.params.id);
    const exerciseId = parseInt(req.params.exerciseId);
    const { submittedCode } = req.body;

    if (!submittedCode) {
      res.status(400).json({ message: "Submitted code is required" });
    }

    const courseExercises = exercises[courseId];

    if (courseExercises) {
      const exercise = courseExercises.find((ex) => ex.id === exerciseId);
      if (exercise) {
        exercise.Submitted_code = submittedCode;

        res.status(200).json({
          message: "Code updated successfully",
          exercise,
        });
      } else {
        res.status(404).json({ message: "Exercise not found" });
      }
    } else {
      res.status(404).json({ message: "Exercises not found for this course" });
    }
  }
);

export default router;
