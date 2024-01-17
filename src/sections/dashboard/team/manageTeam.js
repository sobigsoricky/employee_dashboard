import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Avatar, Box, Typography, Grid, Paper, Card, CardContent, IconButton, AvatarGroup } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { getTeams } from '@/redux/actions/admin/teamAction'
import { toast } from 'react-toastify'
import { getAllEmployees } from '@/redux/actions/admin/employee-action'

const ManageTeam = ({ setAddNewTeam }) => {
    const { teams, error, message, actionT } = useSelector(state => state.teamReducer)
    const { employees } = useSelector(state => state.adminEmployeeReducer)
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        dispatch(getTeams())
    }, [])

    useEffect(() => {
        if (error && actionT === "fetch") {
            toast.error(message)
        }
    }, [error, actionT])

    useEffect(() => {
        dispatch(getAllEmployees())
    }, [])

    console.log(teams, employees)

    const getEmployeeName = (id) => {
        if (employees) {
            const filteredEmp = employees.filter(entries => entries._id === id)
            return `${filteredEmp[0]?.firstName} ${filteredEmp[0]?.lastName}`
        }
    }

    const getEmployeeProfile = (id) => {
        if (employees) {
            const filteredEmp = employees.filter(entries => entries._id === id)
            return filteredEmp[0]?.displayProfile
        }
    }

    return (
        <>
            <Box p={{ xs: 2, sm: 4 }} className="dashboard-main-container">
                <Typography variant='h1' className='fw-semibold'>Manage Teams</Typography>
                <Box mt={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <Card className='TeamCard' component={Paper} onClick={() => setAddNewTeam(true)}>
                                <CardContent className='d-flex flex-column align-items-center p-0'>
                                    <Typography variant='h3' align='center' className='fw-semibold mb-3'>Add Team</Typography>
                                    <IconButton sx={{ backgroundColor: "#F8F9FA", height: "4.5rem", width: '4.5rem' }} className='mb-3'><Add sx={{ fontSize: "1.5rem" }} /></IconButton>
                                    <Typography align='center'>Manage as many teams as you want</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        {
                            teams && teams !== null && teams !== undefined && teams !== "" && teams.length > 0 && teams.map(item => <Grid item xs={12} sm={4}>
                                <Card className='TeamCard' component={Paper} onClick={() => router.push('/admin/dashboard/team/')} sx={{ height: "100%" }}>
                                    <CardContent className='d-flex flex-column align-items-center p-0'>
                                        <Typography variant='h3' align='center' className='fw-semibold mb-3'>{item.teamName}</Typography>
                                        <Box sx={{ height: "5.5rem" }} className="d-flex align-items-center">
                                            <AvatarGroup total={item.members && item.members !== null && item.members !== undefined && item.members !== "" && item.members.length}>
                                                {
                                                    item.members.map(item => <Avatar alt={getEmployeeName(item)} src={getEmployeeProfile(item)} />)
                                                }
                                            </AvatarGroup>
                                        </Box>
                                        <Box>
                                            <Typography align='center'>
                                                {
                                                    item.members.slice(0, 4).map((employeeId, index) => (
                                                        <React.Fragment key={employeeId}>
                                                            <span>{getEmployeeName(employeeId)}</span>
                                                            {index < item.members.slice(0, 4).length - 1 && <span>, </span>}
                                                        </React.Fragment>
                                                    ))
                                                }
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>)
                        }
                    </Grid>
                </Box>
            </Box>

        </>
    )
}

export default ManageTeam