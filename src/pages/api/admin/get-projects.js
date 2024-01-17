import Project from "@/models/projectModel";

export default async function handler(req, res) {
    try {
        const projects = await Project.find()
        res.status(200).json({ success: true, projects })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}