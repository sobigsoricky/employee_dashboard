import React, { useEffect } from 'react'
import { getAllEmployees } from '@/redux/actions/admin/employee-action'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Button, Grid, Card, CardContent, IconButton } from '@mui/material'
import { EmployeeCard } from '@/components'
import { Add } from '@mui/icons-material'

const AdminEmployeesSection = ({ setShowEmp }) => {
    const { employees, error, message, actionT } = useSelector(state => state.adminEmployeeReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllEmployees())
    }, [])

    return (
        <>
            <Box p={2} sx={{ height: "100%" }}>
                <Box className="d-flex justify-content-between align-items-center">
                    <Typography variant='h2' className='text-dark fw-semibold'>Employees</Typography>
                    <Button className='btn--dark' onClick={() => setShowEmp(false)}>Add New Employee</Button>
                </Box>
                <Box mt={5} sx={{ height: "100%" }}>
                    {
                        employees && employees !== null && employees !== undefined && employees !== "" && employees.length > 0 ? <>
                            <Box>
                                <Grid container spacing={2}>
                                    {
                                        employees.map(item => <Grid key={item._id} item xs={6} sm={6} md={4} lg={3}>
                                            <EmployeeCard name={`${item.firstName} ${item.lastName}`} designation={item.designation} avatar={item.displayProfile} id={item._id} />
                                        </Grid>)
                                    }
                                </Grid>
                            </Box>
                        </> : <Box sx={{ height: "100%" }} className="d-flex justify-content-center align-items-center flex-column">
                            <Typography variant='h3' gutterBottom>Please add employee</Typography>
                            <Button className='btn--dark' onClick={() => setShowEmp(false)}>Add a Employee</Button>
                        </Box>
                    }
                </Box>
            </Box>
        </>
    )
}

export default AdminEmployeesSection