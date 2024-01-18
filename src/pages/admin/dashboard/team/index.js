import { Layout } from '@/components'
import { AddTeam, Head, ManageTeam } from '@/sections'
import React, { useEffect, useState } from 'react'
import authMiddleware from '@/middleware'
import { parse } from 'cookie'
import { authenticateUser } from '@/redux/actions/authAction'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Card, CardContent, Grid, Paper, IconButton, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'

const Team = ({ token }) => {
    const [addNewTeam, setAddNewTeam] = useState(false)
    const { userInfo, error, message } = useSelector(state => state.authReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        if (token) dispatch(authenticateUser(token))
    }, [token])

    return (
        <>
            <Head title="Team | Admin" />
            <Layout isAdmin={true} userInfo={userInfo} />
            <Box className="dashboard-main" id="TeamMain">
                {
                    !addNewTeam ? <ManageTeam setAddNewTeam={setAddNewTeam} /> : <AddTeam setAddNewTeam={setAddNewTeam} />
                }
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

export default Team