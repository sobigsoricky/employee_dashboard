import { Head, Header } from '@/sections'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Container, Grid } from '@mui/material'
import { EmployeeLogin, OTP } from '@/components'
import { authenticateEmployee } from '@/redux/actions/authAction'
import { useDispatch, useSelector } from 'react-redux'

const index = () => {
    const { userInfo, error, message, actionT } = useSelector(state => state.employeeAuthReducer)
    const [showOtpForm, setShowOtpForm] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        dispatch(authenticateEmployee())
    }, [dispatch])

    useEffect(() => {
        if (!error && actionT === "auth") {
            router.push('/user/dashboard/')
        }
    }, [error, actionT])

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

export default index