import multer from "multer";
import { join, extname } from "path";
import Employee from "@/models/employeeModel";
import Team from "@/models/teamModal";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(process.cwd(), "public", "images", "upload"));
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
      upload.single("displayProfile")(req, res, async (err) => {
        if (err) {
          console.error("Error uploading file:", err);
          return reject({
            status: 400,
            message: "File upload failed",
            success: false,
          });
        }

        resolve();
      });
    });
    const teamNames = JSON.parse(req.body.teams);
    if (req.file) {
      // Check if the email already exists in the database
      const existingEmployee = await Employee.findOne({
        email: req.body.email,
      });
      if (existingEmployee) {
        return res
          .status(400)
          .json({ message: "Email already exists", success: false });
      }

      const fileUrl = `/images/upload/${req.file.filename}`;
      const teams = await Team.find({ _id: { $in: teamNames } });

      // Create employee
      const employeeData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        isManager: req.body.isManager,
        displayProfile: fileUrl,
        teams: teams.map((team) => team._id),
      };

      const newEmployee = new Employee(employeeData);
      await newEmployee.save();

      // Update team members array
      const employeeId = newEmployee._id;
      for (const team of teams) {
        team.members.push(employeeId);
        await team.save();
      }

      res
        .status(200)
        .json({ message: "Employee created successfully", success: true });
    } else {
      res.status(400).json({ message: "No file uploaded", success: false });
    }
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message, success: false });
  }
}
