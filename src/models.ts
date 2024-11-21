import mongoose, { Schema, Document } from "mongoose";

// Course Model
interface ICourse extends Document {
  id: number;
  name: string;
}

const CourseSchema = new Schema<ICourse>({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
});

export const Course = mongoose.model<ICourse>(
  "Course",
  CourseSchema,
  "courses"
); // Explicitly map to the "courses" collection

// Exercise Model
interface IExercise extends Document {
  id: number;
  courseId: number;
  name: string;
  description: string;
  programmingLanguage: string;
  Exercise_code: string;
  Submitted_code: string;
}

const ExerciseSchema = new Schema<IExercise>({
  id: { type: Number, required: true },
  courseId: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  programmingLanguage: { type: String, required: true },
  Exercise_code: { type: String, required: true },
  Submitted_code: { type: String, default: "" },
});

export const Exercise = mongoose.model<IExercise>(
  "Exercise",
  ExerciseSchema,
  "exercises"
); // Explicitly map to the "exercises" collection
