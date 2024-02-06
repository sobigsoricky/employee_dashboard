import React from 'react'
import { Box, Typography, Paper } from '@mui/material'

const TaskCard = ({ assignToBox, taskName, collaborator, handleOpenTaskDetailModal, task }) => {
    return (
        <>
            <Box onClick={() => handleOpenTaskDetailModal(task)} mt={1.5} p={1.5} component={Paper} className='shadow-none task-card'>
                <Box className="assignToBox">{assignToBox}</Box>
                <Box mt={1.5}>
                    <Typography gutterBottom>Title: {taskName}</Typography>
                    <div className='collaborator'><Typography>Collaborator:</Typography> {collaborator}</div>
                </Box>
            </Box>
        </>
    )
}

export default TaskCard