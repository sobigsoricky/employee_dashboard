import connectDB from "@/config/db";
import Team from "@/models/teamModal";

await connectDB()

export default async function handler(req, res) {
    try {
        const { id } = JSON.parse(req.body);

        if (!id) {
            return res.status(400).json({ message: 'Invalid payload.', success: false })
        }

        const teamExist = await Team.findById(id)

        if (!teamExist) {
            return res.status(400).json({ message: 'Team not found.', success: false })
        }

        res.status(200).json({ message: 'Team exist.', team: teamExist, success: true })

    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}