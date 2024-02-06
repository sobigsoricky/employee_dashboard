import connectDB from "@/config/db";
import Column from "@/models/kanbanListModal";

connectDB();

export default async function handler(req, res) {
    try {
        const { data } = JSON.parse(req.body);
        const { cn, color } = data;

        if (!cn || !color) {
            return res.status(400).json({ message: "Invalid payload", success: false });
        }

        const sameName = await Column.findOne({ columnName: cn });

        if (sameName) {
            return res.status(400).json({ message: "List with the same name is not allowed.", success: false });
        }

        const newColumn = new Column({ columnName: cn, color: color });

        await newColumn.save();

        return res.status(200).json({ message: "Column created", success: true });
    } catch (error) {
        return res.status(500).json({ error: error.message, success: false });
    }
}
