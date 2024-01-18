import connectDB from "@/config/db";
import jwt from "jsonwebtoken";
import Employee from "@/models/employeeModel";

connectDB();

export default async function handler(req, res) {
  const { token } = JSON.parse(req.body);

  try {
    const decodedToken = jwt.verify(token, "employeedashboardjwttoken");

    const user = await Employee.findOne({ email: decodedToken.email }).select("-password");

    if (!user) {
      res.status(400).json({ success: false, message: "Failed to authenticate user.", user: null, });
    }

    res.status(200).json({ message: "User found", user: user, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
