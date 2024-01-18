import connectDB from "@/config/db";
import Task from "@/models/taskModel";

connectDB();

export default async function handler(req, res) {
    try {
        const { id } = JSON.parse(req.body);


        if (!id) {
            res.status(400).json({ message: 'Invalid payload.', success: true });
            return;
        }

        const existTask = await Task.findOne({ _id: id });

        if (!existTask) {
            res.status(400).json({ message: 'Task not found.', success: false });
            return;
        }

        await Task.deleteOne({ _id: id });

        res.status(200).json({ message: 'Task deleted successfully.', success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}
