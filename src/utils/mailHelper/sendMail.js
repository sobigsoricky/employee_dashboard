import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export function createMailOptions(from, to, subject, html) {
  return {
    from,
    to,
    subject,
    html,
  };
}

export async function sendMail(mailOptions) {
  return await transporter.sendMail(mailOptions);
}