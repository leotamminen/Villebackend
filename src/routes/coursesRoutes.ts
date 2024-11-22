import { Router, Request, Response } from "express";
import { Course } from "../models"; // Import the Course model
import { Exercise } from "../models"; // Import the Exercise model

const router = Router();

// Route to get all courses
router.get("/", async (req: Request, res: Response) => {
  try {
    const courses = await Course.find(); // Fetch all courses from MongoDB
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
});

// Route to get a specific course by ID
router.get("/:id", async (req: Request, res: Response) => {
  const courseId = parseInt(req.params.id);
  try {
    const course = await Course.findOne({ id: courseId }); // Find course by ID
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Failed to fetch course" });
  }
});

// Route to get all exercises for a specific course
router.get("/:id/exercises", async (req: Request, res: Response) => {
  const courseId = parseInt(req.params.id);
  try {
    const exercises = await Exercise.find({ courseId }); // Find exercises by courseId
    if (exercises.length > 0) {
      res.json(exercises);
    } else {
      res.status(404).json({ message: "No exercises found for this course" });
    }
  } catch (error) {
    console.error("Error fetching exercises:", error);
    res.status(500).json({ message: "Failed to fetch exercises" });
  }
});

// Route to get a specific exercise by ID within a course
router.get("/:id/exercises/:exerciseId", async (req: Request, res: Response) => {
  const courseId = parseInt(req.params.id);
  const exerciseId = parseInt(req.params.exerciseId);
  try {
    const exercise = await Exercise.findOne({ courseId, id: exerciseId }); // Find exercise by courseId and id
    if (exercise) {
      res.json(exercise);
    } else {
      res.status(404).json({ message: "Exercise not found" });
    }
  } catch (error) {
    console.error("Error fetching exercise:", error);
    res.status(500).json({ message: "Failed to fetch exercise" });
  }
});

export default router;