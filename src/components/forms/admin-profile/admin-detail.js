import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";

const AdminDetail = ({ handleProfileCreate }) => {
  const { userInfo } = useSelector((state) => state.authReducer);
  const [defaultFormValue, setDefaultFormValues] = useState(null);
  const [formChanged, setFormChanged] = useState(false);
  const router = useRouter();

  const schema = yup.object().shape({
    firstname: yup.string().required("First name is required."),
    lastname: yup.string().required("Last name is required."),
    designation: yup.string().required("Designation is required."),
    company: yup.string().required("Company is required."),
    email: yup.string().email("Invalid email.").required("Email is required."),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/, "Invalid phone number.")
      .required("Phone number is required."),
    website: yup
      .string()
      .url("Invalid website URL.")
      .required("Website URL is required."),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: defaultFormValue,
  });

  const setDefaultValuesFromUserInfo = () => {
    const initialValues = {
      firstname: userInfo?.details?.firstName || "",
      lastname: userInfo?.details?.lastName || "",
      designation: userInfo?.details?.designation || "",
      company: userInfo?.details?.companyName || "",
      email: userInfo?.email || "",
      phone: userInfo?.details?.phone || "",
      website: userInfo?.details?.websiteUrl || "",
    };

    // Set the default values using setValue
    for (const field in initialValues) {
      setValue(field, initialValues[field]);
    }
  };

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length > 0) {
      setDefaultValuesFromUserInfo();
    }
  }, [userInfo]);

  const watchedFields = watch();

  useEffect(() => {
    const initialValues = {
      firstname: userInfo?.details?.firstName || "",
      lastname: userInfo?.details?.lastName || "",
      designation: userInfo?.details?.designation || "",
      company: userInfo?.details?.companyName || "",
      email: userInfo?.email || "",
      phone: userInfo?.details?.phone || "",
      website: userInfo?.details?.websiteUrl || "",
      agreeToTerms: userInfo?.agreeToTerms || false,
    };

    for (const field in watchedFields) {
      if (watchedFields[field] !== initialValues[field]) {
        setFormChanged(true);
        return;
      }
    }

    setFormChanged(false);
  }, [watchedFields, userInfo]);

  const onSubmit = async (data) => {
    handleProfileCreate(data);
    reset();
  };

  return (
    <>
      {userInfo &&
        userInfo !== null &&
        userInfo !== undefined &&
        userInfo !== "" &&
        Object.keys(userInfo).length > 0 && (
          <Box>
            <Box>
              <Typography
                variant="h1"
                className="fw-semibold text-dark"
                gutterBottom
              >
                Admin Details
              </Typography>
              <Typography variant="h4" className="fw-semibold text-dark">
                You are just one step away!
              </Typography>
            </Box>
            <Box mt={6}>
              <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <InputLabel className="fw-medium mb-2">
                        First Name*
                      </InputLabel>
                      <TextField
                        type="text"
                        variant="outlined"
                        label="Enter your first name"
                        name="firstname"
                        fullWidth
                        {...register("firstname")}
                      />
                      {errors &&
                      errors.firstname &&
                      errors.firstname.message ? (
                        <Typography className="text-danger">
                          {errors.firstname.message}
                        </Typography>
                      ) : null}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <InputLabel className="fw-medium mb-2">
                        Last Name*
                      </InputLabel>
                      <TextField
                        type="text"
                        variant="outlined"
                        label="Enter your last name"
                        name="lastname"
                        fullWidth
                        {...register("lastname")}
                      />
                      {errors && errors.lastname && errors.lastname.message ? (
                        <Typography className="text-danger">
                          {errors.lastname.message}
                        </Typography>
                      ) : null}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <InputLabel className="fw-medium mb-2">
                        Designation*
                      </InputLabel>
                      <TextField
                        type="text"
                        variant="outlined"
                        label="Enter your designation"
                        name="designation"
                        fullWidth
                        {...register("designation")}
                      />
                      {errors &&
                      errors.designation &&
                      errors.designation.message ? (
                        <Typography className="text-danger">
                          {errors.designation.message}
                        </Typography>
                      ) : null}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <InputLabel className="fw-medium mb-2">
                        Company name*
                      </InputLabel>
                      <TextField
                        type="text"
                        variant="outlined"
                        label="Enter your company name"
                        name="company"
                        fullWidth
                        {...register("company")}
                      />
                      {errors && errors.company && errors.company.message ? (
                        <Typography className="text-danger">
                          {errors.company.message}
                        </Typography>
                      ) : null}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <InputLabel className="fw-medium mb-2">
                        Email address*
                      </InputLabel>
                      <TextField
                        type="email"
                        variant="outlined"
                        label="Enter your email address"
                        name="email"
                        fullWidth
                        {...register("email")}
                        disabled
                      />
                      {errors && errors.email && errors.email.message ? (
                        <Typography className="text-danger">
                          {errors.email.message}
                        </Typography>
                      ) : null}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <InputLabel className="fw-medium mb-2">
                        Phone number*
                      </InputLabel>
                      <TextField
                        type="tel"
                        variant="outlined"
                        label="Enter your phone number"
                        name="phone"
                        fullWidth
                        {...register("phone")}
                      />
                      {errors && errors.phone && errors.phone.message ? (
                        <Typography className="text-danger">
                          {errors.phone.message}
                        </Typography>
                      ) : null}
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box>
                      <InputLabel className="fw-medium mb-2">
                        Website link*
                      </InputLabel>
                      <TextField
                        type="url"
                        variant="outlined"
                        label="Website URL"
                        name="website"
                        fullWidth
                        {...register("website")}
                      />
                      {errors && errors.website && errors.website.message ? (
                        <Typography className="text-danger">
                          {errors.website.message}
                        </Typography>
                      ) : null}
                    </Box>
                  </Grid>
                  {/* <Grid item xs={12}>
                                    <Box>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="agreeToTerms"
                                                    {...register('agreeToTerms')}
                                                />
                                            }
                                            label="I’ve read and agree with Terms of Service and our Privacy Policy"
                                        />
                                        {
                                            errors && errors.agreeToTerms && errors.agreeToTerms.message ? <Typography className='text-danger'>{errors.agreeToTerms.message}</Typography> : null
                                        }
                                    </Box>
                                </Grid> */}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      className="btn--dark"
                      sx={{
                        width: "auto",
                        marginRight: "1rem",
                        "@media only screen and (max-width: 600px)": {
                          width: "100%",
                          marginRight: "0rem",
                          marginBottom: "1rem",
                        },
                      }}
                      disabled={!formChanged}
                    >
                      {userInfo.isDetailedComplete ? "Update" : "Continue"}
                    </Button>
                    {userInfo.isDetailedComplete && (
                      <Button
                        variant="contained"
                        className="btn--dark"
                        sx={{
                          width: "auto",
                          marginRight: "1rem",
                          "@media only screen and (max-width: 600px)": {
                            width: "100%",
                            marginRight: "0rem",
                            marginBottom: "1rem",
                          },
                        }}
                        onClick={() => router.push("/admin/dashboard")}
                      >
                        Next
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Box>
        )}
    </>
  );
};

export default AdminDetail;
