import React from 'react'
import Link from 'next/link'
import { Box, Typography, IconButton, Paper } from '@mui/material'
import { Download } from '@mui/icons-material';

const DocumentCard = ({ title, link }) => {
    return (
        <>
            <Box className='docCard shadow-none d-flex justify-content-between align-items-center' component={Paper} p={1}>
                <Typography variant='h4' className='fw-semibold'>{title}</Typography>
                <IconButton><Link href={link} download={true}><Download className='text-dark' /></Link></IconButton>
            </Box>
        </>
    )
}

export default DocumentCard