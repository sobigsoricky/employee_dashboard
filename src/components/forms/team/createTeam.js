import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, FormControl, InputLabel, Select, MenuItem, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEmployees } from '@/redux/actions/admin/employee-action'
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { createTeam } from '@/redux/actions/admin/teamAction';
import { toast } from 'react-toastify'

const CreateTeam = ({ setAddNewTeam }) => {
    const [managerList, setmananagerList] = useState(null)
    const [member, setMember] = useState([])
    const [manager, setManager] = useState([])
    const { employees } = useSelector(state => state.adminEmployeeReducer)
    const { error, actionT, message } = useSelector(state => state.teamReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllEmployees())
    }, [])

    const schema = yup.object().shape({
        teamName: yup.string().required('Team Name is required'),
        members: yup.array(),
        managers: yup.array(),
        teamDesc: yup.string()
    });

    const { register, handleSubmit, reset, setValue, getValues, formState: { errors } } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const handleMemberChange = (e) => {
        const { value } = e.target;
        setMember(typeof value === 'string' ? value.split(',') : value,);
    }

    const handleManagerChange = (e) => {
        const { value } = e.target;
        setManager(typeof value === 'string' ? value.split(',') : value,);
    }

    const handleCreateTeam = (data) => {
        dispatch(createTeam(data))
    }

    useEffect(() => {
        if (!error && actionT === "create") {
            console.log(error, actionT, message)
            toast.success(message)
            setManager([])
            setMember([])
            reset()
            setAddNewTeam(false)
        } else if (error && actionT === "create") {
            toast.error(message)
        }
    }, [actionT, error])

    useEffect(() => {
        if (employees) {
            const managers = employees.filter(entries => entries.isManager === true)
            setmananagerList(managers)
        }
    }, [employees])

    return (
        <>
            <Box>
                <form onSubmit={handleSubmit(handleCreateTeam)}>
                    <Box mb={2}>
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <Box>
                                    <InputLabel>Team Name</InputLabel>
                                    <TextField variant='outlined' fullWidth name="teamName" placeholder='Team Name' {...register('teamName')} />
                                    {errors.teamName && <Typography className="text-danger">{errors.teamName.message}</Typography>}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box mb={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                {
                                    employees && employees !== null && employees !== undefined && employees !== "" && employees.length > 0 && <Box>
                                        <InputLabel>Add Member</InputLabel>
                                        <FormControl sx={{ width: "100%" }}>
                                            <Select
                                                multiple
                                                name="members"
                                                {...register('members')}
                                                value={member}
                                                onChange={handleMemberChange}
                                                fullWidth
                                            >
                                                {employees.map((emp, index) => (
                                                    <MenuItem key={emp._id} value={emp._id}>
                                                        {emp?.firstName} {emp.lastName}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        {errors.members && <Typography className="text-danger">{errors.members.message}</Typography>}
                                    </Box>
                                }
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {
                                    managerList && managerList !== null && managerList !== undefined && managerList !== "" && managerList.length > 0 && <Box>
                                        <InputLabel>Team Manager</InputLabel>
                                        <FormControl sx={{ width: "100%" }}>
                                            <Select
                                                multiple
                                                name="managers"
                                                {...register('managers')}
                                                value={manager}
                                                onChange={handleManagerChange}
                                                fullWidth
                                            >
                                                {managerList.map((emp, index) => (
                                                    <MenuItem key={emp._id} value={emp._id}>
                                                        {emp?.firstName} {emp.lastName}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        {errors.managers && <Typography className="text-danger">{errors.managers.message}</Typography>}
                                    </Box>
                                }
                            </Grid>
                        </Grid>
                    </Box>
                    <Box mb={2}>
                        <InputLabel>Description</InputLabel>
                        <TextField type="text" multiline rows={5} fullWidth name="teamDesc" {...register('teamDesc')} />
                        {errors.teamDesc && <Typography className="text-danger">{errors.teamDesc.message}</Typography>}
                    </Box>
                    <Box>
                        <Button type="submit" className='btn--dark me-3'>Create Team</Button>
                        <Button type="submit" className='btn--dark-outlined' onClick={() => setAddNewTeam(false)}>Discard</Button>
                    </Box>
                </form>
            </Box>
        </>
    )
}

export default CreateTeam