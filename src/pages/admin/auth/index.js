"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Container, Grid, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { parse } from 'cookie'
import authMiddleware from '@/middleware'
import { Head, Header } from '@/sections'
import { ForgotPassword, LoginForm, RegisterForm } from '@/components'
import { createAdmin, loginAdmin, forgotPassword, authenticateUser } from '@/redux/actions/authAction'
import { toast } from 'react-toastify'

const Auth = ({ token }) => {
    const { userInfo, error, message, actionT } = useSelector(state => state.authReducer)
    const [selectedForm, setselectedForm] = useState('reg')
    const dispatch = useDispatch()
    const router = useRouter()

    const handleSignup = (data) => {
        dispatch(createAdmin(data))
    }

    const handleLogin = (data) => {
        dispatch(loginAdmin(data))
    }

    const handleForgetPassword = (data) => {
        dispatch(forgotPassword(data))
    }

    useEffect(() => {
        if (actionT === "create" && !error) {
            toast.success(message)
            // setselectedForm('login')
            router.push('/admin/auth/otp/')
        } else if (error && actionT === "create") {
            toast.error(message)
        }
    }, [message, error, actionT])

    useEffect(() => {
        if (!error && actionT === "login") {
            toast.success(message)
            router.push('/admin/dashboard/profile')
        } else if (error && actionT === "login") {
            toast.error(message)
        }
    }, [error, message, actionT])

    useEffect(() => {
        if (!error && actionT === 'forgot') {
            toast.success(message)
            setselectedForm('login')
        } else if (error && actionT === 'forgot') {
            toast.error(message)
        }
    }, [message, error, actionT])

    useEffect(() => {
        if (token) dispatch(authenticateUser(token))
    }, [token])

    return (
        <>
            <Head title={selectedForm === "login" ? 'Log in | Admin' : selectedForm === "reg" ? "Register | Admin" : selectedForm === "forgotPassword" ? 'Forgot password | Admin' : null} />
            <Header />
            <section>
                <Container maxWidth="xxl">
                    <Grid container justifyContent="center">
                        <Grid item xs={12} lg={11}>
                            <Box py={2}>
                                <Grid container spacing={8} alignItems="center" >
                                    <Grid item xs={12} sm={6}>
                                        <Box>
                                            {
                                                selectedForm === "login" ? <LoginForm setselectedForm={setselectedForm} handleLogin={handleLogin} /> : selectedForm === "reg" ? <RegisterForm setselectedForm={setselectedForm} handleSignup={handleSignup} /> : selectedForm === "forgotPassword" ? <ForgotPassword setselectedForm={setselectedForm} handleForgetPassword={handleForgetPassword} /> : null
                                            }
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box className="d-flex justify-content-center">
                                            <img src="/images/auth.svg" className='img-fluid placeHolderImage d-none d-sm-block' />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </section>
        </>
    )
}

export const getServerSideProps = authMiddleware(async (context) => {
    const { req } = context;

    const cookies = parse(req.headers.cookie || '');
    const token = cookies['token'] || null

    return {
        props: {
            token
        }
    };
});

export default Auth