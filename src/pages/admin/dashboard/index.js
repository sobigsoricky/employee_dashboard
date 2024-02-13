import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { parse } from 'cookie';
import { authenticateUser, logoutAdmin } from '@/redux/actions/authAction';
import authMiddleware from '@/middleware';
import { toast } from 'react-toastify';
import { Head } from '@/sections';
import { Layout } from '@/components';
import { getAllProjects } from '@/redux/actions/admin/project-action';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { getTasks } from '@/redux/actions/taskAction';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';


const AdminDashboard = ({ token }) => {
    const { userInfo, error, message } = useSelector(state => state.authReducer);
    const { projects } = useSelector(state => state.projectReducer);
    const { tasks } = useSelector(state => state.taskReducer);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogoutAdminUser = () => {
        dispatch(logoutAdmin());
    };

    useEffect(() => {
        if (token) dispatch(authenticateUser(token));
    }, [token]);

    useEffect(() => {
        if (!error && message === 'logout successful') {
            toast.success('Logged out successfully.');
            router.push('/admin/auth');
        } else if (error && message === 'logout failed') {
            toast.error('Something went wrong.');
        }
    }, [error, message]);

    useEffect(() => {
        dispatch(getAllProjects());
        dispatch(getTasks());
    }, [dispatch]);

    console.log(tasks);

    const [taskData, setTaskData] = useState([
        { name: 'Low', task: 0, fill: '#198754' },
        { name: 'Medium', task: 0, fill: '#ffc107' },
        { name: 'High', task: 0, fill: '#dc3545' },
        { name: '', task: 0, fill: '#fff' },
    ])

    const style = {
        top: '50%',
        right: 0,
        transform: 'translate(0, -50%)',
        lineHeight: '24px',
    };

    useEffect(() => {
        if (tasks && tasks !== null && tasks !== undefined && tasks !== "" && tasks.length > 0) {
            const high = tasks.filter(t => t.priority === 'high').length
            const medium = tasks.filter(t => t.priority === 'medium').length
            const low = tasks.filter(t => t.priority === 'low').length
            const totalTasks = tasks.length

            const newTaskdata = [
                { name: 'Low', task: low, fill: '#198754' },
                { name: 'Medium', task: medium, fill: '#ffc107' },
                { name: 'High', task: high, fill: '#dc3545' },
                { name: '', task: totalTasks, fill: '#fff' },
            ]

            setTaskData(newTaskdata)
        }
    }, [tasks])

    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

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
                                <Grid item xs={12} sm={6} md={2.5}>
                                    <Box component={Paper} p={2} className='shadow'>
                                        <Grid container alignItems="center">
                                            <Grid item xs={12}>
                                                <Typography variant='h5' className='fw-semibold' gutterBottom>Completed Projects</Typography>
                                            </Grid>
                                            <Grid item xs={8} >
                                                <Typography variant='h1' className='fw-semibold'>{projects.length}</Typography>
                                            </Grid>
                                            <Grid className='d-flex justify-content-end' item xs={4}>
                                                <Box sx={{ width: "50px", height: "50px" }}>
                                                    <CircularProgressbar value={Number(projects.length) / Number(projects.length) * 100} text={`${Number(projects.length) / Number(projects.length) * 100}%`} />;
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={2.5}>
                                    <Box component={Paper} p={2} className='shadow'>
                                        <Grid container alignItems="center">
                                            <Grid item xs={12}>
                                                <Typography variant='h5' className='fw-semibold' gutterBottom>Projects In Progress</Typography>
                                            </Grid>
                                            <Grid item xs={8} >
                                                <Typography variant='h1' className='fw-semibold'>{projects.filter(project => project.isProjectComplete === true).length}</Typography>
                                            </Grid>
                                            <Grid className='d-flex justify-content-end' item xs={4}>
                                                <Box sx={{ width: "50px", height: "50px" }}>
                                                    <CircularProgressbar styles={buildStyles({ pathColor: 'green', })} value={Number(projects.filter(project => project.isProjectComplete === true).length) / Number(projects.length) * 100} text={`${(Number(projects.filter(project => project.isProjectComplete === true).length) / Number(projects.length) * 100).toFixed(2)}%`} />;
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    }
                    {
                        tasks && tasks !== null && tasks !== undefined && tasks !== "" && tasks.length > 0 && <Box mt={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <Box p={2} component={Paper} className='shadow'>
                                        <Typography variant='h2' className='fw-semibold'>Task Priority</Typography>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={10} data={taskData}>
                                                <RadialBar
                                                    minAngle={1}
                                                    label={{ position: 'outsideStart', fill: '#fff' }}
                                                    background
                                                    clockWise
                                                    dataKey="task"
                                                />
                                                {/* <Legend iconSize={10} layout="verticle" verticalAlign="baseline" wrapperStyle={style} /> */}
                                            </RadialBarChart>
                                        </ResponsiveContainer>
                                        <Box mt={2}>
                                            <ul className='d-flex justify-content-center align-items-center list-unstyled'>
                                                <li style={{ color: "#198754", width: "20%", textAlign: "center" }}>Low</li>
                                                <li style={{ color: "#ffc107", width: "20%", textAlign: "center" }}>Medium</li>
                                                <li style={{ color: "#dc3545", width: "20%", textAlign: "center" }}>High</li>
                                            </ul>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Box p={2} component={Paper} className='shadow' sx={{ height: "100%" }}>
                                        <Typography variant='h2' className='fw-semibold'>Task Status</Typography>
                                        <Box mt={2}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart
                                                    width="100%"
                                                    height={300}
                                                    data={data}
                                                    margin={{
                                                        top: 5,
                                                        right: 30,
                                                        left: 20,
                                                        bottom: 5,
                                                    }}
                                                >
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    }
                </Box>
            </Box>
        </>
    );
};

export const getServerSideProps = authMiddleware(async (context) => {
    const { req } = context;

    const cookies = parse(req.headers.cookie || '');
    const token = cookies['token'] || null;

    return {
        props: {
            token,
        },
    };
});

export default AdminDashboard;
