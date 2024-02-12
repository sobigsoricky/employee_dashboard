import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "@/components";
import { authenticateUser } from "@/redux/actions/authAction";
import authMiddleware from "@/middleware";
import { parse } from "cookie";
import { toast } from 'react-toastify'
import { AddNewTask, TasksInsights } from "@/sections";
import { getTasks } from "@/redux/actions/taskAction";
import { getAllProjects } from '@/redux/actions/admin/project-action'
import { getAllEmployees } from '@/redux/actions/admin/employee-action'
import { getBoardColumns } from "@/redux/actions/admin/boardAction"
import { getAdmins } from "@/redux/actions/admin/adminAction";

const index = ({ token }) => {
  const [openCreateBoardModal, setOpenCreateBoardMoadal] = useState(false)
  const [showtasksForm, setShowTasksForm] = useState(false)
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.authReducer);
  const { error, tasks, message, actionT } = useSelector(state => state.taskReducer)
  const { projects, error: err, actionT: at, message: msg } = useSelector(state => state.projectReducer)
  const { employees, error: empErr, actionT: empAt, message: empMsg } = useSelector(state => state.adminEmployeeReducer)
  const { columns } = useSelector((state) => state.boardReducer)
  const { admins } = useSelector((state) => state.adminReducer)

  const handleGetBoardColumns = () => {
    dispatch(getBoardColumns())
  }

  useEffect(() => {
    dispatch(getAllProjects())
    dispatch(getAllEmployees())
    dispatch(authenticateUser(token))
    dispatch(getTasks())
    dispatch(getBoardColumns())
    dispatch(getAdmins())
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
          <Box className="d-flex justify-content-between">
            <Typography variant="h1" className='fw-semibold'>{showtasksForm && "Create"} Tasks</Typography>
            {!showtasksForm && <Box>
              <Button className='btn--dark me-3' onClick={() => setOpenCreateBoardMoadal(true)}>Create Board</Button>
              <Button className='btn--dark-outlined' onClick={() => setShowTasksForm(true)}>Create Task</Button>
            </Box>
            }
          </Box>
          {!showtasksForm ?
            tasks && tasks !== null && tasks !== undefined && tasks !== "" && tasks.length > 0 && projects && projects !== null && projects !== undefined && projects !== "" && projects.length > 0 && employees && employees !== null && employees !== undefined && employees !== "" && employees.length > 0 && <TasksInsights isAdmin={true} userInfo={userInfo} tasks={tasks} projects={projects} employees={employees} setOpenCreateBoardMoadal={setOpenCreateBoardMoadal} openCreateBoardModal={openCreateBoardModal} columns={columns} handleGetBoardColumns={handleGetBoardColumns} admins={admins} /> : <AddNewTask userInfo={userInfo} isAdmin={true} setShowTasksForm={setShowTasksForm} handleGetBoardColumns={handleGetBoardColumns} />
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
