import React, { useEffect } from "react";
import { useRouter } from "next/router";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { CalenderTimeline } from "@/components";
import randomColor from "randomcolor";

import { getAllProjects } from "@/redux/actions/admin/project-action";
import { getAllEmployees } from "@/redux/actions/admin/employee-action";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getTeams } from "@/redux/actions/admin/teamAction";
export const ProjectDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.adminEmployeeReducer);
  const { projects } = useSelector((state) => state.projectReducer);

  const { teams } = useSelector((state) => state.teamReducer);
  useEffect(() => {
    dispatch(getTeams());
  }, []);
  useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  useEffect(() => {
    dispatch(getAllEmployees());
  }, []);

  if (!projects) {
    return <div>Loading...</div>;
  }
  console.log("DEBUG: ", projects);

  const Details = projects.filter((entries) => entries._id === id);
  const phases = {
    groups: Details?.[0]?.phases?.map((phase, index) => ({
      id: index,
      title: phase?.phaseName,
    })),
    items: Details?.[0]?.phases?.map((phase, index) => {
      let randomSeed = Math.floor(Math.random() * 1000);
      const item = {
        id: index,
        group: index,
        title: phase.phaseName,
        start_time: new Date(phase.phaseStart).getTime(),
        end_time: new Date(phase.phaseEnd).getTime(),
        color: randomColor({ luminosity: "blue", seed: randomSeed }),
      };
      return item;
    }),
  };

  const getEmployee = (id) => {
    if (employees) {
      return employees?.filter((entries) => entries._id === id)?.[0];
    }
  };

  return (
    <>
      {Details &&
        Details.map((info) => (
          <Box mt={4}>
            <Box p={2} className="projectDetail d-flex justify-between">
              <Grid container>
                <Typography variant="h3" className="fw-semibold" gutterBottom>
                  {info.projectName}
                </Typography>
              </Grid>
              <Grid container className=" justify-content-end">
                <Typography variant="h3" className="fw-semibold " gutterBottom>
                  Due Date :
                </Typography>
                <Typography variant="h5" gutterBottom>
                  {new Date(info.dueDate).toDateString()}
                </Typography>
              </Grid>
            </Box>
            <Box p={2} className="projectDetail mt-2">
              <Grid container>
                <Typography variant="h3" className="fw-semibold" gutterBottom>
                  Project Timeline
                </Typography>

                <CalenderTimeline items={phases.items} groups={phases.groups} />
              </Grid>
            </Box>

            <Box p={2} className="projectDetail mt-2">
              <Typography
                variant="h3"
                className="fw-semibold mb-2"
                gutterBottom
              >
                Collaborator
              </Typography>
              <Grid container>
                <Grid item xs={12} sm={12}>
                  <TableContainer component={Paper}>
                    <Table
                      sx={{ minWidth: 650 }}
                      size="large"
                      aria-label="a dense table"
                    >
                      <TableHead>
                        <TableRow className="bold">
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Profile
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Name
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Last Name
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Designation
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Email
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Phone Number
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      {info.collaborator &&
                        info.collaborator
                          .map((item) => getEmployee(item))
                          .map(
                            (item) =>
                              item && (
                                <TableBody>
                                  <TableCell>
                                    <Avatar
                                      key={item}
                                      alt="img"
                                      src={item.displayProfile}
                                    />
                                  </TableCell>
                                  <TableCell>{item.firstName}</TableCell>
                                  <TableCell>{item.lastName}</TableCell>
                                  <TableCell>{item.designation}</TableCell>
                                  <TableCell>{item.email}</TableCell>
                                  <TableCell>{item.phone}</TableCell>
                                </TableBody>
                              )
                          )}
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Box>
          </Box>
        ))}
    </>
  );
};
