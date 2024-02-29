import React, { useEffect } from 'react'
import { Layout } from '@/components'
import { Head, UserMainContainer } from '@/sections'
import { Box } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { authenticateUser, logoutAdmin } from '@/redux/actions/authAction';

const index = () => {
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
            <Head title="User | Admin" />
            <Layout isAdmin={true} userInfo={userInfo} />
            <Box className="dashboard-main">
                <Box className="dashboard-main-container">
                    <UserMainContainer />
                </Box>
            </Box>
        </>
    )
}

export default index