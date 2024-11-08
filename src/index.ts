// src/index.ts

import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Sample data
const courses = [
    { id: 1, name: "Ohpe" },
    { id: 2, name: "Fullstack" },
];

// Exercises dataset
const exercises: {
    [key: number]: {
        id: number;
        name: string;
        description: string;
        programmingLanguage: string;
        Exercise_code: string;
        Submitted_code: string;
    }[];
} = {
    1: [
        {
            id: 101,
            name: "Hello World",
            description: 'Write a program that prints "Hello, World!"',
            programmingLanguage: "JavaScript",
            Exercise_code: "",
            Submitted_code: ""
        },
        {
            id: 102,
            name: "Variables and Types",
            description: "Declare variables of different types and log them to the console",
            programmingLanguage: "JavaScript",
            Exercise_code: "",
            Submitted_code: ""
        },
    ],
    2: [
        {
            id: 201,
            name: "Asynchronous Code",
            description: "Write a function that fetches data asynchronously",
            programmingLanguage: "JavaScript",
            Exercise_code: "",
            Submitted_code: ""
        },
    ],
};

// Middleware to parse JSON bodies
app.use(express.json());

// Route to get all courses
app.get('/courses', (req: Request, res: Response) => {
    res.json(courses);
});

// Route to get a specific course by ID
app.get('/courses/:id', (req: Request, res: Response) => {
    const courseId = parseInt(req.params.id);
    const course = courses.find((c) => c.id === courseId);

    if (course) {
        res.json(course);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

// Route to get all exercises for a specific course
app.get('/courses/:id/exercises', (req: Request, res: Response) => {
    const courseId = parseInt(req.params.id);
    const courseExercises = exercises[courseId];

    if (courseExercises) {
        res.json(courseExercises);
    } else {
        res.status(404).json({ message: 'Exercises not found for this course' });
    }
});


// Route to get a specific exercise by ID within a course
app.get('/courses/:id/exercises/:exerciseId', (req: Request, res: Response) => {
    const courseId = parseInt(req.params.id);
    const exerciseId = parseInt(req.params.exerciseId);
    const courseExercises = exercises[courseId];

    if (courseExercises) {
        const exercise = courseExercises.find((ex) => ex.id === exerciseId);
        if (exercise) {
            res.json(exercise);
        } else {
            res.status(404).json({ message: 'Exercise not found' });
        }
    } else {
        res.status(404).json({ message: 'Exercises not found for this course' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
