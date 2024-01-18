import connectDB from "@/config/db";
import Task from "@/models/taskModel";

await connectDB();

export default async function handler(req, res) {
    try {
        const { t } = JSON.parse(req.body);

        if (!t) {
            return res.status(400).json({ message: 'Invalid payload.', success: false });
        }

        const existTask = await Task.findOne({ _id: t._id });

        if (!existTask) {
            return res.status(400).json({ message: 'Task not found.', success: false });
        }

        existTask.isCompleted = true;

        const completeTask = await Task.findByIdAndUpdate(t._id, existTask, { new: true });

        res.status(200).json({ message: 'Task completed successfully.', success: true, task: completeTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
