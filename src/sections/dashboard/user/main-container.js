import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Slider,
  Typography,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import Cropper from "react-easy-crop";
import { AddAPhoto } from "@mui/icons-material";
import { CreateEmployeeForm } from "@/components";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createEmployeeProfile } from "@/redux/actions/admin/employee-action";
import { AdminEmployeesSection } from "@/sections";

const MainContainer = () => {
  const { message, error, actionT } = useSelector(
    (state) => state.adminEmployeeReducer
  );
  const [showEmp, setShowEmp] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [selectedTab, setSelectedTab] = useState("details");
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const triggerFileSelectPopup = () => inputRef.current.click();

  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required."),
    lastName: yup.string().required("Last name is required."),
    designation: yup.string().required("Designation is required."),
    email: yup.string().email("Invalid email.").required("Email is required."),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/, "Invalid phone number.")
      .required("Phone number is required."),

    isManager: yup.boolean()
  });

  const formMethods = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleProfileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
  };

  const onSubmit = (data) => {
    if (image && image !== null && image !== undefined && image !== "") {
      const formData = new FormData();
      formData.append("displayProfile", imageFile);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("designation", data.designation);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("isManager", data.isManager);
      formData.append("teams", JSON.stringify(data.teams));

      dispatch(createEmployeeProfile(formData));
    } else {
      toast.error("Please select the image.");
    }
  };

  useEffect(() => {
    console.log(error, actionT, message);

    if (actionT === "create" && !error) {
      toast.success(message);
      formMethods.reset();
      setImage(null);
      setShowEmp(true)
    } else if (actionT === "create" && error) {
      toast.error(message);
    }
  }, [error, actionT]);

  return (
    <>
      <Box pl={2} sx={{ height: "100%" }}>
        {!showEmp ? (
          <form
            method="POST"
            onSubmit={formMethods.handleSubmit(onSubmit)}
            style={{ height: "100%" }}
          >
            <Grid container sx={{ height: "100%" }}>
              <Grid item xs={12} sm={3.5} className="p-0">
                <Card
                  className="shadow-none dashboard-main-left-card"
                  sx={{
                    border: "1px solid rgba(0, 0, 0, 0.12)",
                    height: "100%",
                  }}
                >
                  <CardContent className="px-0">
                    {image &&
                      image !== null &&
                      image !== undefined &&
                      image !== "" ? (
                      <Box className="d-flex justify-content-center align-items-center">
                        <Box p={0.5} className="placeholderCirle">
                          <img
                            src={image}
                            className="rounded-circle img-fluid"
                          />
                          <IconButton
                            className="addaphoto"
                            onClick={triggerFileSelectPopup}
                          >
                            <img
                              src="/images/camera.svg"
                              className="img-fluid"
                            />
                          </IconButton>
                          <input
                            type="file"
                            accept="image/*"
                            ref={inputRef}
                            name="displayProfile"
                            onChange={handleProfileChange}
                            style={{ display: "none" }}
                          />
                        </Box>
                      </Box>
                    ) : (
                      <>
                        <div className="image-upload d-flex justify-content-center align-items-center">
                          <label htmlFor="file-input">
                            <Box className="placeholderCirle"></Box>
                          </label>
                          <input
                            id="file-input"
                            type="file"
                            accept="image/*"
                            name="profileImage"
                            onChange={handleProfileChange}
                            required
                          />
                        </div>
                        <div className="py-3">
                          <Typography align="center">
                            Uplod Profile Picture
                          </Typography>
                        </div>
                      </>
                    )}
                    <Divider sx={{ backgroundColor: "rgba(0, 0, 0, 0.12)" }} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={8.5} className="p-0">
                <Card className="shadow-none">
                  <CardContent className="px-0">
                    <Box>
                      <Box
                        px={2}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <Typography variant="h2" className="fw-semibold">
                          Add Employee Details
                        </Typography>
                        <Button
                          className="btn--dark"
                          onClick={() => setShowEmp(true)}
                        >
                          View All Employee
                        </Button>
                      </Box>
                      <Box px={2} mt={4} className="tabs">
                        <Button
                          className={`px-0 me-3 tab ${selectedTab === "details" ? "active" : ""
                            }`}
                          onClick={() => setSelectedTab("details")}
                        >
                          Personal Details
                        </Button>
                        <Button
                          className={`px-0 tab ${selectedTab === "documents" ? "active" : ""
                            }`}
                          onClick={() => setSelectedTab("documents")}
                        >
                          Documents
                        </Button>
                      </Box>
                      <Divider
                        sx={{ backgroundColor: "rgba(0, 0, 0, 0.40)" }}
                      />
                    </Box>
                    {selectedTab === "details" ? (
                      <CreateEmployeeForm formMethods={formMethods} />
                    ) : null}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </form>
        ) : (
          <AdminEmployeesSection setShowEmp={setShowEmp} />
        )}
      </Box>
    </>
  );
};

export default MainContainer;
