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
        const { data } = JSON.parse(req.body)

        if (!data) {
            res.status(400).json({ message: 'Invalid payload', success: false })
        }

        const { admins, emp, t, action } = data

        const receivers = [...admins, emp.email]

        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: receivers,
            subject: action === "create" ? "New employee added - Employee Dashboard" : action === "remove" ? "Employee removed - Employee Dashboard" : "",
            html: `
                <div>
                    <p>Hello,</p>
                    <div style="overflow-x: auto;">
                        <table cellpadding="16" border="1" rules="all" style="width:100%; border-collapse: collapse;">
                           <tr>
                           <th>Name</th>
                           <td>${emp?.firstName} ${emp?.lastName}</td>
                           </tr>
                           <tr>
                           <th>Email</th>
                           <td>${emp?.email}</td>
                           </tr>
                           <tr>
                           <th>Phone</th>
                           <td>${emp.phone}</td>
                           </tr>
                           <tr>
                           <th>Designation</th>
                           <td>${emp.designation}</td>
                           </tr>
                           <tr>
                           <th>Teams</th>
                           <td>${t.map(item => `${item}, `)}</td>
                           </tr>
                        </table>
                </div>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email sent successfully', success: true, info });

    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}