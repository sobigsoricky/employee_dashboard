import connectDB from "@/config/db";
import Admin from "@/models/adminModel";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectDB();

export default async function handler(req, res) {
    const data = JSON.parse(req.body);
    try {
        const { email, password } = data;

        const user = await Admin.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ message: 'Admin does not exist.', success: false, user: null });
        }

        const isValidPassword = await bcryptjs.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid credentials.', success: false, user: null });
        }

        if (!user.isAdmin) {
            res.status(400).json({ suucess: false, message: "User trying to login is not admin user.", user: null })
        }

        const tokenData = { id: user._id, email: user.email, };
        const tokenOptions = { expiresIn: "7d" };
        const token = jwt.sign(tokenData, "employeedashboardjwttoken", tokenOptions);
        const expiresInSeconds = 604800;

        res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Max-Age=${expiresInSeconds}; Path=/; Secure; SameSite=Strict`);
        res.status(200).json({ message: "Login Successfully.", user, token, success: true });

    } catch (error) {
        return res.status(500).json({ error: error.message, success: false });
    }
}