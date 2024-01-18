// Import necessary modules and models
import mongoose from "mongoose";
import Employee from "@/models/employeeModel";
import Team from "@/models/teamModal";

export default async function handler(req, res) {
    const { id } = JSON.parse(req.body);

    try {
        const removedEmployee = await Employee.findByIdAndRemove(id);

        if (!removedEmployee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        await Team.updateMany(
            { members: id },
            { $pull: { members: id } }
        );

        res.status(200).json({ success: true, message: "Employee removed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
