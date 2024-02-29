import connectDB from "@/config/db";
import WorkReport from "@/models/workReportModel";
import nodemailer from "nodemailer";

connectDB();

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export default async function handler(req, res) {
    try {
        const { data } = JSON.parse(req.body);
        const { to, cc, work, sender, date } = data;

        if (!to || !work || !cc || !sender || !date) {
            return res.status(400).json({ message: 'Invalid payload' });
        }

        const newReport = new WorkReport({
            sender: sender?.email || "",
            receiver: to,
            cc: cc.map(email => email.email || email),
            work: work,
        });

        await newReport.save();

        await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: to,
            cc: cc.map(email => email.email || email),
            subject: `Work Update | ${sender?.firstName || sender?.details?.firstName} ${sender?.lastName || sender?.details?.lastName} | ${date} - Employee Dashboard`,
            html: `<div>
            ${work} 
            </div>`,
        });

        res.status(200).json({ message: 'Work report created and email sent successfully', success: true });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: error.message, success: false });
    }
}
