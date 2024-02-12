import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Head, WorkUpdate, WorkHistory } from '@/sections'
import { Layout } from '@/components'
import { parse } from 'cookie'
import { authenticateEmployee } from '@/redux/actions/authAction'
import authMiddleware from '@/middleware'
import { useSelector, useDispatch } from 'react-redux'

const repoting = ({ token }) => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.employeeAuthReducer)
    const [selectedTab, setSelectedTab] = useState(1);

    useEffect(() => {
        if (token) dispatch(authenticateEmployee(token))
    }, [token])

    return (
        <>
            <Head title="Reporting - Employee Dashboard" />
            <Layout userInfo={userInfo} isAdmin={false} />
            <Box className="dashboard-main" id="taskMain">
                <Box className="dashboard-main-container" p={{ xs: 2, sm: 4 }}>
                    <Typography variant="h1" className='fw-semibold'>Reporting</Typography>
                    <Box mt={5}>
                        <Box className="tab-container">
                            <Button className={`tab ${selectedTab === 1 ? 'active' : ''}`} onClick={() => setSelectedTab(1)}>Daily Update</Button>
                            <Button className={`tab ${selectedTab === 2 ? 'active' : ''}`} onClick={() => setSelectedTab(2)}>Work History</Button>
                        </Box>
                    </Box>
                    <Box mt={5}>
                        {
                            selectedTab === 1 ? <WorkUpdate userInfo={userInfo} /> : selectedTab === 2 ? <WorkHistory /> : null
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


export default repoting