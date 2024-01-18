import React from 'react'
import { useRouter } from 'next/router'
import { Box, Typography, Card, CardContent, Paper } from '@mui/material'

const EmployeeCard = ({ name, designation, avatar, id }) => {
    const router = useRouter()
    return (
        <>
            <Card className='employeeCard' component={Paper} onClick={() => router.push(`/admin/dashboard/user/${id}`)}>
                <CardContent className='d-flex flex-column justify-content-center align-items-center'>
                    <Box p={0.5} className="placeholderCirle">
                        <img src={avatar} className='img-fluid' />
                    </Box>
                    <Typography variant='h4' className='fw-semibold' align='center' gutterBottom>{name}</Typography>
                    <Typography align='center'>{designation}</Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default EmployeeCard