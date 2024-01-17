import multer from "multer";
import { join, extname } from "path";
import Employee from "@/models/employeeModel";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, join(process.cwd(), "public", "documents", "upload"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = extname(file.originalname);
        cb(
            null,
            `${file.originalname.split(".")[0]}-${uniqueSuffix}${fileExtension}`
        );
    },
});

const upload = multer({ storage });

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    try {
        await new Promise((resolve, reject) => {
            upload.fields([
                { name: "id", maxCount: 1 },
                { name: "ssc", maxCount: 1 },
                { name: "hsc", maxCount: 1 },
                { name: "ug", maxCount: 1 },
                { name: "pg", maxCount: 1 },
                { name: "certification", maxCount: 1 },
                { name: "payslips", maxCount: 100 },
            ])(req, res, async (err) => {
                if (err) {
                    console.error("Error uploading files:", err);
                    return reject({
                        status: 400,
                        message: "File upload failed",
                        success: false,
                    });
                }

                resolve();
            });
        });

        const employeeId = req.body.employeeId;
        const existingEmployee = await Employee.findById(employeeId);

        if (!existingEmployee) {
            return res
                .status(404)
                .json({ message: "Employee not found", success: false });
        }

        // Update only the fields that have a new file in the request
        const updateFields = {};

        if (req.files["id"]) {
            updateFields.id = `/documents/upload/${req.files["id"][0].filename}`;
        }

        if (req.files["ssc"]) {
            updateFields.ssc = `/documents/upload/${req.files["ssc"][0].filename}`;
        }

        if (req.files["hsc"]) {
            updateFields.hsc = `/documents/upload/${req.files["hsc"][0].filename}`;
        }

        if (req.files["ug"]) {
            updateFields.ug = `/documents/upload/${req.files["ug"][0].filename}`;
        }

        if (req.files["pg"]) {
            updateFields.pg = `/documents/upload/${req.files["pg"][0].filename}`;
        }

        if (req.files["certification"]) {
            updateFields.certification = `/documents/upload/${req.files["certification"][0].filename}`;
        }

        if (req.files["payslips"]) {
            updateFields.payslips = req.files["payslips"].map(
                (file) => `/documents/upload/${file.filename}`
            );
        }

        Object.assign(existingEmployee.documents, updateFields);

        await existingEmployee.save();

        res
            .status(200)
            .json({
                message: "Documents uploaded and saved successfully",
                success: true,
            });
    } catch (error) {
        res
            .status(error.status || 500)
            .json({ message: error.message, success: false });
    }
}