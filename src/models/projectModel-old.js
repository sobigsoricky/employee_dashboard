import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: [true, 'Provide project name.']
    },

    dueDate: {
        type: Date,
        required: [true, 'Provide due date.']
    },

    assignedTeam: [
        {
            type: String
        }
    ],

    collaborator: [
        {
            type: String
        }
    ],

    description: {
        type: String,
    },

    tasks: [
        {
            type: String
        }
    ]
})

const Project = mongoose.models.projects || mongoose.model("projects", projectSchema);

export default Project