import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  IconButton,
  AvatarGroup,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { getAllProjects } from "@/redux/actions/admin/project-action";
import { getTeams } from "@/redux/actions/admin/teamAction";
import { getAllEmployees } from "@/redux/actions/admin/employee-action";
import { useRouter } from "next/router";
const ManageProject = ({ setAddNewProject, isAdmin }) => {
  const { projects } = useSelector((state) => state.projectReducer);
  const { employees } = useSelector((state) => state.adminEmployeeReducer);
  const { teams } = useSelector((state) => state.teamReducer);
  const dispatch = useDispatch();
const route=useRouter();
  useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  useEffect(() => {
    dispatch(getTeams());
  }, []);
  useEffect(() => {
    dispatch(getAllEmployees());
  }, []);
  console.log(projects, "project");


  const getEmployeeName = (id) => {
    if (employees) {
      const filteredEmp = employees.filter((entries) => entries._id === id);
      return `${filteredEmp[0]?.firstName} ${filteredEmp[0]?.lastName}`;
    }
  };

  const getEmployeeProfile = (id) => {
    if (employees) {
      const filteredEmp = employees.filter((entries) => entries._id === id);
      return filteredEmp[0]?.displayProfile;
    }
  };

  return (
    <>
      <Box>
        <Typography variant="h1" className="fw-semibold">
          Manage Project
        </Typography>
        <Box mt={4}>
          <Grid container spacing={2}>
            {isAdmin && (
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  className="TeamCard"
                  component={Paper}
                  onClick={() => setAddNewProject(true)}
                >
                  <CardContent className="d-flex flex-column align-items-center p-0">
                    <Typography
                      variant="h3"
                      align="center"
                      className="fw-semibold mb-3"
                    >
                      Add Projects
                    </Typography>
                    <IconButton
                      sx={{
                        backgroundColor: "#F8F9FA",
                        height: "4.5rem",
                        width: "4.5rem",
                      }}
                      className="mb-3"
                    >
                      <Add sx={{ fontSize: "1.5rem" }} />
                    </IconButton>
                    <Typography align="center">
                      Manage as many projects as you want
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
            {projects &&
              projects !== null &&
              projects !== undefined &&
              projects !== "" &&
              projects.length > 0 &&
              projects.map((project) => (
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    className="TeamCard"
                    component={Paper}
                    sx={{ height: "100%" }}
                    onClick={() => route.push(`/user/dashboard/project/${project._id}`)}
                  >
                    <CardContent className="d-flex flex-column align-items-center p-0">
                      <Typography
                        variant="h3"
                        align="center"
                        className="fw-semibold mb-3"
                      >
                        {project.projectName}
                      </Typography>
                      <Box
                          sx={{ height: "5.5rem" }}
                          className="d-flex align-items-center"
                        >
                          <AvatarGroup
                            total={
                                project.collaborator &&
                                project.collaborator !== null &&
                                project.collaborator !== undefined &&
                                project.collaborator !== "" &&
                                project.collaborator.length
                            }
                          >
                            {project.collaborator &&
                              Array.isArray(project.collaborator) &&
                              project.collaborator.map((item) => {
                                return (
                                    <Avatar
                                      key={item}
                                      alt="img"
                                      src={getEmployeeProfile(item)}
                                    />
                                  )
                              })}
                          </AvatarGroup>
                        </Box>
                      <Box>
                        <Typography align="center">
                          {project.collaborator.map((employeeId, index) => (
                            <React.Fragment key={employeeId}>
                     
                              <span>{getEmployeeName(employeeId)}</span>,
                            </React.Fragment>
                          ))}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ManageProject;
