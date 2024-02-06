import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Head, MyTask } from '@/sections'
import { Layout } from '@/components'
import { parse } from 'cookie'
import { authenticateEmployee } from '@/redux/actions/authAction'
import authMiddleware from '@/middleware'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { AddNewTask, TasksInsights } from "@/sections";
import { getTasks } from "@/redux/actions/taskAction";
import { getAllProjects } from '@/redux/actions/admin/project-action'
import { getAllEmployees } from '@/redux/actions/admin/employee-action'
import { getBoardColumns } from "@/redux/actions/admin/boardAction"

const index = ({ token }) => {
    const [showtasksForm, setShowTasksForm] = useState(false)
    const { userInfo } = useSelector(state => state.employeeAuthReducer)
    const dispatch = useDispatch()
    const { error, tasks, message, actionT } = useSelector(state => state.taskReducer)
    const { projects, error: err, actionT: at, message: msg } = useSelector(state => state.projectReducer)
    const { employees, error: empErr, actionT: empAt, message: empMsg } = useSelector(state => state.adminEmployeeReducer)
    const { columns } = useSelector((state) => state.boardReducer)

    const handleGetBoardColumns = () => {
        dispatch(getBoardColumns())
    }

    useEffect(() => {
        if (token) dispatch(authenticateEmployee(token))
    }, [token])

    useEffect(() => {
        dispatch(getBoardColumns())
        dispatch(getAllProjects())
        dispatch(getAllEmployees())
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
            <Head title="My Task - Employee Dashboard" />
            <Layout userInfo={userInfo} isAdmin={false} />
            <Box className="dashboard-main" id="taskMain">
                <Box className="dashboard-main-container" p={{ xs: 2, sm: 4 }}>
                    <Box className="d-flex justify-content-between">
                        <Typography variant="h1" className='fw-semibold'>{showtasksForm && "Create"} Tasks</Typography>
                        {!showtasksForm && <Box>
                            <Button className='btn--dark-outlined' onClick={() => setShowTasksForm(true)}>Create Task</Button>
                        </Box>
                        }
                    </Box>
                    {!showtasksForm ?
                        tasks && tasks !== null && tasks !== undefined && tasks !== "" && tasks.length > 0 && projects && projects !== null && projects !== undefined && projects !== "" && projects.length > 0 && employees && employees !== null && employees !== undefined && employees !== "" && employees.length > 0 && <TasksInsights userInfo={userInfo} isAdmin={false} tasks={tasks} projects={projects} employees={employees} handleGetBoardColumns={handleGetBoardColumns} columns={columns} /> : <AddNewTask setShowTasksForm={setShowTasksForm} userInfo={userInfo} isAdmin={false} handleGetBoardColumns={handleGetBoardColumns} />
                    }
                </Box>
            </Box>
        </>
    )
}

export const getServerSideProps = authMiddleware(async (context) => {
    const { req } = context;

    const cookies = parse(req.headers.cookie || '');
    const token = cookies['employeetoken'] || null

    return {
        props: {
            token
        }
    };
});

export default index