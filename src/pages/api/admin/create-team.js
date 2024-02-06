import Team from "@/models/teamModal"

export default async function handler(req, res) {
    const { data } = JSON.parse(req.body)
    try {
        const newTeam = new Team(data)
        const team = await newTeam.save()

        res.status(200).json({ success: true, message: "Team created successfully.", team })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}