import Task from "@/models/taskModel";
import connectDB from "@/config/db";

await connectDB()

export default async function handler(req, res) {
    try {
        const tasks = await Task.find()
        res.status(200).json({ success: true, tasks })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}