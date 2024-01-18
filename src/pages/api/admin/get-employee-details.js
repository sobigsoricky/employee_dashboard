import Employee from "@/models/employeeModel";

export default async function handler(req, res) {
  const { id } = JSON.parse(req.body);
  try {
    const employee = await Employee.find({ _id: id }).populate("teams");

    if (!employee) {
      res.status(400).json({ message: "Employee not found.", success: false });
    }

    res.status(200).json({ employee: employee[0], success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
}
