import express, { Request, Response } from "express";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { homePageHTML } from "./homepage";
import coursesRoutes from "./routes/coursesRoutes";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// port 3000 for local dev
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

// Export the handler for Vercel
export default (req: VercelRequest, res: VercelResponse) => {
  app(req as any, res as any);
};
