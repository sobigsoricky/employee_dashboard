import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: [true, 'Provide task name.'],
    },
    taskDueDate: {
        type: Date,
        required: [true, 'Provide due date.'],
    },
    priority: {
        type: String,
        required: [true, "Provide task priorrity"],
    },
    assignedTo: [{
        type: String
    }],
    collaborator: [{
        type: String
    }],
    project: {
        type: String
    },
    description: {
        type: String,
    },
    attachments: [{
        type: String,
    }],
    subTask: [
        {
            type: String
        }
    ],
    createdBy: {
        type: String,
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    taskCurrentStatus: {
        type: String,
        default: 'todo'
    }
});

const Task = mongoose.models.tasks || mongoose.model('tasks', taskSchema);

export default Task