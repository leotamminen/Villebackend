import express, { Request, Response } from "express";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { homePageHTML } from "./homepage";
import coursesRoutes from "./routes/coursesRoutes";
import usersRoutes from "./routes/usersRoutes";
import solutionsRoutes from "./routes/solutionsRoutes";
import { connectDB } from "./db";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Declare a global property for MongoDB connection status
declare global {
  var mongoConnected: boolean | undefined;
}

//  Checks that `connectDB()` is only called once
if (!globalThis.mongoConnected) {
  connectDB();
  globalThis.mongoConnected = true;
}

// Start the server (only once)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Root or the homepage route
app.get("/", (req: Request, res: Response) => {
  res.send(homePageHTML);
});

// Use the courses routes
app.use("/courses", coursesRoutes);

// Use the users routes
app.use("/users", usersRoutes);

// Use the solutions routes
app.use("/solutions", solutionsRoutes);

// Export the handler for Vercel
export default (req: VercelRequest, res: VercelResponse) => {
  app(req as any, res as any);
};
