import { Layout } from '@/components'
import { AddNewProject, Head, ManageProject } from '@/sections'
import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { authenticateUser } from '@/redux/actions/authAction'

const index = ({ token }) => {
    const [addNewProject, setAddNewProject] = useState(false)
    const dispatch = useDispatch()
    const { userInfo, error, message, actionT } = useSelector(state => state.authReducer);

    useEffect(() => {
        if (error && actionT === "auth") {
            dispatch(logoutEmployeeUser())
            router.push('/user/auth/')
        }
    }, [error, actionT])

    useEffect(() => {
        dispatch(authenticateUser())
    }, [dispatch])
    return (
        <>
            <Head title="Project | Admin" />
            <Layout isAdmin={true} userInfo={userInfo} />
            <Box className="dashboard-main" id="projectMain">
                <Box className="dashboard-main-container" p={{ xs: 2, sm: 4 }}>
                    {
                        addNewProject ? <AddNewProject setAddNewProject={setAddNewProject} userInfo={userInfo} /> : <ManageProject setAddNewProject={setAddNewProject} />
                    }
                </Box>
            </Box>
        </>
    )
}

export default index