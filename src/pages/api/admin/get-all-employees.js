import Employee from "@/models/employeeModel"

export default async function handler(req, res) {
    try {
        const data = await Employee.find()
        res.status(200).json({ data, success: true })

    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}