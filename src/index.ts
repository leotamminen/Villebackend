import express, { Request, Response } from "express";
import { homePageHTML } from "./homepage";
import coursesRoutes from "./routes/coursesRoutes";
import usersRoutes from "./routes/usersRoutes";
import solutionsRoutes from "./routes/solutionsRoutes";
import { connectDB } from "./db";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB (Ensure it's only called once)
declare global {
  var mongoConnected: boolean | undefined;
}

if (!globalThis.mongoConnected) {
  connectDB();
  globalThis.mongoConnected = true;
}

// Root or homepage route
app.get("/", (req: Request, res: Response) => {
  res.send(homePageHTML);
});

app.use("/courses", coursesRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/solutions", solutionsRoutes);

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running locally on http://localhost:${PORT}`);
  });
}

export default app;
