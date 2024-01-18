import { Layout } from '@/components'
import { EmpDocument, EmployeeDetails, Head } from '@/sections'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import authMiddleware from '@/middleware'
import { parse } from 'cookie'
import { authenticateUser } from '@/redux/actions/authAction'
import { Box, Button, Typography } from '@mui/material'
import { getEmployeeDetail } from '@/redux/actions/admin/employee-action'
import { toast } from 'react-toastify'

const SingleEmployee = ({ token }) => {
    const [selectedTab, setSelectedTab] = useState(1)
    const dispatch = useDispatch()
    const router = useRouter()
    const { userInfo } = useSelector(state => state.authReducer)
    const { employee, message, error, actionT } = useSelector(state => state.adminEmployeeReducer)

    const { id } = router.query

    useEffect(() => {
        if (token) dispatch(authenticateUser(token))
    }, [token])

    useEffect(() => {
        if (id) dispatch(getEmployeeDetail(id))
    }, [id])

    useEffect(() => {
        if (id && error && actionT === "fetchEmp") {
            toast.error('hi')
        }
    }, [error, actionT, id])

    return (
        <>
            <Head title="Employee Detail | Admin" />
            <Layout isAdmin={true} userInfo={userInfo} />
            {
                employee && <Box className="dashboard-main" id="employee-detail">
                    <Box p={{ xs: 2, sm: 4 }} className="dashboard-main-container">
                        <Typography variant="h1" className="fw-semibold">Employee {selectedTab === 1 ? "Details" : "Documents"}</Typography>
                        <Box mt={4} className="tab-container">
                            <Button onClick={() => setSelectedTab(1)} className={`tab ${selectedTab === 1 ? "active" : ""}`}>Details</Button>
                            <Button onClick={() => setSelectedTab(2)} className={`tab ${selectedTab === 2 ? "active" : ""}`}>Documents</Button>
                        </Box>
                        {
                            selectedTab === 1 ? <EmployeeDetails employee={employee} /> : <EmpDocument employee={employee} />
                        }
                    </Box>
                </Box>
            }
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

export default SingleEmployee