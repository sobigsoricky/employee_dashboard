import jwt from "jsonwebtoken";
import Employee from "@/models/employeeModel";
import connectDB from "@/config/db";

connectDB()

export default async function handler(req, res) {
  try {
    const { data } = JSON.parse(req.body);

    if (!data || !data.email) {
      return res.status(400).json({ message: "Invalid request payload.", success: false });
    }

    const { email } = data;
    const user = await Employee.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found.", success: false });
    }

    console.log(user);

    const response = {
      message: "Click send for OTP.",
      user: { ...user.toObject(), email },
      success: true,
      email: user.email,
      id: JSON.stringify(user._id),
    };

    return res.status(200).json({ success: true, response });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
}
