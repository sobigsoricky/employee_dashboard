import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { CreateTask } from '@/components'

const AddNewTask = ({ userInfo, setShowForm, taskCurrentStatus, setShowTasksForm, handleGetBoardColumns }) => {
    return (
        <>
            <CreateTask handleGetBoardColumns={handleGetBoardColumns} userInfo={userInfo} setShowForm={setShowForm} taskCurrentStatus={taskCurrentStatus} setShowTasksForm={setShowTasksForm} />
        </>
    )
}

export default AddNewTask