import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getTeams } from "@/redux/actions/admin/teamAction";
import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  clearProjectState,
  createProject,
} from "@/redux/actions/admin/project-action";
import { toast } from "react-toastify";
import { getAllEmployees } from "@/redux/actions/admin/employee-action";

const CreateProject = ({ setAddNewProject }) => {
  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state.teamReducer);
  const { employees } = useSelector((state) => state.adminEmployeeReducer);
  const { message, actionT, error } = useSelector(
    (state) => state.projectReducer
  );

  const schema = yup.object().shape({
    projectName: yup.string().required("Project name is required."),
    dueDate: yup.date().required("Due date is required."),
    assignedTeam: yup.array().min(1, "Assign at least one team."),
    collaborator: yup.array(),
    descriptions: yup.string().required("Descriptions are required."),
    // phaseName: yup.string().required("Phase name is required."),
    // phaseStart: yup.date().required("Starting date of phase is required."),
    // phaseEnd: yup.date().required("End  date of phase is required."),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const phases = useFieldArray({
    control,
    name: "phases",
  });

  useEffect(() => {
    dispatch(getTeams());
  }, []);

  useEffect(() => {
    dispatch(getAllEmployees());
  }, []);

  const currentDate = new Date().toISOString().split("T")[0];

  const onSubmit = (data) => {
    console.log("DEBUG: ", JSON.stringify(data));
    dispatch(createProject(data));
  };

  const handleTeamChange = (selectedTeams) => {
    setValue("assignedTeam", selectedTeams);
  };

  const handleCollaboratorChange = (selectedCollaborator) => {
    setValue("collaborator", selectedCollaborator);
  };

  useEffect(() => {
    if (!error && actionT === "create") {
      toast.success(message);
      reset();
      setAddNewProject(false);
      dispatch(clearProjectState());
    } else if (error && actionT === "create") {
      toast.error(message);
      reset();
    }
  }, [error, actionT]);

  //   console.log(employees);

  return (
    <>
      <Box mt={2}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Grid container>
              <Grid item xs={12} sm={10}>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <InputLabel>Project Name</InputLabel>
                      <TextField
                        type="text"
                        fullWidth
                        {...register("projectName")}
                        name="projectName"
                      />
                      <p className="text-danger">
                        {errors.projectName?.message}
                      </p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel>Due Date</InputLabel>
                      <TextField
                        type="date"
                        fullWidth
                        inputProps={{ min: currentDate }}
                        {...register("dueDate")}
                        name="dueDate"
                      />
                      <p className="text-danger">{errors.dueDate?.message}</p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel>Assign Team</InputLabel>
                      {teams && teams.length > 0 && (
                        <Select
                          multiple
                          fullWidth
                          {...register("assignedTeam")}
                          onChange={(e) => handleTeamChange(e.target.value)}
                          value={watch("assignedTeam") || []}
                          name="assignedTeam"
                        >
                          <MenuItem value="">---Select Teams---</MenuItem>
                          {teams.map((team) => (
                            <MenuItem key={team._id} value={team._id}>
                              {team.teamName}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                      <p className="text-danger">
                        {errors.assignedTeam?.message}
                      </p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel>Collaborator</InputLabel>
                      {employees &&
                        employees !== null &&
                        employees !== undefined &&
                        employees !== "" &&
                        employees.length > 0 && (
                          <Select
                            multiple
                            fullWidth
                            {...register("collaborator")}
                            onChange={(e) =>
                              handleCollaboratorChange(e.target.value)
                            }
                            value={watch("collaborator") || []}
                            name="collaborator"
                          >
                            {employees.map((employee) => (
                              <MenuItem key={employee._id} value={employee._id}>
                                {employee.firstName} {employee.lastName}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel>Descriptions</InputLabel>
                      <TextField
                        type="text"
                        multiline
                        rows={4}
                        fullWidth
                        {...register("descriptions")}
                        name="descriptions"
                      />
                      <p className="text-danger">
                        {errors.descriptions?.message}
                      </p>
                    </Grid>
                    {phases.fields.map((field, index) => {
                      const id = `phases.${index}`;
                      return (
                        <React.Fragment key={field.id}>
                          <Grid item xs={12} sm={4}>
                            <InputLabel>Phase Name</InputLabel>

                            <React.Fragment>
                              <TextField
                                type="text"
                                fullWidth
                                {...register(`${id}.phaseName`)}
                                // name="phaseName"
                              />
                              <p className="text-danger">
                                {errors.phaseName?.message}
                              </p>
                            </React.Fragment>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <InputLabel>Phase Start</InputLabel>
                            <React.Fragment key={field.id}>
                              <TextField
                                type="date"
                                fullWidth
                                id={id}
                                // name="phaseStart"
                                {...register(`${id}.phaseStart`)}
                                inputProps={{ min: currentDate }}
                              />
                              <p className="text-danger">
                                {errors.phaseStart?.message}
                              </p>
                            </React.Fragment>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <InputLabel>Phase End</InputLabel>
                            <React.Fragment key={index}>
                              <TextField
                                type="date"
                                fullWidth
                                // name="phaseStart"
                                {...register(`${id}.phaseEnd`)}
                                inputProps={{ min: currentDate }}
                              />
                              <p className="text-danger">
                                {errors.phaseEnd?.message}
                              </p>
                            </React.Fragment>
                          </Grid>
                        </React.Fragment>
                      );
                    })}

                    <Grid item xs={12}>
                      <Button
                        type="button"
                        className="btn--dark-outlined me-3"
                        onClick={() => {
                          phases.append();
                        }}
                      >
                        Add Phase
                      </Button>
                      {phases.fields.length > 1 && (
                        <Button
                          type="button"
                          className="btn--dark-outlined"
                          onClick={() => {
                            phases.remove(phases.fields.length - 1);
                          }}
                        >
                          Close Last Phase
                        </Button>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" className="btn--dark me-3">
                        Create Team
                      </Button>
                      <Button
                        type="button"
                        className="btn--dark-outlined"
                        onClick={() => setAddNewProject(false)}
                      >
                        Discard
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default CreateProject;
