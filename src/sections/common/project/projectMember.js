import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'

const ProjectMember = ({ employees, teams, assignedTeam, manager }) => {
    const [assignedT, setAssignedT] = useState([]);
    const [teamMembers, setTeamMember] = useState([])

    useEffect(() => {
        if (teams && teams.length > 0 && assignedTeam && assignedTeam.length > 0) {
            const filteredTeams = teams.filter(team => assignedTeam.includes(team._id));
            setAssignedT(filteredTeams);
        }
    }, [assignedTeam, teams]);

    useEffect(() => {
        if (employees && employees.length > 0 && assignedT && assignedT.length > 0) {
            const filteredEmp = assignedT.flatMap(item => {
                return employees.filter(employee => item.members.includes(employee._id))
            })
            setTeamMember(filteredEmp)
        }
    }, [employees, assignedT]);

    const setTeams = (t) => {
        const filterTeams = teams.filter(team => t.includes(team._id))
        const text = filterTeams.map((item, index) => `${item.teamName}${filterTeams.length !== index + 1 ? ", " : ""}`)
        return text
    }


    return (
        <>
            {
                assignedT && assignedT !== null && assignedT !== undefined && assignedT !== "" && assignedT.length > 0 && <Box>
                    <Typography variant='h2' className='fw-semibold'>Teams</Typography>
                    <Box className="table-responsive" mt={2}>
                        <table rules='all' style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <th>#</th>
                                <th>Team Name</th>
                                <th>Team Description</th>
                            </thead>
                            <tbody>
                                {
                                    assignedT.map((team, index) => <tr>
                                        <td>{index + 1}</td>
                                        <td>{team?.teamName}</td>
                                        <td>{team?.teamDesc}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </Box>
                </Box>
            }

            {
                manager && manager !== null && manager !== undefined && manager !== "" && manager.length > 0 && teams && teams !== null && teams !== undefined && teams !== "" && teams.length > 0 && <Box mt={5}>
                    <Typography variant='h2' className='fw-semibold'>Manager</Typography>
                    <Box className="table-responsive" mt={3}>
                        <table rules='all' style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <th>#</th>
                                <th>Name</th>
                                <th>Designation</th>
                                <th>Teams</th>
                                <th>Email</th>
                            </thead>
                            <tbody>
                                {
                                    manager.map((member, index) => <tr>
                                        <td>{index + 1}</td>
                                        <td>{member?.firstName} {member?.lastName}</td>
                                        <td>{member?.designation}</td>
                                        <td>{setTeams(member?.teams)}</td>
                                        <td>{member?.email}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </Box>
                </Box >
            }

            {
                teamMembers && teamMembers !== null && teamMembers !== undefined && teamMembers !== "" && teamMembers.length > 0 && teams && teams !== null && teams !== undefined && teams !== "" && teams.length > 0 && <Box mt={5}>
                    <Typography variant='h2' className='fw-semibold'>Members</Typography>
                    <Box className="table-responsive" mt={3}>
                        <table rules='all' style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <th>#</th>
                                <th>Name</th>
                                <th>Designation</th>
                                <th>Teams</th>
                                <th>Email</th>
                            </thead>
                            <tbody>
                                {
                                    teamMembers.map((member, index) => <tr>
                                        <td>{index + 1}</td>
                                        <td>{member?.firstName} {member?.lastName}</td>
                                        <td>{member?.designation}</td>
                                        <td>{setTeams(member?.teams)}</td>
                                        <td>{member?.email}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </Box>
                </Box>
            }
        </>
    )
}

export default ProjectMember