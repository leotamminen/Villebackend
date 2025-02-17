import { Router, Request, Response } from "express";
import { User } from "../models";

const router = Router();

// Route to get user data by username, used by current "login"
router.get("/:username", async (req: Request, res: Response) => {
    const username = req.params.username;
  
    try {
      // Find user by username
      const user = await User.findOne({ username }).select("_id registered_courses");
  
      if (user) {
        res.json({ _id: user._id, registered_courses: user.registered_courses });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

export default router;