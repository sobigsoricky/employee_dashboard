import React from 'react'
import { Box, Chip, AvatarGroup, Avatar, Typography } from '@mui/material'
import month from '@/data/month'

const ProjectTasks = ({ tasks, employees, teams }) => {
    const setPriority = (p) => {
        if (p === "high") {
            return <><Chip label="High" color='error' /></>
        } else if (p === "medium") {
            return <><Chip label="Medium" color='warning' /></>
        } else if (p === "low") {
            return <><Chip label="Low" color='success' /></>
        }
    }

    const formatDate = (d) => {
        return <>{`${d.split('T')[0].split("-")[2]} ${month[Number(d.split('T')[0].split("-")[1]) - 1]}, ${d.split('T')[0].split("-")[0]}`}</>
    }

    const setCollaborator = (c) => {
        const filteredCollaborator = employees.filter(employee => c.includes(employee._id))
        return (<><AvatarGroup>
            {filteredCollaborator.map(employee => (
                <Avatar
                    key={employee._id}
                    alt={`${employee.firstName} ${employee.lastName}`}
                    src={employee.displayProfile}
                    sx={{ width: "1.5rem", height: "1.5rem" }}
                />
            ))}
        </AvatarGroup></>)
    }

    const setAssignTo = (a) => {
        const filteredAssignTo = employees.filter(employee => a.includes(employee._id))
        return (<><AvatarGroup>
            {filteredAssignTo.map(employee => (
                <Avatar
                    key={employee._id}
                    alt={`${employee.firstName} ${employee.lastName}`}
                    src={employee.displayProfile}
                    sx={{ width: "1.5rem", height: "1.5rem" }}
                />
            ))}
        </AvatarGroup></>)
    }

    const setProjectStatus = (s) => {
        const dueDate = s.split("T")[0]
        const dueMiliSecond = new Date(dueDate).getTime()
        const currentMilisecond = new Date().getTime()

        if (dueMiliSecond > currentMilisecond) {
            return (<><span className='text-success'>Upcoming</span></>)
        } else if (dueMiliSecond < currentMilisecond) {
            return (<><span className='text-danger'>Overdue</span></>)
        }
    }
    return (
        <>
            {tasks && tasks !== null && tasks !== undefined && tasks !== "" && tasks.length > 0 ? <Box className="table-responsive">
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Task name</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Due date</th>
                            <th>Assign To</th>
                            <th>Collaborator</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map((task, index) => <tr className={task?.isCompleted ? 'completed-task' : 'incomplete-task'}>
                                <td>{index + 1}</td>
                                <td>{task.taskName}</td>
                                <td>{setProjectStatus(task?.taskDueDate)}</td>
                                <td>{setPriority(task?.priority)}</td>
                                <td>{formatDate(task?.taskDueDate)}</td>
                                <td>{setAssignTo(task?.assignedTo)}</td>
                                <td>{setCollaborator(task?.collaborator)}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </Box> : <Box>
                <Typography variant='h2' align="center" className='fw-semibold'>No Tasks</Typography>
            </Box>
            }
        </>
    )
}

export default ProjectTasks