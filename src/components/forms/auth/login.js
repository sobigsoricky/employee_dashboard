import React, { useState } from 'react'
import { Box, Button, Checkbox, FormControlLabel, Grid, IconButton, InputLabel, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = ({ setselectedForm, handleLogin }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showCPassword, setShowCPassword] = useState(false)

    const schema = yup.object().shape({
        email: yup.string().email('Invalid email.').required('Email is required.'),
        password: yup.string().min(8, 'Password must have minimum 8 characters.').max(12, 'Password must have maximum 12 characters.'),
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        handleLogin(data)
        reset()
    }

    return (
        <>
            <Box>
                <Typography variant='h1' className='fw-semibold text-dark'>Log In</Typography>
                <Box mt={6}>
                    <form method='POST' onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Box>
                                    <InputLabel className='fw-medium mb-2'>Your email address</InputLabel>
                                    <TextField type="email" variant='outlined' label="work@gmail.com" name="email" fullWidth {...register('email')} />
                                    {
                                        errors && errors.email && errors.email.message ? <Typography className='text-danger'>{errors.email.message}</Typography> : null
                                    }
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box>
                                    <InputLabel className='fw-medium mb-2'>Password</InputLabel>
                                    <Box className="passwordBox">
                                        <TextField type={showPassword ? 'text' : 'password'} variant='outlined' label="Password" name="password" fullWidth {...register('password')} />
                                        <IconButton className='visibilityBtn' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
                                    </Box>
                                    {
                                        errors && errors.password && errors.password.message ? <Typography className='text-danger'>{errors.password.message}</Typography> : null
                                    }
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type='submit' className='btn--dark' fullWidth>Log In</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
                <Box mt={2} className="d-flex justify-content-between">
                    <Button onClick={() => setselectedForm('reg')}>Create new account.</Button>
                    <Button onClick={() => setselectedForm('forgotPassword')}>Forgot Password</Button>
                </Box>
            </Box>
        </>
    )
}

export default Login