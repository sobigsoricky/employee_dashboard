import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getTeams } from "@/redux/actions/admin/teamAction";

const CreateEmployee = ({ formMethods }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = formMethods;

  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state.teamReducer);

  useEffect(() => {
    dispatch(getTeams());
  }, []);

  const handleTeamChange = (selectedTeams) => {
    setValue("teams", selectedTeams);
  };

  return (
    <>
      <Box>
        <Grid container>
          <Grid item xs={12} sm={10}>
            <Box px={2} mt={2}>
              <Box>
                <Typography variant="h3" className="fw-medium">
                  Personal Information*
                </Typography>
              </Box>
              <Box mt={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      variant="outlined"
                      label="First Name"
                      name="firstName"
                      fullWidth
                      {...register("firstName")}
                    />
                    {errors && errors.firstName && errors.firstName.message ? (
                      <Typography className="text-danger">
                        {errors.firstName.message}
                      </Typography>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      variant="outlined"
                      label="Last Name"
                      name="lastName"
                      fullWidth
                      {...register("lastName")}
                    />
                    {errors && errors.lastName && errors.lastName.message ? (
                      <Typography className="text-danger">
                        {errors.lastName.message}
                      </Typography>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="email"
                      variant="outlined"
                      label="Email"
                      name="email"
                      fullWidth
                      {...register("email")}
                    />
                    {errors && errors.email && errors.email.message ? (
                      <Typography className="text-danger">
                        {errors.email.message}
                      </Typography>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="tel"
                      variant="outlined"
                      label="Contact Number"
                      name="phone"
                      fullWidth
                      {...register("phone")}
                    />
                    {errors && errors.phone && errors.phone.message ? (
                      <Typography className="text-danger">
                        {errors.phone.message}
                      </Typography>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      variant="outlined"
                      fullWidth
                      label="Dersignation"
                      name="designation"
                      {...register("designation")}
                    />
                    {errors &&
                      errors.designation &&
                      errors.designation.message ? (
                      <Typography className="text-danger">
                        {errors.designation.message}
                      </Typography>
                    ) : null}
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    {teams &&
                      teams !== null &&
                      teams !== undefined &&
                      teams !== "" &&
                      teams.length > 0 && (
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Select Teams</InputLabel>
                          <Select
                            multiple
                            fullWidth
                            value={watch("teams") || []}
                            onChange={(e) => handleTeamChange(e.target.value)}
                            label="Select Teams"
                          >
                            {teams.map((team) => (
                              <MenuItem key={team._id} value={team._id}>
                                {team.teamName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          {...register("isManager")}
                          defaultChecked={false}
                        />
                      }
                      label="Make this employee manager?"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      className="btn--dark"
                      type="submit"
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
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CreateEmployee;
