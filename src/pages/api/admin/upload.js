import Employee from "@/models/employeeModel";
import multer from "multer";
import { join, extname } from "path";
import { promisify } from "util";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(process.cwd(), "public", "doc", "upload"));
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

const upload = multer({ storage }).fields([
  { name: "adhaarCard", maxCount: 1 },
  { name: "panCard", maxCount: 1 },
  { name: "marksheet10th", maxCount: 1 },
  { name: "marksheet12th", maxCount: 1 },
  { name: "voterId", maxCount: 1 },
]);

const promisifiedUpload = promisify(upload);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    await promisifiedUpload(req, res);
    const documents = {};
    Object.keys(req.files).forEach((key) => {
      documents[`documents.${key}`] = join(
        // process.cwd(),
        "/doc",
        "upload",
        req.files[key][0].filename
      );
    });

    console.log("Files upload successful. Saved at:", documents);

    // console.log(
    //   await Employee.findByIdAndUpdate(req.body.id, {
    //     $push: { documents: { $each: filePaths } },
    //   })
    // );

    console.log("TAGF", req.body);

    console.log(
      await Employee.findByIdAndUpdate(req.body.id, {
        $set: documents,
      })
    );

    res.status(200).json({
      message: "Files uploaded successfully",
      success: true,
      documents,
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).json({
      message: "An unexpected error occurred during file upload",
      success: false,
    });
  }
}

// import multer from "multer";
// import { join, extname } from "path";
// import fs from "fs/promises";

// const storage = multer.diskStorage({
//   destination: async (req, file, cb) => {
//     try {
//       const employeeName = req.body.employeeName;
//        console.log(req.body.employeeName)
//       if (!employeeName) {
//         console.error("Employee name not provided");
//         return cb({
//           status: 400,
//           message: "Employee name not provided",
//         });
//       }

//       const employeeFolder = join(
//         process.cwd(),
//         "public",
//         "doc",
//         "upload",
//         employeeName
//       );

//       console.log("Destination path:", employeeFolder);

//       await fs.mkdir(employeeFolder, { recursive: true });

//       cb(null, employeeFolder);
//     } catch (error) {
//       console.error("Error creating folder:", error);
//       cb(error);
//     }
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const fileExtension = extname(file.originalname);
//     cb(
//       null,
//       `${file.originalname.split(".")[0]}-${uniqueSuffix}${fileExtension}`
//     );
//   },
// });

// const upload = multer({ storage });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   try {
//     await new Promise((resolve, reject) => {
//       upload.single("documents")(req, res, async (err) => {
//         if (err) {
//           console.error("Error uploading file:", err);
//           return reject({
//             status: 400,
//             message: "File upload failed",
//             success: false,
//           });
//         }

//         const filePath = join(
//           process.cwd(),
//           "public",
//           "doc",
//           "upload",
//        employeeName,
//           req.file.filename
//         );
//         console.log("File upload successful. Saved at:", filePath);
//         resolve();
//       });
//     });

//     res
//       .status(200)
//       .json({ message: "File uploaded successfully", success: true });
//   } catch (error) {
//     res
//       .status(error.status || 500)
//       .json({ message: error.message, success: false });
//   }
// }
