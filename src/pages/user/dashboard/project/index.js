import { Layout } from '@/components'
import { AddNewProject, Head, ManageProject, UserMainContainer } from '@/sections'
import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { parse } from 'cookie'
import { authenticateEmployee } from '@/redux/actions/authAction'
import authMiddleware from '@/middleware'
import { useRouter } from 'next/router'

const index = () => {
    const [addNewProject, setAddNewProject] = useState(false);
    const dispatch = useDispatch()
    const { userInfo, error, message, actionT } = useSelector(state => state.employeeAuthReducer)
    const router = useRouter();

    useEffect(() => {
        dispatch(authenticateEmployee())
    }, [dispatch])

    useEffect(() => {
        if (error && actionT === "auth") {
            dispatch(logoutEmployeeUser())
            router.push('/user/auth/')
        }
    }, [error, actionT])

    return (
        <>
            <Head title="Project | Employee" />
            <Layout isAdmin={false} userInfo={userInfo} />
            <Box className="dashboard-main" id="projectMain">
                <Box className="dashboard-main-container" p={{ xs: 2, sm: 4 }}>
                    <ManageProject userInfo={userInfo} setAddNewProject={setAddNewProject} isAdmin={false} />
                </Box>
            </Box>
        </>
    )
}

export default index