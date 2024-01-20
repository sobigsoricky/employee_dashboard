import Project from "@/models/projectModel"

export default async function handler(req, res) {
    const { data } = JSON.parse(req.body)
    try {
        const newProject = new Project(data)
        const project = await newProject.save()

        res.status(200).json({ success: true, message: 'Project added successful.', project })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}