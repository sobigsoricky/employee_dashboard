import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Button, TextField, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { handleVerifyAndLogin } from '@/redux/actions/authAction'

const Otp = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { actionT, error, message } = useSelector(state => state.employeeAuthReducer)
    const [OTP, setOTP] = useState("")

    const handleLogin = (e) => {
        e.preventDefault();
        const regExp = /^\d+$/;

        if (OTP.length !== 4 || !regExp.test(OTP)) {
            toast.error('Please enter a valid 4-digit OTP consisting of digits only.');
        } else {
            if (sessionStorage.getItem('loggedUser') !== null && sessionStorage.getItem('loggedUser') !== undefined && sessionStorage.getItem('loggedUser') !== "") {
                const data = { otp: OTP, email: sessionStorage.getItem('loggedUser') }
                dispatch(handleVerifyAndLogin(data))
            }
        }
    }


    useEffect(() => {
        if (actionT == "otp-v" && !error) {
            toast.success(message)
            router.push('/user/dashboard')
        } else if (actionT == "otp-v" && error) {
            toast.error(message)
        }
    }, [error, actionT])


    return (
        <>
            <Box>
                <Typography variant='h1' className='fw-semibold text-dark'>Verify OTP</Typography>
                <Box mt={6}>
                    <form onSubmit={handleLogin}>
                        <Box>
                            <TextField type='text' variant='outlined' label="Enter your OTP" fullWidth name="OTP" value={OTP} onChange={(e) => setOTP(e.target.value)} required />
                        </Box>
                        <Box mt={2}>
                            <Button type='submit' className='btn--dark' fullWidth>Verify and Log in</Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </>
    )
}

export default Otp