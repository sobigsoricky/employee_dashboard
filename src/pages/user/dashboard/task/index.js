import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { AddNewTask, Head, MyTask } from '@/sections'
import { AddTaskModal, Layout } from '@/components'
import { parse } from 'cookie'
import { authenticateEmployee } from '@/redux/actions/authAction'
import authMiddleware from '@/middleware'
import { useSelector, useDispatch } from 'react-redux'
import { AddCircle } from '@mui/icons-material'

const index = ({ token }) => {
    const [showForm, setShowForm] = useState(false)
    const { userInfo, error, message } = useSelector(state => state.employeeAuthReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        if (token) dispatch(authenticateEmployee(token))
    }, [token])

    return (
        <>
            <Head title="My Task - Employee Dashboard" />
            <Layout userInfo={userInfo} isAdmin={false} />
            <Box className="dashboard-main" id="taskMain">
                <Box className="dashboard-main-container" p={{ xs: 2, sm: 4 }}>
                    <Box className="d-flex justify-content-between align-items-center">
                        <Typography variant='h1' className='fw-semibold'>{showForm ? 'Create New Task' : 'My Task'}</Typography>
                        <Button className='btn--dark' onClick={() => setShowForm(!showForm)}>{!showForm ? 'Add New Task' : 'Back'}</Button>
                    </Box>
                    <Box>
                        {
                            showForm ? <AddNewTask userInfo={userInfo} setShowForm={setShowForm} /> : <MyTask userInfo={userInfo} />
                        }
                    </Box>
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