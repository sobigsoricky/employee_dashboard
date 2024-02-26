import Employee from "@/models/employeeModel";

export default async function handler(req, res) {
    try {
        const { data } = JSON.parse(req.body)

        if (!data) {
            return res.status(400).json({ message: 'Invalid payload', success: false })
        }

        const { employeeId } = data

        const employeeExist = await Employee.findById(employeeId)

        if (!employeeExist) {
            return res.status(400).json({ message: 'User not found.', success: false })
        }

        const updateFields = {};

        if (data?.id && data?.id !== null && data?.id !== undefined && data?.id !== "") {
            updateFields.id = data?.id;
        }

        if (data?.ssc && data?.ssc !== null && data?.ssc !== undefined && data?.ssc !== "") {
            updateFields.ssc = data?.ssc;
        }

        if (data?.hsc && data?.hsc !== null && data?.hsc !== undefined && data?.hsc !== "") {
            updateFields.hsc = data?.hsc;
        }

        if (data?.ug && data?.ug !== null && data?.ug !== undefined && data?.ug !== "") {
            updateFields.ug = data?.ug;
        }

        if (data?.pg && data?.pg !== null && data?.pg !== undefined && data?.pg !== "") {
            updateFields.pg = data?.pg;
        }

        Object.assign(employeeExist.documents, updateFields);

        await employeeExist.save();

        res.status(200).json({ message: 'Documents uploaded and saved successfully', success: true })


    } catch (error) {
        res.status(error.status || 500).json({ message: error.message, success: false });
    }
}