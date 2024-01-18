import Employee from "@/models/employeeModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import connectDB from "@/config/db";

await connectDB()

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: 'Method is not allowed.' });
  }

  const { data } = JSON.parse(req.body);

  try {
    const { email } = data;

    if (!email) {
      return res.status(400).json({ success: false, message: "Invalid request payload." });
    }

    const user = await Employee.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found." });
    }

    sendOTPverificationEmail(user._id, email, res);

  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
};

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

const sendOTPverificationEmail = async (_id, email, res) => {
  try {
    const otp = `${generateOTP()}`;
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `<p> Enter <b>${otp} </b> in the app to verify your email address and complete signup</p><p>This code <b> expires in 1 hour </b></p>`,
    };
    const saltRounds = 10;
    const hashedOTP = await bcryptjs.hash(otp, saltRounds);

    await Employee.findByIdAndUpdate(_id, { otp: hashedOTP });

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, meassge: "OTP is sent on your email.", email });
  } catch (error) {
    res.status(500).json({ status: "FAILED", message: error.message });
  }
};
