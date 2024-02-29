import mongoose from 'mongoose';
import Team from "@/models/teamModal";
import Employee from "@/models/employeeModel";
mongoose.model('employees2', Employee);
export default async function handler(req, res) {
    try {
        const employees = await Employee.find().populate('teams');
        res.status(200).json({ employees, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}
