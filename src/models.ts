import mongoose, { Schema, Document, Types } from "mongoose";

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
  correctAnswer?: string; // Add correctAnswer (not returned to the user) right now is.
}

const ExerciseSchema = new Schema<IExercise>({
  id: { type: Number, required: true, unique: true },
  courseId: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  programmingLanguage: { type: String, required: true },
  Exercise_code: { type: String, required: true },
  Submitted_code: { type: String, default: "" },
  correctAnswer: { type: String, select: true }, // remember to change to false (later) ((!! Not included in the JSON return))
});

export const Exercise = mongoose.model<IExercise>(
  "Exercise",
  ExerciseSchema,
  "exercises"
); // Explicitly map to the "exercises" collection

// User Model
interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  password_hash: string;
  registered_courses: number[];
}

const UserSchema = new Schema<IUser>({
  _id: { type: Schema.Types.ObjectId, required: true },
  username: { type: String, required: true },
  password_hash: { type: String, required: true },
  registered_courses: { type: [Number], default: [] },
});

export const User = mongoose.model<IUser>(
  "User",
  UserSchema,
  "users"
);

// Solution Model
interface ISolutions extends Document {
  _id: {type: mongoose.Schema.Types.ObjectId, required: true, auto: true,}
  courseId: number;
  exerciseId: number;
  userId: String;
  solution: string;
}

const SolutionSchema = new Schema<ISolutions>({
  courseId: { type: Number, required: true },
  exerciseId: { type: Number, required: true },
  userId: { type: String, required: true },
  solution: { type: String, required: true },
});

export const Solution = mongoose.model<ISolutions>(
  "Solution",
  SolutionSchema,
  "solutions"
);