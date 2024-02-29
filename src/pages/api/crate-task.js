import connectDB from '@/config/db';
import Task from '@/models/taskModel';
import Column from '@/models/kanbanListModal';

await connectDB()

export default async function handler(req, res) {
    try {
        const { data } = JSON.parse(req.body)

        if (!data) {
            return res.status(400).json({ message: 'Invalid payload 1', success: false })
        }

        const { assignedTo, priority, taskDueDate, taskName, description, project, collaborator, createdBy, attachments } = data;

        if (!assignedTo || !priority || !taskDueDate || !taskName || !description || !project || !collaborator || !createdBy) {
            console.log(assignedTo, priority, taskDueDate, taskName, description, project, collaborator, createdBy)
            return res.status(400).json({ message: 'Invalid payload 2', success: false })
        }

        const parsedAssignedTo = JSON.parse(assignedTo);
        const parsedCollaborator = JSON.parse(collaborator);
        const parsedAttachments = attachments && JSON.parse(attachments) || null

        const newTask = new Task({
            assignedTo: parsedAssignedTo,
            priority,
            taskDueDate,
            taskName,
            description,
            attachments: parsedAttachments,
            project,
            collaborator: parsedCollaborator,
            createdBy,
        });

        const savedTask = await newTask.save();

        const todoColumn = await Column.findOne({ columnName: "To Do" });

        todoColumn.tasks.push(savedTask._id);

        await todoColumn.save();

        res.status(201).json({ success: true, message: 'Task created successfully', task: savedTask });
    } catch (error) {
        console.error('Error creating task:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
