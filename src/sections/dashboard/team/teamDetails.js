import React, { useEffect, useState } from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import { Delete, Person } from '@mui/icons-material';

const TeamDetails = ({ team, employees }) => {
    const [manager, setManager] = useState([]);
    const [members, setMembers] = useState([])

    useEffect(() => {
        if (team && team !== null && team !== undefined && team !== "" && Object.keys(team).length > 0 && employees !== null && employees !== undefined && employees !== "") {
            const filterManager = employees.filter(employee => team?.managers.includes(employee?._id))
            const filterMembers = employees.filter(employee => team?.members.includes(employee?._id))
            setManager(filterManager)
            setMembers(filterMembers)
        }
    }, [team])

    return (
        <>
            {
                team && team !== null && team !== undefined && team !== "" && Object.keys(team).length > 0 && <Box>
                    <Typography variant='h1' className='fw-semibold'>Team - {team?.teamName}</Typography>
                    {
                        manager && manager !== null && manager !== undefined && manager !== "" && manager.length > 0 && <Box mt={5} className="table-responsive">
                            <Typography variant='h2' className='fw-semibold mb-3'>Managers</Typography>
                            <table cellpadding="16" border="1" rules="all" style={{ width: "100%", borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th>Sr</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Designation</th>
                                        {/* <th></th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        manager.map((m, index) => <tr>
                                            <td>{index + 1}</td>
                                            <td>{m?.firstName} {m?.lastName}</td>
                                            <td>{m?.email}</td>
                                            <td>{m?.phone}</td>
                                            <td>{m?.designation}</td>
                                            {/* <td>
                                                <IconButton><Delete className='text-danger' /></IconButton>
                                            </td> */}
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </Box>
                    }
                    {
                        members && members !== null && members !== undefined && members !== "" && members.length > 0 && <Box mt={5} className="table-responsive">
                            <Typography variant='h2' className='fw-semibold mb-3'>Members</Typography>
                            <table cellpadding="16" border="1" rules="all" style={{ width: "100%", borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th>Sr</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Designation</th>
                                        {/* <th></th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        members.map((member, index) => <tr>
                                            <td>{index + 1}</td>
                                            <td>{member?.firstName} {member?.lastName}</td>
                                            <td>{member?.email}</td>
                                            <td>{member?.phone}</td>
                                            <td>{member?.designation}</td>
                                            {/* <td>
                                                <IconButton className='me-3'><Person /></IconButton>
                                                <IconButton><Delete className='text-danger' /></IconButton>
                                            </td> */}
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </Box>
                    }
                </Box>
            }
        </>
    )
}

export default TeamDetails