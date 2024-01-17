import { Layout } from '@/components'
import { Head, UserMainContainer } from '@/sections'
import { Box, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { parse } from 'cookie'
import { authenticateUser, logoutAdmin } from '@/redux/actions/authAction'
import authMiddleware from '@/middleware'

const index = ({ token }) => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.authReducer)

    useEffect(() => {
        if (token) dispatch(authenticateUser(token))
    }, [token])

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


export default index