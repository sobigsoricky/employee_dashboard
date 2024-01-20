import connectDB from "@/config/db";
import Project from "@/models/projectModel-old";

connectDB();

export default async function handle(req, res) {
    try {
        const { id } = JSON.parse(req.body);

        if (!id) {
            return res.status(400).json({ message: 'Invalid payload', success: false });
        }

        const existProject = await Project.findById(id);

        if (!existProject) {
            return res.status(404).json({ success: false, message: "Project not found." });
        }

        existProject.isProjectComplete = true;

        const markProject = await existProject.save();

        return res.status(200).json({ success: true, markProject, message: "Project completed successfully." });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
