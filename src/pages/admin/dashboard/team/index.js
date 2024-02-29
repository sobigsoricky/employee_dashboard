import { Layout } from '@/components'
import { AddTeam, Head, ManageTeam } from '@/sections'
import React, { useEffect, useState } from 'react'
import { authenticateUser } from '@/redux/actions/authAction'
import { useDispatch, useSelector } from 'react-redux'
import { Box, } from '@mui/material'

const Team = () => {
    const [addNewTeam, setAddNewTeam] = useState(false)
    const { userInfo, error, message, actionT } = useSelector(state => state.authReducer);
    const dispatch = useDispatch()

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

export default Team