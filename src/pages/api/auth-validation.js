import { parse } from 'cookie'
import jwt from "jsonwebtoken";
import User from '@/models/user';
import connectDB from '@/config/db';

await connectDB()

export default async function handler(req, res) {
    try {
        const cookies = parse(req.headers.cookie || '');

        if (!cookies) {
            return res.status(400).json({ message: 'Validation failed.', success: false })
        }

        const token = cookies['token'] || null

        if (!token || token === null || token === undefined || token === "") {
            return res.status(400).json({ message: 'Validation failed.', success: false })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decodedToken.id).select("-password");

        if (!user) {
            return res.status(400).json({ success: false, message: "Failed to authenticate user." });
        }

        res.status(200).json({ message: 'User validate successfully.', user, success: true })

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }
}