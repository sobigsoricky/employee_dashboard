import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import { CreateTeam } from '@/components'


const AddTeam = ({ setAddNewTeam }) => {
    return (
        <>
            <Box p={{ xs: 2, sm: 4 }} className="dashboard-main-container">
                <Typography variant='h1' className='fw-semibold'>Add Team</Typography>
                <Box mt={4}>
                    <Grid container>
                        <Grid item xs={12} sm={11}>
                            <CreateTeam setAddNewTeam={setAddNewTeam} />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default AddTeam