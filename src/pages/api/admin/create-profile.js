import mongoose from "mongoose";
import Admin from '@/models/adminModel';

export default async function handler(req, res) {
    const { data } = JSON.parse(req.body);

    try {
        const { company, designation, firstname, lastname, phone, website, email } = data;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found", success: false });
        }

        if (!admin.details) {
            admin.details = {};
        }

        if (company) admin.details.companyName = company;
        if (designation) admin.details.designation = designation;
        if (firstname) admin.details.firstName = firstname;
        if (lastname) admin.details.lastName = lastname;
        if (phone) admin.details.phone = phone;
        if (website) admin.details.websiteUrl = website;
        admin.isDetailedComplete = true

        // Save the updated admin document
        await admin.save();

        return res.status(200).json({ message: "Admin details updated successfully", success: true });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
