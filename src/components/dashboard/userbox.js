import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Logout } from '@mui/icons-material'
import { Avatar, Box, Grid, IconButton, Typography } from '@mui/material'
import { logoutAdmin, logoutEmployeeUser } from '@/redux/actions/authAction'
import { toast } from 'react-toastify'

const UserBox = ({ isAdmin }) => {
    const { userInfo, error, message } = useSelector(state => isAdmin ? state.authReducer : state.employeeAuthReducer)
    const dispatch = useDispatch()

    function stringToColor(string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    const handleLogoutAdmin = () => {
        if (isAdmin) {
            dispatch(logoutAdmin())
        } else if (!isAdmin) {
            dispatch(logoutEmployeeUser())
        }
    }

    useEffect(() => {
        if (!userInfo && error && isAdmin) {
            toast.error(message)
            dispatch(logoutAdmin())
        } else if (!userInfo && error && !isAdmin) {
            toast.error(message)
            dispatch(logoutEmployeeUser())
        }
    }, [userInfo, error, isAdmin])

    return (
        <>
            <Box pt={2} className="side-panel-user-box" sx={{ borderTop: "1px solid #475467" }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={10}>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={2.5}>
                                    <Avatar component={IconButton}  {...stringAvatar(`${userInfo !== null && userInfo !== undefined && userInfo !== "" && Object.keys(userInfo).length > 0 && userInfo.details !== null && userInfo.details !== undefined && userInfo.details !== "" && Object.keys(userInfo.details).length > 0 && userInfo.details.firstName && userInfo.details.firstName !== null && userInfo.details.firstName !== undefined && userInfo.details.firstName !== "" && userInfo.details.firstName.split("")[0]} ${userInfo !== null && userInfo !== undefined && userInfo !== "" && Object.keys(userInfo).length > 0 && userInfo.details !== null && userInfo.details !== undefined && userInfo.details !== "" && Object.keys(userInfo.details).length > 0 && userInfo.details.lastName && userInfo.details.lastName !== null && userInfo.details.lastName !== undefined && userInfo.details.lastName !== "" && userInfo.details.lastName.split("")[0]}`)} sx={{ width: isAdmin ? 36 : 45, height: isAdmin ? 36 : 45 }} src={!isAdmin && userInfo?.displayProfile} />
                                </Grid>
                                <Grid item xs={9.5}>
                                    <Box sx={{ overflow: 'hidden' }}>
                                        <Typography className='text-white'>{isAdmin && userInfo?.details?.firstName || !isAdmin && userInfo?.firstName} {isAdmin && userInfo?.details?.lastName || !isAdmin && userInfo?.lastName}</Typography>
                                        <Typography className='text-white'>{userInfo?.email} </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Box className="side-panel-logout">
                            <IconButton onClick={handleLogoutAdmin} sx={{ height: 24, width: 24 }}><Logout className='text-white' /></IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default UserBox