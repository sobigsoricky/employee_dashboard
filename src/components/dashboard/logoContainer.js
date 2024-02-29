import React from 'react'
import { Box, TextField, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

const LogoContainer = ({ isAdmin }) => {
    const { userInfo } = useSelector(state => state.authReducer)
    return (
        <>
            <Box sx={{ height: "7rem" }}>
                <Typography variant='h2' className='fw-bold text-white'>{userInfo?.details?.companyName || "Rankfast"}</Typography>
                <Box mt={2}>
                    <TextField
                        type="search"
                        fullWidth
                        variant='outlined'
                        label="Search"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderColor: '#F2F4F7', // Border color
                            },
                            '& .MuiInputLabel-root': {
                                color: '#F2F4F7', // Label color
                            },
                            '& .MuiInputBase-input': {
                                color: '#F2F4F7', // Text color
                            },
                        }}
                    />
                </Box>
            </Box>
        </>
    )
}

export default LogoContainer