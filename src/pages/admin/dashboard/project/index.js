import { Layout } from '@/components'
import { AddNewProject, Head, ManageProject, UserMainContainer } from '@/sections'
import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { parse } from 'cookie'
import { authenticateUser, logoutAdmin } from '@/redux/actions/authAction'
import authMiddleware from '@/middleware'

const index = ({ token }) => {
    const [addNewProject, setAddNewProject] = useState(false)
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.authReducer)

    useEffect(() => {
        if (token) dispatch(authenticateUser(token))
    }, [token])
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