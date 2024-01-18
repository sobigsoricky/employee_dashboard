import Admin from "@/models/adminModel";
import connectDB from "@/config/db";
import bcryptjs from "bcryptjs";

connectDB();

export default async function handler(req, res) {
  let data;

  try {
    // Check if req.body is already a JSON object
    data = typeof req.body === "object" ? req.body : JSON.parse(req.body);
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Invalid JSON in the request body", success: false });
  }
  try {
    // Check if user already exists
    const user = await Admin.findOne({ email: data.email });

    if (user) {
      const verified = await bcryptjs.compare(data.otp, user._doc.otp);
      if (verified) {
        const result = await Admin.findByIdAndUpdate(user._doc._id, {
          verified: true,
        });
        res.json({ verified: true });
      }
    }

    res.status(403).json({ success: false, message: "Invalid OTP" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message, success: false });
  }
}
