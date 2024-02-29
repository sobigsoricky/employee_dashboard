import nodemailer from "nodemailer";

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

        if (!data) {
            return res.status(400).json({ message: 'Invalid payload.', success: false });
        }

        const { manager, members, project, createdBy, action } = data;

        const memberToArray = Array.isArray(members) ? members : [];

        const receivers = [
            manager[0].email,
            createdBy[0].email,
            ...memberToArray.map(item => item.email),
        ];

        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const setDate = (d) => {
            if (d && d !== null && d !== undefined && d !== "") {
                return `${d.split('T')[0].split("-")[2]} ${month[Number(d.split('T')[0].split("-")[1]) - 1]}, ${d.split('T')[0].split("-")[0]}`;
            }
        };

        const setProjectStatus = (d) => {
            const today = new Date().getTime();
            const dueDate = new Date(d).getTime();
            return `${dueDate > today ? 'Upcoming' : 'Overdue'}`;
        };

        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: receivers,
            subject: action === "create" ? "New project created - Employee Dashboard" : action === "mark" ? 'Project completed - Employee Dashboard' : action === 'delete' ? "Project Deleted - Employee Dashboard" : "",
            html: `
                <div>
                    <p>Hello,</p>
                    <div style="overflow-x: auto;">
                        <table cellpadding="16" border="1" rules="all" style="width:100%; border-collapse: collapse;">
                            <tr>
                                <th colspan="2" style="text-align: center;">Project Information</th>
                            </tr>
                            <tr>
                                <th style="text-align: left;">Project Name</th>
                                <td style="text-align: left;">${project.projectName}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">Created By</th>
                                <td style="text-align: left;">${createdBy[0]?.details?.firstName} ${createdBy[0]?.details?.lastName}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">Project Manager</th>
                                <td style="text-align: left;">${manager[0]?.firstName} ${manager[0]?.lastName}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">Members</th>
                                <td>
                                    ${members.map(item => `${item.firstName} ${item.lastName} \n`)}
                                </td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">Project Due Date</th>
                                <td style="text-align: left;">${setDate(project?.dueDate)}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">Is project complete?</th>
                                <td style="text-align: left;">${project?.isProjectComplete ? 'Yes' : 'No'}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">Project Status</th>
                                <td style="text-align: left;">${setProjectStatus(project.dueDate)}</td>
                            </tr>
                        </table>
                        <table cellpadding="16" border="1" rules="all" style="width:100%; border-collapse: collapse; margin-top: 3rem;">
                            <thead>
                                <tr>
                                    <th colspan="3" style="text-align: center;">Scope of Work</th>
                                </tr>
                                <tr>
                                    <th style="text-align: left;">Phase</th>
                                    <th style="text-align: left;">Start Date</th>
                                    <th style="text-align: left;">Last Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${project?.phases.map(phase => (
                `<tr>
                                        <td style="text-align: left;">${phase[0].phaseName}</td>
                                        <td style="text-align: left;">${setDate(phase[0].phaseStart)}</td>
                                        <td style="text-align: left;">${setDate(phase[0].phaseEnd)}</td>
                                    </tr>`
            )).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email sent successfully', success: true, info });

    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}
