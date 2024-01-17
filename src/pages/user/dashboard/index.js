import React, { useEffect } from 'react'
import { Head, Header } from '@/sections'
import { useDispatch, useSelector } from 'react-redux'
import { parse } from 'cookie'
import { authenticateEmployee } from '@/redux/actions/authAction'
import authMiddleware from '@/middleware'
import { Layout } from '@/components'

const index = ({ token }) => {
    const dispatch = useDispatch()
    const { userInfo, error, message } = useSelector(state => state.employeeAuthReducer)

    useEffect(() => {
        if (token) dispatch(authenticateEmployee(token))
    }, [token])

    return (
        <>
            <Head title={userInfo ? `${userInfo?.firstName} ${userInfo?.lastName} - Dashboard` : 'Dashboard'} />
            <Layout isAdmin={false} />
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