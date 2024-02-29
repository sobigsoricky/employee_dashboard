import connectDB from "@/config/db";
import Admin from "@/models/adminModel";

connectDB()

export default async function handler(req, res) {
    try {
        const admins = await Admin.find()
        res.status(200).json({ success: true, admins })
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}