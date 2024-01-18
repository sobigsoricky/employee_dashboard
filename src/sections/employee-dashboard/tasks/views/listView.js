import React, { useState } from 'react'
import { Box, Chip, AvatarGroup, Avatar, IconButton } from '@mui/material'
import month from '@/data/month'
import { Delete } from '@mui/icons-material'

const ListView = ({ tasks, projects, employees, handleMarkComplete, handleTaskDelete }) => {
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

    const setProject = (p) => {
        const filteredProject = projects.filter(project => project._id === p)
        return (<>{filteredProject[0]?.projectName}</>)
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
            {
                tasks && tasks !== null && tasks !== undefined && tasks !== "" && tasks.length > 0 && projects && projects !== null && projects !== undefined && projects !== "" && projects.length > 0 && <Box className="table-responsive">
                    <table border="1" rules='all' className='table' style={{ borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Mark Complete</th>
                                <th>Task name</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Due date</th>
                                <th>Project</th>
                                <th>Collaborator</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tasks.map((task, index) => <tr className={task?.isCompleted ? 'completed-task' : 'incomplete-task'}>
                                    <td>{index + 1}</td>
                                    <td>{task?.isCompleted ? <span class="text-success">Completed</span> : <input type='checkbox' onChange={() => handleMarkComplete(task)} />}</td>
                                    <td>{task.taskName}</td>
                                    <td>{setProjectStatus(task?.taskDueDate)}</td>
                                    <td>{setPriority(task?.priority)}</td>
                                    <td>{formatDate(task?.taskDueDate)}</td>
                                    <td>{setProject(task?.project)}</td>
                                    <td>{setCollaborator(task?.collaborator)}</td>
                                    <td><IconButton onClick={() => handleTaskDelete(task)} ><Delete className='text-danger' /></IconButton></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </Box >
            }
        </>
    )
}

export default ListView