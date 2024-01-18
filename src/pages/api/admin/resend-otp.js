import Admin from "@/models/adminModel";
import connectDB from "@/config/db";
import bcryptjs from "bcryptjs";

import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  host: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
connectDB();

export default async function handler(req, res) {
  try {
    let { email } = req.body;
    if (!email) {
      throw Error("Empty user details are not allowed");
    } else {
      const user = await Admin.findOne({ email: email });
      sendOTPverificationEmail(user._doc, res);
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: error.message,
    });
  }
}

const sendOTPverificationEmail = async ({ _id, email }, res) => {
  try {
    const otp = `${parseInt(1000 + Math.random() * 9000)}`;
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `<p> Enter <b>${otp} </b> in the app to verify your email address and complete signup</p><p>This code <b> expires in 1 hour </b></p>`,
    };
    const saltRounds = 10;
    const hashedOTP = await bcryptjs.hash(otp, saltRounds);

    await Admin.findByIdAndUpdate(_id, { otp: hashedOTP });

    await transporter.sendMail(mailOptions);
    res.json({
      status: "PENDING",
      message: "Verification OTP email sent",
      data: {
        userId: _id,
        email,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};

//resend
// router.post('/resendOTPVerrificationCode',async(req,res)=>{
// try{
//   let{userId ,email}=req.body;
//   if(!userId || email) {
//   throw Error("Empty user details are not allowed");
// }else{
//   await UserOTPVerification.deleteMany({userId});
//   sendOTPverificationEmail({_id:userId,email},res);
// }}catch(error){
//   console.log(error)
//   res.json({

//     status:"Failed",
//     message:error.message
//   })
// }
// })
