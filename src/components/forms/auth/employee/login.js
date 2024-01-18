import React, { useEffect } from 'react'
import { Box, Button, Typography, Grid, InputLabel, TextField } from '@mui/material'
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { handleUserLogin } from '@/redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Login = ({ setShowOtpForm }) => {
    const dispatch = useDispatch()
    const { actionT, error, message, loggedUser } = useSelector(state => state.employeeAuthReducer)

    const schema = yup.object().shape({
        email: yup.string().email('Invalid email.').required('Email is required.'),
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const handleLogin = (data) => {
        dispatch(handleUserLogin(data))
    }

    useEffect(() => {
        if (!error && actionT === "user-login") {
            toast.success(message)
            setShowOtpForm(true)
            sessionStorage.setItem('loggedUser', loggedUser)
        } else if (error && actionT === "user-login") {
            toast.error(message)
        }
    }, [actionT, error])

    return (
        <>
            <Box>
                <Typography variant='h1' className='fw-semibold text-dark'>Welcome back to your portal</Typography>
                <Box mt={6}>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputLabel className='fw-medium mb-2'>Your email address</InputLabel>
                                <TextField type="email" variant='outlined' label="work@gmail.com" name="email" fullWidth {...register('email')} />
                                {
                                    errors && errors.email && errors.email.message ? <Typography className='text-danger'>{errors.email.message}</Typography> : null
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <Button type='submit' className='btn--dark' fullWidth>Send OTP</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Box>
        </>
    )
}

export default Login