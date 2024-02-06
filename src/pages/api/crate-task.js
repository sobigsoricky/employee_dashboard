import multer from 'multer';
import path from 'path';
import Task from '@/models/taskModel';
import Column from '@/models/kanbanListModal';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), 'public', 'images', 'upload'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(file.originalname);
        cb(null, `${file.originalname.split('.')[0]}-${uniqueSuffix}${fileExtension}`);
    },
});

const upload = multer({ storage });

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    try {
        await new Promise((resolve, reject) => {
            upload.array('attachments')(req, res, async (err) => {
                if (err) {
                    console.error('Error uploading files:', err);
                    return reject({
                        status: 400,
                        message: 'File upload failed',
                        success: false,
                    });
                }
                resolve();
            });
        });



        const { assignedTo, priority, taskDueDate, taskName, description, project, collaborator, createdBy, taskCurrentStatus } = req.body;

        const parsedAssignedTo = JSON.parse(assignedTo);
        const parsedCollaborator = JSON.parse(collaborator);

        const newTask = new Task({
            assignedTo: parsedAssignedTo,
            priority,
            taskDueDate,
            taskName,
            description,
            attachments: req.files.map((file) => `/images/upload/${file.filename}`),
            project,
            collaborator: parsedCollaborator,
            createdBy,
            taskCurrentStatus
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
