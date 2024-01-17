import mongoose from "mongoose";

const phaseSchema = new mongoose.Schema({
  phaseName: {
    type: String,
    required: [true, "Provide a name for phase"],
  },
  phaseStart: {
    type: Date,
    required: [true, "Provide a Phase Start Date"],
  },
  phaseEnd: {
    type: Date,
    required: [true, "Provide a Phase End Date"],
  },
});

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: [true, "Provide project name."],
  },

  dueDate: {
    type: Date,
    required: [true, "Provide due date."],
  },

  assignedTeam: [
    {
      type: String,
    },
  ],

  collaborator: [
    {
      type: String,
    },
  ],

  description: {
    type: String,
  },

  tasks: [
    {
      type: String,
    },
  ],

  phases: [
    {
      type: [phaseSchema],
    },
  ],
});

const Project =
  mongoose.models.projects || mongoose.model("projects", projectSchema);

export default Project;
