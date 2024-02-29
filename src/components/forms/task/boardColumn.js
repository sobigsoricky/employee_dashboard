import React, { useEffect, useState } from 'react'
import { Box, TextField, Button, Grid } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { addBoardColumn } from '@/redux/actions/admin/boardAction'

const BoardColumn = ({ handleGetBoardColumns }) => {
    const { error, actionT, message } = useSelector((state) => state.boardReducer)
    const dispatch = useDispatch()
    const [column, setColumn] = useState({ cn: "", color: "" })

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setColumn({ ...column, [name]: value })
    }

    const handleCreateBoard = (e) => {
        e.preventDefault()
        dispatch(addBoardColumn(column))
    }

    useEffect(() => {
        if (!error && actionT === "create-column") {
            toast.success(message)
            setColumn({ cn: "", color: "" })
            handleGetBoardColumns()
        } else if (error && actionT === "create-column") {
            toast.error(message)
        }
    }, [error, actionT])

    return (
        <>
            <Box>
                <form onSubmit={handleCreateBoard}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Box>
                                <TextField type="text" variant='outlined' name="cn" label="Column Name" value={column.cn} onChange={handleOnChange} fullWidth required />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box>
                                <TextField type="color" variant='outlined' name="color" label="Column Color" value={column.color} onChange={handleOnChange} fullWidth required />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box>
                                <Button type="submit" fullWidth className='btn--dark'>Create</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </>
    )
}

export default BoardColumn