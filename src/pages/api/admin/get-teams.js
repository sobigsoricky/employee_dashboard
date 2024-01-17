import Team from "@/models/teamModal"

export default async function handler(req, res) {
    try {
        const teams = await Team.find()
        res.status(200).json({ teams, success: true })
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}