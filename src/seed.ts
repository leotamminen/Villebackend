import { connectDB } from "./db";
import { Course, Exercise } from "./models";

// Example courses and exercises data
const courses = [
  { id: 1, name: "Ohpe" },
  { id: 2, name: "Fullstack" },
  { id: 3, name: "Python Basics" },
  { id: 4, name: "Web Development" },
];

const exercises = [
  {
    id: 101,
    courseId: 1,
    name: "Hello World",
    description: 'Print "Hello, World!"',
    programmingLanguage: "JavaScript",
    Exercise_code: 'console.log("Hello, World!");',
    Submitted_code: "",
  },
  {
    id: 102,
    courseId: 1,
    name: "Variables",
    description: "Declare variables and log them",
    programmingLanguage: "JavaScript",
    Exercise_code: "const x = 10;\nconsole.log(x);",
    Submitted_code: "",
  },
  {
    id: 201,
    courseId: 2,
    name: "Fetch Data",
    description: "Fetch data using async/await",
    programmingLanguage: "JavaScript",
    Exercise_code:
      'async function fetchData() {\n  const res = await fetch("https://api.example.com");\n  console.log(await res.json());\n}',
    Submitted_code: "",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Course.deleteMany({});
    await Exercise.deleteMany({});

    // Insert courses
    await Course.insertMany(courses);
    console.log("Courses seeded successfully");

    // Insert exercises
    await Exercise.insertMany(exercises);
    console.log("Exercises seeded successfully");

    process.exit(0); // Exit script
  } catch (error) {
    console.error("Failed to seed database:", error);
    process.exit(1);
  }
};

seedDatabase();
