import connectDB from "@/config/db";
import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export default async function handler(req, res) {
    const { data } = JSON.parse(req.body);

    if (!data) {
        return res.status(400).json({ message: 'Invalid payload.', success: false });
    }

    const { assignTo, collaborator, createdBy, task, action } = data;

    if (!createdBy || Object.keys(createdBy).length === 0) {
        return res.status(400).json({ message: 'Invalid createdBy object.', success: false });
    }

    const assignToArray = Array.isArray(assignTo) ? assignTo : [];

    const collaboratorArray = Array.isArray(collaborator) ? collaborator : [];

    const receivers = [
        createdBy.email,
        ...assignToArray.map(item => item.email),
        ...collaboratorArray.map(item => item.email),
    ];

    try {

        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: receivers,
            subject: action === "create" ? "New task created - Employee Dashboard" : action === "mark" ? "Task Completed - Employee Dashboard" : action === "delete" ? "Task Deleted - Employee Dashboard" : "",
            html: `<div>
    <p>Hello,</p>
    <div style="overflow-x: auto;">
        <table cellpadding="16" border="1" rules="all" style="width:100%; border-collapse: collapse;">
            <tr>
                <th style="text-align: left;">Task</th>
                <td>${task?.taskName}</td>
            </tr>

            <tr>
                <th style="text-align: left;">Task Due Date</th>
                <td>${task?.taskDueDate}</td>
            </tr>

            <tr>
                <th style="text-align: left;">Task Priority</th>
                <td>${task?.priority}</td>
            </tr>

            <tr>
                <th style="text-align: left;">Is Task Completed?</th>
                <td>${task?.isCompleted ? 'Completed' : 'Incomplete'}</td>
            </tr>

            <tr>
                <th style="text-align: left;">Task Description</th>
                <td>${task?.description}</td>
            </tr>

            <tr>
                <th style="text-align: left;">Task Created By</th>
                <td>${createdBy.firstName} ${createdBy.lastName}</td>
            </tr>

            <tr>
                <th style="text-align: left;">Task Assign To</th>
                <td>${assignToArray.map((item, index) => `${item.firstName} ${item.lastName}${assignToArray.length > Number(index) + 1 ? ", " : ""}`)}</td>
            </tr>

            <tr>
                <th style="text-align: left;">Collaborator</th>
                <td>${collaboratorArray.map((item, index) => `${item.firstName} ${item.lastName}${collaboratorArray.length > Number(index) + 1 ? ", " : ""}`)}</td>
            </tr>
        </table>
    </div>
</div>`,
        };

        const info = await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email sent successfully', success: true, info });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}
