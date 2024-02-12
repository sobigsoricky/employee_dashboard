import connectDB from "@/config/db";
import WorkReport from "@/models/workReportModel";

connectDB()

export default async function handler(req, res) {
    try {
        const reports = await WorkReport.find()
        res.status(200).json({ reports, success: true })
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}