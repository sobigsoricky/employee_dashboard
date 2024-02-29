import React, { useEffect, useState } from 'react'
import { Box, } from '@mui/material'
import { AddTaskColumnModal, TaskDetailModal } from '@/components'
import { BoardView } from '@/sections'
import { useSelector, useDispatch } from 'react-redux'
import { handleTaskDeletion, handleTaskMarkComplete, sendTaskNotification } from '@/redux/actions/taskAction'
import { toast } from 'react-toastify'

const tasksInsights = ({ tasks, projects, employees, isAdmin, setOpenCreateBoardMoadal, openCreateBoardModal, userInfo, columns, handleGetBoardColumns, admins }) => {
    const [taskDetailModalOpen, setTaskDetailModalOpen] = useState(false)
    const [taskToOpenInModal, setTaskToOpenInModal] = useState({ task: null, listId: null })
    const { error, message, deletedTask, completedTask, actionT, } = useSelector((state) => state.taskReducer)
    const dispatch = useDispatch()

    const handleOpenTaskDetailModal = (task, listId) => {
        setTaskDetailModalOpen(true)
        setTaskToOpenInModal({ task, listId })
    }

    const handleCloseTaskDetailModal = () => {
        console.log(userInfo)
        setTaskDetailModalOpen(false)
        setTaskToOpenInModal({ task: null, listId: null })
    }

    const handleTaskDelete = (id, listId) => {
        dispatch(handleTaskDeletion({ id, listId }))
    }

    const handleTaskNotification = (data, action) => {
        const filteredCollaborator = [
            ...admins.filter(admin => data.collaborator.includes(admin._id)),
            ...employees.filter(employee => data.collaborator.includes(employee._id))
        ];

        const FilterAssignTo = [
            ...admins.filter(admin => data.assignedTo.includes(admin._id)),
            ...employees.filter(employee => data.assignedTo.includes(employee._id))
        ];

        const filterCreatedBy = [
            ...admins.filter(admin => admin._id === data.createdBy),
            ...employees.filter(employee => employee._id === data.createdBy)
        ];

        const collaborator = filteredCollaborator.map(item => ({
            firstName: item?.firstName || item?.details?.firstName,
            lastName: item?.lastName || item?.details?.lastName,
            email: item?.email,
            _id: item?._id
        }));

        const assignTo = FilterAssignTo.map(item => ({
            firstName: item?.firstName || item?.details?.firstName,
            lastName: item?.lastName || item?.details?.lastName,
            email: item?.email,
            _id: item?._id
        }));

        const createdBy = {
            firstName: filterCreatedBy[0]?.details?.firstName || filterCreatedBy[0]?.firstName,
            lastName: filterCreatedBy[0]?.details?.lastName || filterCreatedBy[0]?.lastName,
            email: filterCreatedBy[0]?.email,
            _id: filterCreatedBy[0]?._id
        };

        const NewData = {
            collaborator: collaborator,
            assignTo: assignTo,
            createdBy: createdBy,
            task: data,
            action: action
        };

        dispatch(sendTaskNotification(NewData));
    }

    useEffect(() => {
        if (!error && actionT === "delete-task") {
            toast.success(message)
            handleGetBoardColumns()
            setTaskDetailModalOpen(false)
            handleTaskNotification(deletedTask, 'delete')
        } else if (error && actionT === "delete-task") {
            toast.success(message)
        }
    }, [error, actionT])

    const handleMarkComplete = (task) => {
        dispatch(handleTaskMarkComplete(task))
    }

    useEffect(() => {
        if (!error && actionT === "mark") {
            toast.success(message)
            handleTaskNotification(completedTask, 'mark')
        } else if (error && actionT === "mark") {
            toast.error(message)
        }
    }, [error, actionT])

    return (
        <>
            <Box mt={5}>
                <BoardView projects={projects} employees={employees} tasks={tasks} isAdmin={isAdmin} columns={columns} handleGetBoardColumns={handleGetBoardColumns} userInfo={userInfo} handleOpenTaskDetailModal={handleOpenTaskDetailModal} />
            </Box>
            <AddTaskColumnModal open={openCreateBoardModal} setOpenCreateBoardMoadal={setOpenCreateBoardMoadal} handleGetBoardColumns={handleGetBoardColumns} columns={columns} />
            <TaskDetailModal open={taskDetailModalOpen} handleOpenTaskDetailModal={handleOpenTaskDetailModal} task={taskToOpenInModal.task} handleCloseTaskDetailModal={handleCloseTaskDetailModal} handleTaskDelete={handleTaskDelete} listId={taskToOpenInModal.listId}
                employees={employees} admins={admins} projects={projects} handleMarkComplete={handleMarkComplete} />
        </>
    )
}

export default tasksInsights