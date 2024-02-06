import React from 'react'
import { Box, Dialog, DialogContent, Typography, IconButton, Paper, Grid } from '@mui/material'
import { Circle, Close, Delete, MoreVert } from '@mui/icons-material'
import BoardColumn from '../forms/task/boardColumn'

const AddTaskColumnModal = ({ open, setOpenCreateBoardMoadal, handleGetBoardColumns, columns }) => {

    console.log(columns)

    return (
        <>
            <Dialog open={open} fullWidth maxWidth="sm" id="modal">
                <DialogContent>
                    <Box className="d-flex justify-content-between align-items-center">
                        <Typography variant='h3' className='fw-semibold'>Create Board</Typography>
                        <IconButton onClick={() => setOpenCreateBoardMoadal(false)}><Close /></IconButton>
                    </Box>
                    <Box mt={2}>
                        <BoardColumn handleGetBoardColumns={handleGetBoardColumns} />
                    </Box>
                    <Box mt={2}>
                        <Typography variant='h3' className='fw-semibold' gutterBottom>Board</Typography>
                        <Box mt={2}>
                            {
                                columns && columns !== null && columns !== undefined && columns !== "" && columns.length > 0 && columns.map(item => <Box mb={2} className='d-flex justify-content-between align-items-center' p={1} component={Paper}>
                                    <Box>
                                        <Typography sx={{ color: item.color, fontSize: '1.25rem' }}><Circle sx={{ fontSize: '0.875rem' }} className='me-2' />{item.columnName}</Typography>
                                    </Box>
                                    <Box className="d-flex justify-content-between align-items-center">
                                        <Typography className='text-muted me-3'>{item?.tasks.length} Tasks</Typography>
                                        <IconButton><Delete className='text-danger' /></IconButton>
                                    </Box>
                                </Box>)
                            }
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddTaskColumnModal