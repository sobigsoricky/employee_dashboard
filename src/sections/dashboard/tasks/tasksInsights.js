import React, { useEffect, useState } from 'react'
import { Box, } from '@mui/material'
import { AddTaskColumnModal, TaskDetailModal } from '@/components'
import { BoardView } from '@/sections'

const tasksInsights = ({ tasks, projects, employees, isAdmin, setOpenCreateBoardMoadal, openCreateBoardModal, userInfo, columns, handleGetBoardColumns }) => {
    const [taskDetailModalOpen, setTaskDetailModalOpen] = useState(false)
    const [taskToOpenInModal, setTaskToOpenInModal] = useState(null)

    const handleOpenTaskDetailModal = (task) => {
        setTaskDetailModalOpen(true)
        setTaskToOpenInModal(task)
    }

    const handleCloseTaskDetailModal = () => {
        setTaskDetailModalOpen(false)
        setTaskToOpenInModal(null)
    }

    return (
        <>
            <Box mt={5}>
                <BoardView projects={projects} employees={employees} tasks={tasks} isAdmin={isAdmin} columns={columns} handleGetBoardColumns={handleGetBoardColumns} userInfo={userInfo} handleOpenTaskDetailModal={handleOpenTaskDetailModal} />
            </Box>
            <AddTaskColumnModal open={openCreateBoardModal} setOpenCreateBoardMoadal={setOpenCreateBoardMoadal} handleGetBoardColumns={handleGetBoardColumns} columns={columns} />
            <TaskDetailModal open={taskDetailModalOpen} handleOpenTaskDetailModal={handleOpenTaskDetailModal} task={taskToOpenInModal} handleCloseTaskDetailModal={handleCloseTaskDetailModal} />
        </>
    )
}

export default tasksInsights