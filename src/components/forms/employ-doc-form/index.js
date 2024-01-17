import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const EmployeeDocForm = () => {
  const [files, setFiles] = useState({
    adhaarCard: null,
    panCard: null,
    marksheet10th: null,
    marksheet12th: null,
    voterId: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const router = useRouter();
  const { userInfo } = useSelector((state) => state.authReducer);

  const id = router.query.id || userInfo._id;
  // const { userInfo } = useSelector((state) => state.authReducer);
  console.log("useInfo..................",userInfo.isAdmin)
  
  const handleFileChange = (e, documentType) => {
    const selectedFile = e.target.files[0];
    setFiles((prevFiles) => ({
      ...prevFiles,
      [documentType]: selectedFile,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedFiles = Object.values(files);

    if (selectedFiles.every((file) => file === null)) {
      setError("Please select at least one file");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    Object.entries(files).forEach(([documentType, file]) => {
      if (file !== null) {
        formData.append(documentType, file);
      }
    });

    formData.append("id", id);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage("Files uploaded successfully");
        setFiles({
          adhaarCard: null,
          panCard: null,
          marksheet10th: null,
          marksheet12th: null,
          voterId: null,
        });
        toast.success("File Upload Successful");
      } else {
        setError("Error uploading files");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  

  const documentsName = [
    { type: "adhaarCard", label: "Adhaar Card" },
    { type: "panCard", label: "PAN Card" },
    { type: "marksheet10th", label: "10th Marksheet" },
    { type: "marksheet12th", label: "12th Marksheet" },
    { type: "voterId", label: "Voter ID" },
  ];
  if (userInfo.isAdmin) {
    documentsName.push({ type: 'salarySlip', label: 'Salary Slip' });
  }
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={12} className="p-3">
          <Box px={2} mt={2} >
            <Box >
              <Typography variant="h3" className="fw-medium">
                Upload Documents
              </Typography>

              {documentsName.map(({ type, label }, index) => (
                <Box
                  key={index}
                  display="flex"
                  flexDirection={"row"}
                  alignItems="center"
                  justifyContent={"space-between"}
                >
                  <Box width={"50%"} p={2} mt={2} className="empDetail">
                    <Box className="d-flex justify-content-between align-items-center">
                      <Typography variant="h4" className="fw-semibold">
                        {label}
                      </Typography>
                    </Box>

                    <Box mt={2}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          {/* Set xs={12} to make it full-width */}
                          <input
                            accept="image/*"
                            style={{ display: "none" }}
                            id={`contained-button-file-${type}`}
                            type="file"
                            onChange={(e) => handleFileChange(e, type)}
                            name={type}
                          />
                        </Grid>
                        {files[type] && (
                          <Box mt={2} width="100%">
                            {" "}
                            {/* Add width="100%" to make it full-width */}
                            <Typography variant="body1" color="textSecondary">
                              Selected File:
                            </Typography>
                            <Typography variant="body2">
                              {files[type].name}
                            </Typography>
                          </Box>
                        )}
                      </Grid>
                    </Box>
                  </Box>
                  <label htmlFor={`contained-button-file-${type}`}>
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload File
                    </Button>
                  </label>
                </Box>
              ))}

              {files.length > 0 && (
                <Box mt={2}>
                  <Typography variant="body1" color="textSecondary">
                    Selected Files:
                  </Typography>
                  <Typography variant="body2">
                    {selectedFiles.map((file, index) => (
                      <div key={index}>{file.name}</div>
                    ))}
                  </Typography>
                </Box>
              )}
              <Grid item xs={12} mt={2}>
                <Button
                  className="btn--dark"
                  type="submit"
                  onClick={handleSubmit}
                  sx={{
                    width: "15rem",
                    "@media only screen and (max-width: 600px)": {
                      width: "100%",
                    },
                  }}
                >
                  Save
                </Button>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeDocForm;

// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Grid,
//   Typography,
//   TextField, // Import TextField from MUI
// } from "@mui/material";

// const EmployeeDocForm = () => {
//     const [file, setFile] = useState(null);
//     const [employeeName, setEmployeeName] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState(null);

//     const handleFileChange = (e) => {
//       setFile(e.target.files[0]);
//     };

//     const handleNameChange = (e) => {
//       setEmployeeName(e.target.value);
//     };

//     const handleSubmit = async (e) => {
//       e.preventDefault();

//       if (!file || !employeeName) {
//         setError("Please select a file and enter the employee name");
//         return;
//       }

//       setLoading(true);

//       const formData = new FormData();
//       formData.append("documents", file);
//       formData.append("employeeName", employeeName); // Include employeeName in the form data

//       try {
//         const response = await fetch("/api/admin/upload", {
//           method: "POST",
//           body: formData,
//         });

//         if (response.ok) {
//           setSuccessMessage("File uploaded successfully");
//         } else {
//           setError("Error uploading file");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         setError("An unexpected error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//   return (
//     <Box>
//       <Grid container>
//         <Grid item xs={12} sm={10}>
//           <Box px={2} mt={2}>
//             <Box>
//               <Typography variant="h3" className="fw-medium">
//                 Personal Information*
//               </Typography>
//             </Box>
//             <Box mt={2}>
//               <Grid container spacing={2}>
//                 {/* New Field for Employee Name */}
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Employee Name"
//                     value={employeeName}
//                     onChange={handleNameChange}
//                     fullWidth
//                     required
//                   />
//                 </Grid>

//                 {/* File Input */}
//                 <Grid item xs={12} sm={6}>
//                   <input
//                     id="file-input"
//                     type="file"
//                     name="documents"
//                     onChange={handleFileChange}
//                     required
//                   />
//                   {error ? (
//                     <Typography className="text-danger">
//                       {error}
//                     </Typography>
//                   ) : null}
//                 </Grid>

//                 {/* Submit Button */}
//                 <Grid item xs={12}>
//                   <Button
//                     className="btn--dark"
//                     type="submit"
//                     onClick={handleSubmit}
//                     sx={{
//                       width: "15rem",
//                       "@media only screen and (max-width: 600px)": {
//                         width: "100%",
//                       },
//                     }}
//                   >
//                     Save
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default EmployeeDocForm;
