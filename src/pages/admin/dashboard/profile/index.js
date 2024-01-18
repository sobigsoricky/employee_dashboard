"use client"

import React, { useEffect } from 'react'
import { parse } from 'cookie'
import { Box, Container, Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AdminDetail } from '@/components'
import { Head, Header } from '@/sections'
import { authenticateUser } from '@/redux/actions/authAction'
import authMiddleware from '@/middleware'
import { createProfile } from '@/redux/actions/admin/profile-action'
import { toast } from 'react-toastify'

const Profile = ({ token }) => {
    const { error, message, actionT } = useSelector(state => state.profileReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        if (token) dispatch(authenticateUser(token))
    }, [token])

    const handleProfileCreate = (data) => {
        console.log(data)
        dispatch(createProfile(data))
    }

    useEffect(() => {
        if (!error && actionT === "create") {
            toast.success(message)
            window.location.href = "/admin/dashboard/"
        } else if (error && actionT === "create") {
            toast.error(message)
        }
    }, [error, message])

    return (
        <>
            <Head title="Profile | Admin" />
            <Header />
            <section>
                <Container maxWidth="xxl">
                    <Grid container justifyContent="center">
                        <Grid item xs={12} sm={11}>
                            <Box py={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <AdminDetail handleProfileCreate={handleProfileCreate} />
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

export default Profile