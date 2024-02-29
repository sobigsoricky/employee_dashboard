import { Layout } from '@/components'
import { AddNewProject, Head, ManageProject } from '@/sections'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { authenticateUser, logoutAdmin } from '@/redux/actions/authAction'

const index = () => {
    const [addNewProject, setAddNewProject] = useState(false)
    const dispatch = useDispatch()
    const { userInfo, error, message, actionT } = useSelector(state => state.authReducer);

    useEffect(() => {
        dispatch(authenticateUser())
    }, [dispatch])

    useEffect(() => {
        if (error && actionT === "auth") {
            dispatch(logoutAdmin())
        }
    }, [error, actionT])

    return (
        <>
            <Head title="Project | Admin" />
            <Layout isAdmin={true} userInfo={userInfo} />
            <Box className="dashboard-main" id="projectMain">
                <Box className="dashboard-main-container" p={{ xs: 2, sm: 4 }}>
                    {
                        addNewProject ? <AddNewProject userInfo={userInfo} setAddNewProject={setAddNewProject} /> : <ManageProject isAdmin={true} setAddNewProject={setAddNewProject} />
                    }
                </Box>
            </Box>
        </>
    )
}

export default index