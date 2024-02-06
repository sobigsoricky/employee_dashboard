import connectDB from "@/config/db";
import Column from "@/models/kanbanListModal";

connectDB()

export default async function handler(req, res) {
    try {
        const columns = await Column.find();
        res.status(200).json({ columns, success: true })
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}