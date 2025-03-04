import bcrypt from "bcryptjs";

import express, { Request, Response } from "express";
import {User} from "../models"; // Adjust the path based on your project

const router = express.Router();

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
      // Find user by username
      const user = await User.findOne({ username }).select("_id registered_courses password_hash");

      if (!user) {
          res.status(404).json({ message: "User not found" });
          return;
      }

      // Compare the provided password with the hashed password from MongoDB
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
          res.status(401).json({ message: "Invalid credentials" });
          return;
      }

      // Send back user data (excluding password)
      res.json({ _id: user._id, registered_courses: user.registered_courses });

  } catch (error) {
      console.error("Error during authentication:", error);
      res.status(500).json({ message: "Server error" });
  }
});

export default router;