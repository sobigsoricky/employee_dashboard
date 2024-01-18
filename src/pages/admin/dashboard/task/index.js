import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "@/components";
import { authenticateUser } from "@/redux/actions/authAction";
import authMiddleware from "@/middleware";
import { parse } from "cookie";
import { AddNewTask, TasksInsights } from "@/sections";
import { getTasks } from "@/redux/actions/taskAction";
import { toast } from 'react-toastify'
import { getAllProjects } from '@/redux/actions/admin/project-action'
import { getAllEmployees } from '@/redux/actions/admin/employee-action'

const index = ({ token }) => {
  const [showtasks, setShowTasks] = useState(true)
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.authReducer);
  const { error, tasks, message, actionT } = useSelector(state => state.taskReducer)
  const { projects, error: err, actionT: at, message: msg } = useSelector(state => state.projectReducer)
  const { employees, error: empErr, actionT: empAt, message: empMsg } = useSelector(state => state.adminEmployeeReducer)

  useEffect(() => {
    dispatch(getAllProjects())
    dispatch(getAllEmployees())
    dispatch(authenticateUser(token))
  }, [dispatch])

  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])

  useEffect(() => {
    if (!error && actionT === "fetch-tasks") {
    } else if (error && actionT === "fetch-tasks") {
      toast.error(message)
    }
  }, [error, actionT])

  return (
    <>
      <Layout isAdmin={true} userInfo={userInfo} />
      <Box className="dashboard-main" id="taskMain">
        <Box className="dashboard-main-container" p={{ xs: 2, sm: 4 }}>
          {
            tasks && tasks !== null && tasks !== undefined && tasks !== "" && tasks.length > 0 && projects && projects !== null && projects !== undefined && projects !== "" && projects.length > 0 && employees && employees !== null && employees !== undefined && employees !== "" && employees.length > 0 && <TasksInsights tasks={tasks} projects={projects} employees={employees} />
          }
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps = authMiddleware(async (context) => {
  const { req } = context;

  const cookies = parse(req.headers.cookie || '');
  const token = cookies['token'] || null

  return {
    props: {
      token
    }
  };
});

export default index;
