import Admin from "@/models/adminModel";
import connectDB from "@/config/db";
import jwt from 'jsonwebtoken';
import { parse } from 'cookie'

connectDB()

export default async function handler(req, res) {
    try {

        const cookies = parse(req.headers.cookie || '');

        if (!cookies) {
            return res.status(400).json({ success: false, message: "Failed to authenticate user.", user: null })
        }

        const token = cookies['token'] || null

        if (!token) {
            return res.status(400).json({ success: false, message: "Failed to authenticate user.", user: null })
        }

        const decodedToken = jwt.verify(token, 'employeedashboardjwttoken');

        if (!decodedToken) {
            return res.status(400).json({ success: false, message: "Failed to authenticate user.", user: null })
        }

        if (!decodedToken?.id) {
            return res.status(400).json({ success: false, message: "Failed to authenticate user.", user: null })
        }

        const user = await Admin.findById(decodedToken?.id).select('-password')

        if (!user) {
            return res.status(400).json({ success: false, message: "Failed to authenticate user.", user: null })
        }

        if (!user.isAdmin) {
            return res.status(400).json({ suucess: false, message: "User trying to login is not admin user.", user: null })
        }

        res.status(200).json({ message: "User found", user: user, success: true })

    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
        console.log('error')
    }
}