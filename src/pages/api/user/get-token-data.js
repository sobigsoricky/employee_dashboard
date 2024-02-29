import connectDB from "@/config/db";
import jwt from "jsonwebtoken";
import Employee from "@/models/employeeModel"
import { parse } from 'cookie'

connectDB();

export default async function handler(req, res) {
  try {
    const cookies = parse(req.headers.cookie || '');

    if (!cookies) {
      return res.status(400).json({ success: false, message: "Failed to authenticate user.", user: null })
    }

    const token = cookies['employeetoken'] || null

    if (!token) {
      return res.status(400).json({ success: false, message: "Failed to authenticate user.", user: null })
    }

    const decodedToken = jwt.verify(token, "employeedashboardjwttoken");

    const user = await Employee.findById(decodedToken?.id).select("-password");

    if (!user) {
      res.status(400).json({ success: false, message: "Failed to authenticate user.", user: null, });
    }

    res.status(200).json({ message: "User found", user: user, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
