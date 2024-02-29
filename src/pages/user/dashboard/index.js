import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Head } from '@/sections'
import { useDispatch, useSelector } from 'react-redux'
import { authenticateEmployee, logoutEmployeeUser } from '@/redux/actions/authAction'
import { Layout } from '@/components'

const index = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { userInfo, error, message, actionT } = useSelector(state => state.employeeAuthReducer)

    useEffect(() => {
        dispatch(authenticateEmployee())
    }, [dispatch])

    useEffect(() => {
        if (error && actionT === "auth") {
            dispatch(logoutEmployeeUser())
            router.push('/user/auth/')
        }
    }, [error, actionT])

    return (
        <>
            <Head title={userInfo ? `${userInfo?.firstName} ${userInfo?.lastName} - Dashboard` : 'Dashboard'} />
            <Layout isAdmin={false} />
        </>
    )
}

export default index