import { Layout } from '@/components'
import { AddNewProject, Head, ManageProject, UserMainContainer } from '@/sections'
import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { parse } from 'cookie'
import {authenticateEmployee  } from '@/redux/actions/authAction'
import authMiddleware from '@/middleware'
import { useRouter } from 'next/router'

const index = ({ token }) => {
      const [addNewProject,setAddNewProject]=useState(false);
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.employeeAuthReducer)
const route=useRouter();
    useEffect(() => {
        if (token) dispatch(authenticateEmployee (token))
    }, [token])
    return (
        <>
            <Head title="Project | Employee" />
            <Layout isAdmin={false} userInfo={userInfo} />
            <Box className="dashboard-main" id="projectMain">
                <Box className="dashboard-main-container" p={{ xs: 2, sm: 4 }}>
                    {
                        addNewProject ? <AddNewProject setAddNewProject={setAddNewProject} /> : <ManageProject setAddNewProject={setAddNewProject} isAdmin={false}/>
                    }
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

export default index