import Admin from "@/models/adminModel";
import connectDB from "@/config/db";
import jwt from 'jsonwebtoken';

connectDB()

export default async function handler(req, res) {
    const { token } = JSON.parse(req.body)

    try {
        const decodedToken = jwt.verify(token, 'employeedashboardjwttoken');
        // check if user exist

        const user = await Admin.findOne({ email: decodedToken.email }).select('-password')

        if (!user) {
            res.status(400).json({ success: false, message: "Failed to authenticate user.", user: null })
        }

        if (!user.isAdmin) {
            res.status(400).json({ suucess: false, message: "User trying to login is not admin user.", user: null })
        }

        res.status(200).json({ message: "User found", user: user, success: true })

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log('error')
    }
}