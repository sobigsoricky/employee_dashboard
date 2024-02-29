import connectDB from "@/config/db";
import Project from "@/models/projectModel";

connectDB();

export default async function handler(req, res) {
    try {
        const { id } = JSON.parse(req.body);

        if (!id) {
            res.status(400).json({ message: "Invalid payload", success: false });
            return;
        }

        const existingProject = await Project.findById(id);

        if (!existingProject) {
            res.status(400).json({ message: 'Project not found.', success: false });
            return;
        }

        const deletedProject = await Project.findOneAndDelete({ _id: id });

        res.status(200).json({ message: 'Project deleted successfully', success: true, deletedProject });

    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}
