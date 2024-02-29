import React, { useEffect } from 'react'
import { Layout } from "@/components";
import { Head, ProjectDetails } from "@/sections";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { authenticateUser } from "@/redux/actions/authAction";

const SingleProject = () => {
    const dispatch = useDispatch();
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
            <Head title="Project | Employee" />
            <Layout isAdmin={true} userInfo={userInfo} />
            <Box className="dashboard-main" id="projectMain">
                <Box className="dashboard-main-container" p={{ xs: 2, sm: 4 }}>
                    <ProjectDetails isAdmin={true} />
                </Box>
            </Box>
        </>
    )
}

export default SingleProject