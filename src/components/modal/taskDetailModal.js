import React from 'react'
import Link from 'next/link'
import { Box, Chip, Dialog, DialogContent, Typography, IconButton, Button, Grid } from '@mui/material'
import { Close } from '@mui/icons-material'
import month from '@/data/month'

const TaskDetailModal = ({ open, task, handleCloseTaskDetailModal, handleTaskDelete, listId, employees, admins, projects, handleMarkComplete }) => {
    const setPriority = (p) => {
        if (p === "high") {
            return <><Chip label="High" color='error' /></>
        } else if (p === "medium") {
            return <><Chip label="Medium" color='warning' /></>
        } else if (p === "low") {
            return <><Chip label="Low" color='success' /></>
        }
    }

    console.log(task)

    const setAssignedTo = (a) => {
        const filterAssignedTo = [...admins.filter(admin => a.includes(admin._id)), ...employees.filter(employee => a.includes(employee._id))][0]
        return filterAssignedTo?.firstName + " " + filterAssignedTo?.lastName || filterAssignedTo?.details?.firstName + " " + filterAssignedTo?.details?.lastName
    }

    const setProject = (p) => {
        const filteredProject = projects.filter(project => project._id === p)
        return (<>{filteredProject[0]?.projectName}</>)
    }

    const formatDate = (d) => {
        return <>{`${d.split('T')[0].split("-")[2]} ${month[Number(d.split('T')[0].split("-")[1]) - 1]}, ${d.split('T')[0].split("-")[0]}`}</>
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

    const setCollaborators = (c) => {
        const filterCollaborator = [...admins.filter(admin => c.includes(admin._id)), ...employees.filter(employee => c.includes(employee._id))]
        if (filterCollaborator.length > 0) {
            return filterCollaborator.map(item => {
                return item?.firstName + " " + item?.lastName || item?.details?.firstName + " " + item?.details?.lastName
            })
        }
        return [];
    }

    const setAssignedBy = (c) => {
        const filterAssignedBy = [...admins.filter(admin => c.includes(admin._id)), ...employees.filter(employee => c.includes(employee._id))][0]
        return filterAssignedBy?.firstName + " " + filterAssignedBy?.lastName || filterAssignedBy?.details?.firstName + " " + filterAssignedBy?.details?.lastName
    }


    return (
        <>
            <Dialog open={open} maxWidth="sm" fullWidth id="modal">
                <DialogContent>
                    {
                        task && task !== null && task !== undefined && task !== "" && Object.keys(task).length > 0 && <Box>
                            <Box className="d-flex justify-content-between align-items-center">
                                <Box>
                                    <Button className='btn--dark me-3' onClick={() => handleTaskDelete(task._id, listId)}>Delete Task</Button>
                                    {!task?.isCompleted && <Button className='btn--dark-outlined' onClick={() => handleMarkComplete(task)}>Mark Complete</Button>}
                                </Box>
                                <Box>
                                    <IconButton onClick={() => handleCloseTaskDetailModal()}><Close /></IconButton>
                                </Box>
                            </Box>
                            <Box mt={5}>
                                <Typography variant="h2" className='fw-semibold'>{task?.taskName}</Typography>
                                <Box mt={5} className="table-responsive">
                                    <table cellpadding="16" border="1" rules="all" style={{ width: "100%", borderCollapse: 'collapse' }}>
                                        <tr>
                                            <th>Due Date</th>
                                            <td>{formatDate(task?.taskDueDate)}</td>
                                        </tr>
                                        <tr>
                                            <th>Priority</th>
                                            <td>{setPriority(task?.priority)}</td>
                                        </tr>
                                        <tr>
                                            <th>Status</th>
                                            <td>{setProjectStatus(task?.taskDueDate)}</td>
                                        </tr>
                                        <tr>
                                            <th>Project</th>
                                            <td>{setProject(task?.project)}</td>
                                        </tr>
                                        <tr>
                                            <th>Assigned Task</th>
                                            <td>{setAssignedTo(task?.assignedTo)}</td>
                                        </tr>
                                        <tr>
                                            <th>Collaborators</th>
                                            <td>{setCollaborators(task?.collaborator)}</td>
                                        </tr>
                                        <tr>
                                            <th>Assigned By</th>
                                            <td>{setAssignedBy(task?.createdBy)}</td>
                                        </tr>
                                    </table>
                                </Box>
                                <Box mt={5}>
                                    <Typography variant='h3' className='fw-semibold' gutterBottom>Descriptions</Typography>
                                    <Typography>{task?.description}</Typography>
                                </Box>
                                {
                                    task?.attachments && <Box mt={5}>
                                        <Typography variant='h3' className='fw-semibold' gutterBottom>Attachments</Typography>
                                        <Box mt={2}>
                                            <Grid container spacing={2}>
                                                {
                                                    task?.attachments.map(item => <Grid item xs={12} sm={6} md={4}>
                                                        <Link href={item}>
                                                            <img src={item} className='img-fluid' />
                                                        </Link>
                                                    </Grid>)
                                                }
                                            </Grid>
                                        </Box>
                                    </Box>
                                }
                            </Box>
                        </Box>
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}

export default TaskDetailModal