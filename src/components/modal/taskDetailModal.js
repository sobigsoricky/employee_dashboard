import React from 'react'
import { Box, Dialog, DialogContent, Typography, IconButton, Button } from '@mui/material'
import { Close } from '@mui/icons-material'

const TaskDetailModal = ({ open, task, handleCloseTaskDetailModal }) => {
    return (
        <>
            <Dialog open={open} maxWidth="sm" fullWidth id="modal">
                <DialogContent>
                    {
                        task && task !== null && task !== undefined && task !== "" && Object.keys(task).length > 0 && <Box>
                            <Box className="d-flex justify-content-between align-items-center">
                                <Typography variant="h2" className='fw-semibold'>{task?.taskName}</Typography>
                                <IconButton onClick={() => handleCloseTaskDetailModal()}><Close /></IconButton>
                            </Box>
                            <Box>
                                <Button className='btn btn-danger'>Delete Task</Button>
                            </Box>
                        </Box>
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}

export default TaskDetailModal