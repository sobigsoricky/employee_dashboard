import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { CreateTask } from '@/components'

const AddNewTask = ({ userInfo, setShowForm }) => {
    return (
        <>
            <Box className="d-flex justify-content-between align-items-center">
                <Typography variant='h1' className='fw-semibold'>Add New Task</Typography>
                <Button className="btn--dark" onClick={() => setShowTasks(true)}>Back</Button>
            </Box>
            <CreateTask userInfo={userInfo} setShowForm={setShowForm} />
        </>
    )
}

export default AddNewTask