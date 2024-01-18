import React from 'react'
import { Card, CardContent, Typography, IconButton } from '@mui/material'
import { Add } from '@mui/icons-material'

const TeamCard = ({ total, members, getEmployeeName, getEmployeeProfile }) => {
    return (
        <>
            <Card className='TeamCard' component={Paper}>
                <CardContent className='d-flex flex-column align-items-center p-0'>
                    <Typography variant='h3' align='center' className='fw-semibold mb-3'>{item.teamName}</Typography>
                    <Box sx={{ height: "5.5rem" }} className="d-flex align-items-center">
                        <AvatarGroup total={total}>
                            {
                                members.map(item => <Avatar alt={getEmployeeName(item)} src={getEmployeeProfile(item)} />)
                            }
                        </AvatarGroup>
                    </Box>
                    <Box>
                        <Typography align='center'>
                            {
                                members.slice(0, 4).map((employeeId, index) => (
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
        </>
    )
}

export default TeamCard