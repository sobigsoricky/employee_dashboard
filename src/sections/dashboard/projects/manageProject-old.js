import React, { useEffect } from 'react'
import { Box, Card, CardContent, Grid, IconButton, Paper, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProjects } from '@/redux/actions/admin/project-action'
import { getTeams } from '@/redux/actions/admin/teamAction'

const ManageProject = ({ setAddNewProject }) => {
    const { projects } = useSelector(state => state.projectReducer)
    const { teams } = useSelector(state => state.teamReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllProjects())
    }, [])

    useEffect(() => {
        dispatch(getTeams())
    }, [])

    console.log(projects)

    return (
        <>
            <Box>
                <Typography variant='h1' className='fw-semibold'>Manage Project</Typography>
                <Box mt={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card className='TeamCard' component={Paper} onClick={() => setAddNewProject(true)}>
                                <CardContent className='d-flex flex-column align-items-center p-0'>
                                    <Typography variant='h3' align='center' className='fw-semibold mb-3'>Add Projects</Typography>
                                    <IconButton sx={{ backgroundColor: "#F8F9FA", height: "4.5rem", width: '4.5rem' }} className='mb-3'><Add sx={{ fontSize: "1.5rem" }} /></IconButton>
                                    <Typography align='center'>Manage as many projects as you want</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        {
                            projects && projects !== null && projects !== undefined && projects !== "" && projects.length > 0 && projects.map(project => <Grid item xs={12} sm={6} md={4}>
                                <Card className='TeamCard' component={Paper} sx={{ height: "100%" }}>
                                    <CardContent className='d-flex flex-column align-items-center p-0'>
                                        <Typography variant='h3' align='center' className='fw-semibold mb-3'>{project.projectName}</Typography>
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

export default ManageProject