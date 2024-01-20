import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from "@mui/material";
import { CalenderTimeline } from "@/components";
import { getAllProjects, handleMarkProject, handleRemoveProject, sendProjectNotification } from "@/redux/actions/admin/project-action";
import { getAllEmployees } from "@/redux/actions/admin/employee-action";
import { Avatar, Box, Grid, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getTeams } from "@/redux/actions/admin/teamAction";
import ProjectMember from "./projectMember";
import ProjectTimeline from "./projectTimeline";
import month from "@/data/month";
import { getTasks, handleTaskMarkComplete } from "@/redux/actions/taskAction";
import ProjectTasks from "./projectTasks";
import { toast } from 'react-toastify'
import { getAdmins } from "@/redux/actions/admin/adminAction";

const ProjectDetails = ({ isAdmin }) => {
  const [filteredProjectTask, setFilteredProjectTask] = useState([])
  const [dueDate, setDueDate] = useState({ date: "", status: "" })
  const [manager, setManager] = useState([])
  const [selectedTab, setSelectedTab] = useState(1);
  const [projectDetails, setProjectDetails] = useState(null)
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.adminEmployeeReducer);
  const { projects, error, actionT, markProject, message, deleteProject } = useSelector((state) => state.projectReducer);
  const { teams } = useSelector((state) => state.teamReducer);
  const { tasks } = useSelector((state) => state.taskReducer)
  const { admins } = useSelector((state) => state.adminReducer)

  useEffect(() => {
    dispatch(getTeams());
    dispatch(getAllProjects());
    dispatch(getAllEmployees());
    dispatch(getTasks())
    dispatch(getAdmins())
  }, [dispatch]);

  useEffect(() => {
    if (id && id !== null && id !== undefined && id !== "" && projects && projects !== null && projects !== undefined && projects !== "" && projects.length > 0) {
      const Details = projects.filter((entries) => entries._id === id);
      setProjectDetails(Details[0])
    }
  }, [id, projects])


  const phases = {
    groups: projectDetails?.phases?.map((phase, index) => ({
      id: index,
      title: phase?.phaseName,
    })),
    items: projectDetails?.phases?.map((phase, index) => {
      const item = {
        id: index,
        group: index,
        title: phase.phaseName,
        start_time: new Date(phase.phaseStart).getTime(),
        end_time: new Date(phase.phaseEnd).getTime(),
      };
      return item;
    }),
  };

  useEffect(() => {
    if (employees && employees !== null && employees !== undefined && employees !== "" && employees.length > 0 && projectDetails && projectDetails !== null && projectDetails !== undefined && projectDetails !== "" && Object.keys(projectDetails).length > 0) {
      const filterManager = employees.filter(employee => projectDetails?.collaborator.includes(employee._id))
      setManager(filterManager)
    }
  }, [employees, projectDetails])

  useEffect(() => {
    if (projectDetails && projectDetails !== null && projectDetails !== undefined && projectDetails !== "" && Object.keys(projectDetails).length > 0 && projectDetails.dueDate && projectDetails.dueDate !== null && projectDetails.dueDate !== undefined && projectDetails.dueDate !== "") {

      const date = projectDetails.dueDate.split('T')[0];
      const dateInMillisecond = new Date(date).getTime()
      const today = new Date().getTime()


      setDueDate({ ...dueDate, date: `${projectDetails.dueDate.split('T')[0].split("-")[2]} ${month[Number(projectDetails.dueDate.split('T')[0].split("-")[1]) - 1]}, ${projectDetails.dueDate.split('T')[0].split("-")[0]}`, status: dateInMillisecond > today ? 'Upcoming' : 'Overdue' })
    }
  }, [projectDetails])

  useEffect(() => {
    if (projectDetails && projectDetails !== null && projectDetails !== undefined && projectDetails !== "" && Object.keys(projectDetails).length > 0 && tasks && tasks !== null && tasks !== undefined && tasks !== "" && tasks.length > 0) {
      const fileteredTask = tasks.filter(task => task.project === projectDetails._id)
      setFilteredProjectTask(fileteredTask)
    }
  }, [projectDetails, tasks])

  const handleSendProjectNotification = (project, action) => {
    if (project && teams && teams !== null && teams !== undefined && teams !== "" && teams.length > 0 && employees && employees !== null && employees !== undefined && employees !== "" && employees.length > 0 && admins && admins !== null && admins !== undefined && admins !== "" && admins.length > 0) {
      const filteredTeams = teams.filter(team => project?.assignedTeam.includes(team._id))
      if (filteredTeams && filteredTeams !== null && filteredTeams !== undefined && filteredTeams !== "" && filteredTeams.length > 0) {
        const filteredEmp = filteredTeams.flatMap(item => {
          return employees.filter(employee => item.members.includes(employee._id))
        })

        const filteredMember = filteredEmp.filter(member => member._id !== project?.collaborator[0])
        const manager = filteredEmp.filter(member => member._id === project?.collaborator[0])
        const createdBy = admins.filter(admin => admin._id === project?.createdBy)
        const newData = { members: filteredMember, manager, createdBy, action, project }
        dispatch(sendProjectNotification(newData))
      }
    }

  }

  useEffect(() => {
    if (!error && actionT === "mark") {
      toast.success(message)
      handleSendProjectNotification(markProject, 'mark')
    } else if (error && actionT === "mark") {
      toast.error(message)
    }
  }, [error, actionT])


  useEffect(() => {
    if (!error && actionT === "delete") {
      toast.success(message)
      handleSendProjectNotification(deleteProject, 'delete')
      isAdmin ? router.push('/admin/dashboard/project/') : router.push('/user/dashboard/project/')
    } else if (error && actionT === "delete") {
      toast.error(message)
    }
  }, [error, actionT])

  return (
    <>
      {
        projectDetails && projectDetails !== null && projectDetails !== undefined && projectDetails !== "" && Object.keys(projectDetails).length > 0 && <Box>
          <Box className="d-flex justify-content-between">
            <Typography variant="h1" className="fw-semibold">{projectDetails?.projectName} - Project Details</Typography>
            {
              isAdmin && <Box>
                <Button className="btn btn-outline-success me-3" onClick={() => dispatch(handleMarkProject(projectDetails?._id))}>Mark Complete</Button>
                <Button className="btn btn-danger" onClick={() => dispatch(handleRemoveProject(projectDetails._id))}>Remove Project</Button>
              </Box>
            }
          </Box>
          <Box mt={5}>
            <Box className="tab-container">
              <Button className={`tab ${selectedTab === 1 ? 'active' : ''}`} onClick={() => setSelectedTab(1)}>Teams & Member</Button>
              <Button className={`tab ${selectedTab === 2 ? 'active' : ''}`} onClick={() => setSelectedTab(2)}>Project Timeline</Button>
              <Button className={`tab ${selectedTab === 3 ? 'active' : ''}`} onClick={() => setSelectedTab(3)}>Tasks</Button>
            </Box>
            <Box mt={5}>
              {
                selectedTab === 1 ? <ProjectMember employees={employees} teams={teams} assignedTeam={projectDetails.assignedTeam} manager={manager} /> : selectedTab === 2 ? <ProjectTimeline items={phases.items} groups={phases.items} dueDate={dueDate.date} status={dueDate.status} /> : selectedTab === 3 ? <ProjectTasks tasks={filteredProjectTask} employees={employees} teams={teams} /> : null
              }
            </Box>
            <Box mt={5}>
              <Button className="btn--dark" onClick={() => isAdmin ? router.push('/admin/dashboard/project/') : router.push('/user/dashboard/project/')}>Back</Button>
            </Box>
          </Box>
        </Box>
      }
    </>
  );
};

export default ProjectDetails 