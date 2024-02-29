import React from 'react'
import { Box, Typography } from '@mui/material'
import { CreateProject } from '@/components'

const AddNewProject = ({ setAddNewProject, userInfo }) => {
    return (
        <>
            <Box>
                <Typography variant='h1' className='fw-semibold'>Add Project</Typography>
                <Box>
                    <CreateProject userInfo={userInfo} setAddNewProject={setAddNewProject} />
                </Box>
            </Box>
        </>
    )
}

export default AddNewProject