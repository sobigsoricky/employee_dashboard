import connectDB from "@/config/db";
import Task from "@/models/taskModel";
import Column from "@/models/kanbanListModal";

await connectDB();

export default async function handler(req, res) {
    try {
        const { data } = JSON.parse(req.body);
        const { id, listId } = data;

        if (!id || !listId) {
            return res.status(400).json({ message: 'Invalid payload', success: false });
        }

        const taskExist = await Task.findById(id);

        if (!taskExist) {
            return res.status(404).json({ message: 'Task not found.', success: false });
        }

        const isListExist = await Column.findById(listId);

        if (!isListExist) {
            return res.status(404).json({ message: 'List not found.', success: false });
        }

        const taskIndex = isListExist.tasks.indexOf(id);
        if (taskIndex === -1) {
            return res.status(404).json({ message: 'Task not found in the specified list.', success: false });
        }

        isListExist.tasks.splice(taskIndex, 1);
        await isListExist.save();

        const deletedTask = await Task.findOneAndDelete({ _id: id });

        return res.status(200).json({ message: 'Task deleted successfully.', success: true, deletedTask });

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

