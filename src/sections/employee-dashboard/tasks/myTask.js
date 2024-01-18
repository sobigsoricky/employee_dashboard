import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { getTasks, handleTaskDeletion, handleTaskMarkComplete, sendTaskNotification } from '@/redux/actions/taskAction'
import { toast } from 'react-toastify'
import ListView from './views/listView'
import BoardView from './views/boardView'
import { getAllProjects } from '@/redux/actions/admin/project-action'
import { getAllEmployees } from '@/redux/actions/admin/employee-action'

const MyTask = ({ userInfo }) => {
    const [hasTask, setHasTask] = useState()
    const [userTasks, setUserTask] = useState([])
    const [open, setOpen] = useState(false)
    const [view, setView] = useState(1)
    const dispatch = useDispatch()
    const { tasks, error, actionT, message, completedTask } = useSelector(state => state.taskReducer)
    const { projects, error: err, actionT: at, message: msg } = useSelector(state => state.projectReducer)
    const { employees, error: empErr, actionT: empAt, message: empMsg } = useSelector(state => state.adminEmployeeReducer)
    useEffect(() => {
        dispatch(getTasks())
    }, [dispatch])

    useEffect(() => {
        if (error && actionT === "fetch-tasks") {
            toast.error(message)
        } else if (!error && actionT === "fetch-tasks") {
            if (tasks && tasks !== null && tasks !== undefined && tasks !== "" && tasks.length > 0 && userInfo && userInfo !== null && userInfo !== undefined && userInfo !== "" && Object.keys(userInfo).length > 0) {
                const filteredTasks = tasks.filter(task => task.assignedTo.includes(userInfo._id));
                setUserTask(filteredTasks)
            }
        }
    }, [error, actionT, tasks, message, userInfo])

    useEffect(() => {
        dispatch(getAllProjects())
        dispatch(getAllEmployees())
    }, [dispatch])

    const handleMarkComplete = (task) => {
        dispatch(handleTaskMarkComplete(task))
    }

    const handleTaskNotification = (data, action) => {
        const filteredCollaborator = employees.filter(employee => data.collaborator.includes(employee._id));
        const FilterAssignTo = employees.filter(employee => data.assignedTo.includes(employee._id))
        const filterCreatedBy = employees.filter(employee => employee._id === data.createdBy)

        const collaborator = filteredCollaborator.map(item => ({ firstName: item.firstName, lastName: item.lastName, email: item.email, _id: item._id }))
        const assignTo = filterCreatedBy.map(item => ({ firstName: item.firstName, lastName: item.lastName, email: item.email, _id: item._id }))

        const createdBy = { firstName: filterCreatedBy[0].firstName, lastName: filterCreatedBy[0].lastName, email: filterCreatedBy[0].email, _id: filterCreatedBy[0]._id }

        const NewData = { collaborator, assignTo, createdBy, task: data, action: action }
        dispatch(sendTaskNotification(NewData))
    }

    useEffect(() => {
        if (!error && actionT === "mark") {
            toast.success(message)
            dispatch(getTasks())
            handleTaskNotification(completedTask, 'mark')
        } else if (error && actionT === "mark") {
            toast.error(message)
        }
    }, [error, actionT])

    const handleTaskDelete = (task) => {
        console.log(task)
        sessionStorage.setItem('deletetaks', JSON.stringify(task));
        try {
            dispatch(handleTaskDeletion(task?._id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

    useEffect(() => {
        if (!error && actionT === "delete") {
            toast.success(message);
            dispatch(getTasks());

            const deletedTask = JSON.parse(sessionStorage.getItem('deletetaks'));
            handleTaskNotification(deletedTask, 'delete');

            sessionStorage.removeItem('deletetaks');
        } else if (error && actionT === 'delete') {
            toast.error(message);
        }
    }, [error, actionT]);


    return (
        <>
            <Box sx={{ height: "100%" }}>
                {
                    userTasks && userTasks !== null && userTasks !== undefined && userTasks !== "" && userTasks.length > 0 && projects && projects !== null && projects !== undefined && projects !== "" && projects.length > 0 && employees && employees !== null && employees !== undefined && employees !== "" && employees.length > 0 ? <Box>
                        <Box mt={4} className="tab-container">
                            <Button className={`tab ${view === 1 ? 'active' : ''}`} onClick={() => setView(1)}>List</Button>
                            <Button className={`tab ${view === 2 ? 'active' : ''}`} onClick={() => setView(2)}>Board</Button>
                        </Box>
                        <Box mt={2}>
                            {view === 1 ? <ListView tasks={userTasks} projects={projects} employees={employees} handleMarkComplete={handleMarkComplete} handleTaskDelete={handleTaskDelete} /> : view === 2 ? <BoardView tasks={userTasks} projects={projects} employees={employees} /> : null}
                        </Box>
                    </Box> : <Box className="message-box">
                        <Typography variant="h2" align='center' className='fw-semibold'>You have no tasks.</Typography>
                    </Box>
                }
            </Box>
        </>
    )
}

export default MyTask