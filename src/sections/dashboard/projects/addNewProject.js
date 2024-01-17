import React from 'react'
import { Box, Typography } from '@mui/material'
import { CreateProject } from '@/components'

const AddNewProject = ({ setAddNewProject }) => {
    return (
        <>
            <Box>
                <Typography variant='h1' className='fw-semibold'>Add Project</Typography>
                <Box>
                    <CreateProject setAddNewProject={setAddNewProject} />
                </Box>
            </Box>
        </>
    )
}

export default AddNewProject