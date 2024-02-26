import connectDB from "@/config/db";
import Employee from "@/models/employeeModel";
import Team from "@/models/teamModal";

await connectDB()

export default async function handler(req, res) {
  try {
    const { data } = JSON.parse(req.body)

    if (!data) {
      return res.status(400).json({ message: 'Invalid payload.', success: false })
    }

    const { firstName, lastName, designation, email, phone, isManager, teams, displayProfile } = data

    const assignedTeams = JSON.parse(teams);
    const aTeams = await Team.find({ _id: { $in: assignedTeams } });

    const employeeData = { firstName, lastName, designation, email, phone, isManager, displayProfile, teams: aTeams.map((team) => team._id), };
    const newEmployee = new Employee(employeeData);
    const createEmployee = await newEmployee.save();

    const employeeId = newEmployee._id;
    for (const team of aTeams) {
      team.members.push(employeeId);
      await team.save();
    }

    res.status(200).json({ message: "Employee created successfully", success: true, createEmployee });

  } catch (error) {
    res.status(500).json({ message: error.message, success: false })
  }
}