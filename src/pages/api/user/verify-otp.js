import Employee from "@/models/employeeModel";
import connectDB from "@/config/db";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export default async function handler(req, res) {
  try {
    const { data } = JSON.parse(req.body);
    const { otp, email } = data;

    const user = await Employee.findOne({ email });

    if (!user) {
      res.status(400).json({ success: false, message: 'User not found.' })
    }
    const verifyOTP = await bcryptjs.compare(otp, user.otp)

    if (!verifyOTP) {
      res.status(400).json({ success: false, message: "OTP is invalid." })
    }

    const result = await Employee.findByIdAndUpdate(user._doc._id, { otp: null, });

    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(tokenData, "employeedashboardjwttoken", { expiresIn: "1d", });

    res.setHeader("Set-Cookie", `employeetoken=${token}; HttpOnly; Max-Age="86400000"; Path=/; Secure; SameSite=Strict`);

    res.status(200).json({ message: "Login Successfully.", user, token, success: true });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message, success: false });
  }
}
