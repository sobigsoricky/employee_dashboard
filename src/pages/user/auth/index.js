import { Head, Header } from '@/sections'
import React, { useState, useEffect } from 'react'
import { Box, Container, Grid } from '@mui/material'
import { EmployeeLogin, OTP } from '@/components'
import { parse } from 'cookie'
import { authenticateEmployee } from '@/redux/actions/authAction'
import authMiddleware from '@/middleware'
import { useDispatch, useSelector } from 'react-redux'

const index = ({ token }) => {
    const [showOtpForm, setShowOtpForm] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (token) dispatch(authenticateEmployee(token))
    }, [token])

    return (
        <>
            <Head title="Login | Employee Dashboard" />
            <Header />
            <section>
                <Container maxWidth="xxl">
                    <Grid container justifyContent="center">
                        <Grid item xs={12} lg={11}>
                            <Box py={2}>
                                <Grid container spacing={8}>
                                    <Grid item xs={12} sm={6}>
                                        {
                                            !showOtpForm ? <EmployeeLogin setShowOtpForm={setShowOtpForm} /> : <OTP />
                                        }
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
    const token = cookies['employeetoken'] || null

    return {
        props: {
            token
        }
    };
});

export default index