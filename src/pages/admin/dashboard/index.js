import React, { useEffect } from 'react'
import { Box, Typography, Grid, Paper } from '@mui/material'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { parse } from 'cookie'
import { authenticateUser, logoutAdmin } from '@/redux/actions/authAction'
import authMiddleware from '@/middleware'
import { toast } from 'react-toastify'
import { Head } from '@/sections'
import { Layout } from '@/components'
import { getAllProjects } from '@/redux/actions/admin/project-action'

const AdminDashboard = ({ token }) => {
    const { userInfo, error, message } = useSelector(state => state.authReducer)
    const { projects } = useSelector(state => state.projectReducer)
    const dispatch = useDispatch()
    const router = useRouter()

    const handleLogoutAdminUser = () => {
        dispatch(logoutAdmin())
    }

    useEffect(() => {
        if (token) dispatch(authenticateUser(token))
    }, [token])

    useEffect(() => {
        if (!error && message === "logout successful") {
            toast.success('Logged out successfully.')
            router.push('/admin/auth')
        } else if (error && message === "logout failed") {
            toast.error('Something went wrong.')
        }
    }, [error, message])

    useEffect(() => {
        dispatch(getAllProjects())
    }, [dispatch])

    return (
        <>
            <Head title="Dashboard | Admin" />
            <Layout isAdmin={true} userInfo={userInfo} />
            <Box className="dashboard-main" id="taskMain">
                <Box className="dashboard-main-container" p={{ xs: 2, sm: 4 }}>
                    <Typography variant="h1" className="fw-semibold">Welcome, {userInfo?.details?.firstName} {userInfo?.details?.lastName}</Typography>
                    {
                        projects && projects !== null && projects !== undefined && projects !== "" && projects.length > 0 && <Box mt={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Box component={Paper} p={2} className='shadow'>
                                        <Typography variant='h5' className='fw-semibold' gutterBottom>Completed Projects</Typography>
                                        <Typography variant='h1' className='fw-semibold mt-3'>{projects.length}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Box component={Paper} p={2} className='shadow'>
                                        <Typography variant='h5' className='fw-semibold' gutterBottom>Project In Progress</Typography>
                                        <Typography variant='h1' className='fw-semibold mt-3'>{projects.filter(project => project?.isProjectComplete === true).length}</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    }
                </Box>
            </Box>
        </>
    )
}

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

export default AdminDashboard