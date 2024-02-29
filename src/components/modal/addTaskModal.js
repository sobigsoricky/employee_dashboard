import React, { useState } from 'react'
import { Box, Dialog, DialogContent, IconButton, Typography } from '@mui/material'
import { Minimize, Close, Maximize } from '@mui/icons-material'
import { AddNewTask } from '@/sections'

const AddTaskModal = ({ open, setOpen }) => {
    const [isMinimized, setIsMinimized] = useState(false)
    return (
        <>
            <Dialog maxWidth={isMinimized ? 'xs' : 'sm'} open={open} fullWidth className={isMinimized ? 'minimized' : 'maximized'} id='taskDialog'>
                <DialogContent className='p-0'>
                    <Box p={1} className="d-flex justify-content-between align-items-center modalHeader">
                        <Typography variant="h4" className='fw-semibold'>New task</Typography>
                        <Box>
                            <IconButton className='me-2' onClick={() => setIsMinimized(!isMinimized)}>{isMinimized ? <Maximize /> : <Minimize />}</IconButton>
                            <IconButton onClick={() => setOpen(false)}><Close /></IconButton>
                        </Box>
                    </Box>
                    <Box p={1} sx={{ marginTop: "10%" }}>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddTaskModal