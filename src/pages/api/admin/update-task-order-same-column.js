import connectDB from "@/config/db";
import Column from "@/models/kanbanListModal";

connectDB();

export default async function handler(req, res) {
    try {
        const { updatedColumns } = JSON.parse(req.body);

        for (const column of updatedColumns) {
            const updatedList = await Column.findByIdAndUpdate(
                column._id,
                { tasks: column.tasks },
                { new: true }
            );
        }

        res.status(200).json({ message: 'Task order updated successfully', success: true });

    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
}