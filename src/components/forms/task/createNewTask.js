import React, { useEffect, useState } from 'react';
import { Box, Button, Chip, Grid, TextField, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getAllProjects } from '@/redux/actions/admin/project-action';
import { getAllEmployees } from '@/redux/actions/admin/employee-action';
import { createTask, sendTaskNotification } from '@/redux/actions/taskAction';
import { toast } from 'react-toastify'
import { getAdmins } from '@/redux/actions/admin/adminAction';

const CreateNewTask = ({ userInfo, taskCurrentStatus, setShowTasksForm, isAdmin, handleGetBoardColumns }) => {
    const { projects } = useSelector(state => state.projectReducer);
    const { employees } = useSelector(state => state.adminEmployeeReducer);
    const { admins } = useSelector((state) => state.adminReducer)
    const { error, message, actionT, savedTask } = useSelector(state => state.taskReducer)
    const [activePriority, setActivePriority] = useState(null);
    const [assignTo, setAssignTo] = useState([])
    const [collaborator, setCollaborator] = useState([])
    const [selectedProject, setSelectedProject] = useState("anynomous")

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProjects());
        dispatch(getAllEmployees());
        dispatch(getAdmins())
    }, [dispatch]);

    console.log(employees, projects, 'iiii')

    const schema = yup.object().shape({
        taskName: yup.string().required('Task name is required.'),
        taskDueDate: yup.date().nullable(),
        taskStartTime: yup.string(),
        taskEndTime: yup.string(),
        priority: yup.string().oneOf(['high', 'medium', 'low']).required('Priority is required.'),
        assignedTo: yup.array().of(yup.string()).min(1, 'At least one employee must be assigned.'),
    });

    const { register, handleSubmit, setValue, getValues, formState: { errors }, clearErrors, reset } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const handlePriority = (priority) => {
        console.log(priority);
        setActivePriority(priority);
        setValue('priority', priority)
        clearErrors('priority')
    };

    const handleAssignToChange = (e) => {
        const { value } = e.target;
        setAssignTo(typeof value === 'string' ? value.split(',') : value,);
    }

    const handleCollaboratorChange = (e) => {
        const { value } = e.target;
        setCollaborator(typeof value === 'string' ? value.split(',') : value,);
    }

    const hnadleProjectChange = (e) => {
        const { value } = e.target
        setSelectedProject(value)
    }

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('taskName', data?.taskName);
        formData.append('taskDueDate', data?.taskDueDate);
        // formData.append('taskStartTime', data?.taskStartTime);
        // formData.append('taskEndTime', data?.taskEndTime);
        formData.append('priority', data?.priority);
        formData.append('assignedTo', JSON.stringify(data?.assignedTo));
        formData.append('collaborator', JSON.stringify(data?.collaborator));
        formData.append('project', data?.project || 'anynomous');
        formData.append('description', data?.description);
        formData.append('createdBy', userInfo?._id)
        formData.append('taskCurrentStatus', taskCurrentStatus || 'todo')

        if (data?.attachments && data.attachments.length > 0) {
            for (let i = 0; i < data.attachments.length; i++) {
                formData.append('attachments', data.attachments[i]);
            }
        }
        dispatch(createTask(formData));
    };

    const handleTaskCreateNotification = (data) => {
        const filteredCollaborator = [
            ...admins.filter(admin => data.collaborator.includes(admin._id)),
            ...employees.filter(employee => data.collaborator.includes(employee._id))
        ];

        const FilterAssignTo = [
            ...admins.filter(admin => data.assignedTo.includes(admin._id)),
            ...employees.filter(employee => data.assignedTo.includes(employee._id))
        ];

        const filterCreatedBy = [
            ...admins.filter(admin => admin._id === data.createdBy),
            ...employees.filter(employee => employee._id === data.createdBy)
        ];

        const collaborator = filteredCollaborator.map(item => ({
            firstName: item?.firstName || item?.details?.firstName,
            lastName: item?.lastName || item?.details?.lastName,
            email: item?.email,
            _id: item?._id
        }));

        const assignTo = FilterAssignTo.map(item => ({
            firstName: item?.firstName || item?.details?.firstName,
            lastName: item?.lastName || item?.details?.lastName,
            email: item?.email,
            _id: item?._id
        }));

        const createdBy = {
            firstName: filterCreatedBy[0]?.details?.firstName || filterCreatedBy[0]?.firstName,
            lastName: filterCreatedBy[0]?.details?.lastName || filterCreatedBy[0]?.lastName,
            email: filterCreatedBy[0]?.email,
            _id: filterCreatedBy[0]?._id
        };

        const NewData = {
            collaborator: collaborator,
            assignTo: assignTo,
            createdBy: createdBy,
            task: data,
            action: "create"
        };

        console.log(NewData, 'kkkk');

        dispatch(sendTaskNotification(NewData));
    };




    useEffect(() => {
        if (!error && actionT === "create") {
            toast.success(message)
            setActivePriority("")
            setAssignTo([])
            setCollaborator([])
            reset()
            handleGetBoardColumns()
            setShowTasksForm(false)
            handleTaskCreateNotification(savedTask)
        } else if (error && actionT === "create") {
            toast.error(message)
        }
    }, [error, actionT])

    return (
        <>
            <Box mt={4}>
                <Grid container>
                    <Grid item xs={12} sm={10}>
                        <Box>
                            <form method='POST' onSubmit={handleSubmit(onSubmit)}>
                                <Box>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={12} sm={6}>
                                            <Box>
                                                <InputLabel>Task Name</InputLabel>
                                                <TextField type='text' variant='outlined' name="taskName" {...register('taskName')} fullWidth />
                                                {errors?.taskName && <Typography className="text-danger">{errors?.taskName?.message}</Typography>}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box>
                                                <InputLabel>Due Date</InputLabel>
                                                <TextField type='date' variant='outlined' name="taskDueDate" {...register('taskDueDate')} fullWidth />
                                                {errors?.taskDueDate && <Typography className="text-danger">{errors?.taskDueDate?.message}</Typography>}
                                            </Box>
                                        </Grid>
                                        {/* <Grid item xs={12} sm={6}>
                                            <Box>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={6}>
                                                        <Box>
                                                            <InputLabel>Start Time</InputLabel>
                                                            <TextField
                                                                type="time"
                                                                variant="outlined"
                                                                name="taskStartTime"
                                                                {...register('taskStartTime')}
                                                                fullWidth
                                                                error={!!errors?.taskStartTime}
                                                            />
                                                            {errors?.taskStartTime && <Typography className="text-danger">{errors?.taskStartTime?.message}</Typography>}
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Box>
                                                            <InputLabel>End Time</InputLabel>
                                                            <TextField
                                                                type="time"
                                                                variant="outlined"
                                                                name="taskEndTime"
                                                                {...register('taskEndTime')}
                                                                fullWidth
                                                                error={!!errors?.taskEndTime}
                                                            />
                                                            {errors?.taskEndTime && <Typography className="text-danger">{errors?.taskEndTime?.message}</Typography>}
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Grid> */}
                                        <Grid item xs={12} sm={6}>
                                            <Box>
                                                <InputLabel className='mb-3'>Priority</InputLabel>
                                                <Chip
                                                    clickable
                                                    onClick={() => handlePriority('high')}
                                                    className='me-3'
                                                    label="High"
                                                    variant={activePriority === 'high' ? 'contained' : 'outlined'}
                                                    color='error'
                                                />
                                                <Chip
                                                    clickable
                                                    onClick={() => handlePriority('medium')}
                                                    className='me-3'
                                                    label="Medium"
                                                    variant={activePriority === 'medium' ? 'contained' : 'outlined'}
                                                    color='warning'
                                                />
                                                <Chip
                                                    clickable
                                                    onClick={() => handlePriority('low')}
                                                    className='me-3'
                                                    label="Low"
                                                    variant={activePriority === 'low' ? 'contained' : 'outlined'}
                                                    color='success'
                                                />
                                                {errors?.priority && <Typography className="text-danger">{errors?.priority?.message}</Typography>}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box>
                                                {
                                                    employees && employees !== null && employees !== undefined && employees !== "" && employees.length > 0 && <> <InputLabel>Assigned To</InputLabel>
                                                        <Select fullWidth value={assignTo} name="assignedTo" {...register('assignedTo')} onChange={(e) => handleAssignToChange(e)} >
                                                            {
                                                                employees.map(emp => <MenuItem key={emp._id} value={emp._id}>{emp.firstName} {emp.lastName}</MenuItem>)
                                                            }
                                                            {
                                                                admins && admins !== null && admins !== undefined && admins !== "" && admins.map(item => <MenuItem key={item._id} value={item._id}>{item?.details?.firstName} {item?.details?.lastName}</MenuItem>)
                                                            }
                                                        </Select>
                                                        {errors?.assignedTo && <Typography className="text-danger">{errors?.assignedTo?.message}</Typography>}
                                                    </>
                                                }
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box>
                                                {
                                                    employees && employees !== null && employees !== undefined && employees !== "" && employees.length > 0 && <> <InputLabel>Add Collaborator</InputLabel>
                                                        <Select multiple fullWidth value={collaborator} name="collaborator" {...register('collaborator')} onChange={(e) => handleCollaboratorChange(e)}>
                                                            {
                                                                employees.map(emp => <MenuItem key={emp._id} value={emp._id}>{emp.firstName} {emp.lastName}</MenuItem>)
                                                            }
                                                            {
                                                                admins && admins !== null && admins !== undefined && admins !== "" && admins.map(item => <MenuItem key={item._id} value={item._id}>{item?.details?.firstName} {item?.details?.lastName}</MenuItem>)
                                                            }
                                                        </Select></>
                                                }
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box>
                                                {
                                                    projects && projects !== null && projects !== undefined && projects !== "" && projects.length > 0 && <>
                                                        <InputLabel>Project</InputLabel>
                                                        <Select fullWidth name="project" {...register('project')} onChange={(e) => hnadleProjectChange(e)} value={selectedProject}>
                                                            <MenuItem value="anynomous">Anynomous</MenuItem>
                                                            {
                                                                projects.map(project => <MenuItem key={project._id} value={project._id}>{project?.projectName}</MenuItem>)
                                                            }
                                                        </Select>
                                                    </>
                                                }
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box mb={2}>
                                                <InputLabel>Description</InputLabel>
                                                <TextField multiline rows={4} fullWidth name="description" {...register('description')} />
                                            </Box>
                                            <Box>
                                                <InputLabel>Add Attachment</InputLabel>
                                                <input
                                                    type="file"
                                                    multiple
                                                    {...register('attachments')}
                                                    onChange={(e) => {
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box>
                                                <Button type="submit" className='btn--dark me-3'>Create Task</Button>
                                                <Button className='btn--dark-outlined' onClick={() => setShowTasksForm(false)}>Discard</Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default CreateNewTask;
