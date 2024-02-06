import React from 'react';
import { Box, Button, Paper, Typography, Grid, Avatar, AvatarGroup } from '@mui/material';
import { Circle, AccessTime, AddCircle } from '@mui/icons-material';
import month from '@/data/month';
import { TaskCard } from '@/components';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const TaskList = ({ listName, total, employees, color, id, tasks, listTasks, isAdmin, userInfo, handleOpenTaskDetailModal }) => {

    const formatDate = (d) => {
        return <>{`${d.split('T')[0].split("-")[2]} ${month[Number(d.split('T')[0].split("-")[1]) - 1]}, ${d.split('T')[0].split("-")[0]}`}</>;
    };

    const setAssignTo = (a, task) => {
        const filteredAssignTo = employees.filter(employee => a.includes(employee._id));
        return (
            <>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={2}>
                        <Avatar variant="circular" src={filteredAssignTo?.[0]?.displayProfile} alt="" />
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant='h4' className='fw-semibold' gutterBottom>{filteredAssignTo?.[0]?.firstName} {filteredAssignTo?.[0]?.lastName}</Typography>
                        <Typography className='date' ><AccessTime /> {formatDate(task?.taskDueDate)}</Typography>
                    </Grid>
                </Grid>
            </>
        );
    };

    const setCollaborator = (c) => {
        const filteredCollaborator = employees.filter(employee => c.includes(employee._id));
        return (
            <>
                <AvatarGroup className='ms-2'>
                    {filteredCollaborator.map(employee => (
                        <Avatar
                            key={employee._id}
                            alt={`${employee.firstName} ${employee.lastName}`}
                            src={employee.displayProfile}
                            sx={{ width: "1.5rem", height: "1.5rem" }}
                        />
                    ))}
                </AvatarGroup>
            </>
        );
    };

    const getTask = (id, index) => {
        if (isAdmin) {
            const task = tasks.filter(entries => entries._id === id)[0]
            if (task) {
                return (
                    <Draggable key={task?._id} draggableId={task?._id} index={index}>
                        {(provided) => (
                            <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <TaskCard assignToBox={setAssignTo(task?.assignedTo, task)} taskName={task?.taskName} collaborator={setCollaborator(task?.collaborator)} handleOpenTaskDetailModal={handleOpenTaskDetailModal} task={task} />
                            </Box>
                        )}
                    </Draggable>
                )
            }
        } else if (!isAdmin) {
            const task = tasks.filter(entries => entries._id === id)[0]
            if (task) {
                const isAssignedTo = task.assignedTo.includes(userInfo._id);
                const isCollaborator = task.collaborator.includes(userInfo._id);
                const isCreator = task.createdBy === userInfo._id

                if (isAssignedTo || isCollaborator || isCreator) {
                    return (
                        <Draggable key={task?._id} draggableId={task?._id} index={index}>
                            {(provided) => (
                                <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <TaskCard assignToBox={setAssignTo(task?.assignedTo, task)} taskName={task?.taskName} collaborator={setCollaborator(task?.collaborator)} />
                                </Box>
                            )}
                        </Draggable>
                    )
                }
            }
        }
    }


    return (
        <>
            <Box p={1.5} className="list-container">
                <Box p={1.5} className="list-name shadow d-flex justify-content-between align-items-center" component={Paper}>
                    <Typography variant="h3" sx={{ color: color }}><Circle className='me-1' sx={{ fontSize: "0.875rem" }} /> {listName}</Typography>
                    <Typography variant='body1' sx={{ color: "#8A9096" }}>{total} Total</Typography>
                </Box>
                {
                    tasks && tasks !== null && tasks !== "" && tasks.length > 0 && <Droppable droppableId={id.toString()} type='TASK' >
                        {(provided) => (
                            <Box ref={provided.innerRef} {...provided.droppableProps} mt={2} className="list-task-container">
                                {
                                    listTasks && listTasks !== null && listTasks !== undefined && listTasks !== "" && listTasks.length > 0 && listTasks.map((task, index) => getTask(task, index))
                                }
                                {provided.placeholder}
                            </Box>
                        )}
                    </Droppable>
                }
            </Box>
        </>
    );
};

export default TaskList;
