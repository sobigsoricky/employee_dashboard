import React, { useEffect, useState } from 'react'
import { Button, Box, Typography } from '@mui/material'
import { Layout } from '@/components'
import { parse } from 'cookie'
import { authenticateEmployee } from '@/redux/actions/authAction'
import authMiddleware from '@/middleware'
import { useDispatch, useSelector } from 'react-redux'
import { DetailProfile, DocumentUploadAndDisplay, Head } from '@/sections'
import { getUserData } from '@/redux/actions/user/profileAction'
import { toast } from 'react-toastify'

const Profile = ({ token }) => {
    const [selectedTab, setSelectedTab] = useState(1)
    const { userInfo, error, message } = useSelector(state => state.employeeAuthReducer)
    const { user, actionT, error: err, message: msg } = useSelector(state => state.userProfileReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        if (token) dispatch(authenticateEmployee(token))
    }, [token])

    useEffect(() => {
        if (userInfo && userInfo !== null && userInfo !== undefined && userInfo !== "" && Object.keys(userInfo).length > 0) {
            dispatch(getUserData(userInfo._id))
        }
    }, [userInfo])

    useEffect(() => {
        if (userInfo !== null && userInfo === undefined && userInfo !== "" && Object.keys(userInfo).length > 0) {
            if (user === null || user === undefined || user === "" && actionT === "detail" && err) {
                toast.error(msg)
            }
        }
    }, [err, actionT, user])

    const fetchOnSuccess = () => {
        dispatch(getUserData(userInfo._id))
    }

    return (
        <>
            <Head title={`${userInfo?.firstName || ""} ${userInfo?.lastName || ""} - Profile`} />
            <Layout isAdmin={false} />
            {
                user && <Box className="dashboard-main" id="projectMain">
                    <Box className="dashboard-main-container" p={{ xs: 2, sm: 4 }}>
                        <Box>
                            <Typography variant="h1" className='fw-semibold'>{selectedTab === 1 ? 'My Profile' : selectedTab === 2 ? "My Documents" : null}</Typography>
                            <Box mt={4} className="tab-container">
                                <Button className={`tab ${selectedTab === 1 ? 'active' : ''}`} onClick={() => setSelectedTab(1)}>Details</Button>
                                <Button className={`tab ${selectedTab === 2 ? 'active' : ''}`} onClick={() => setSelectedTab(2)}>Upload Documents</Button>
                            </Box>
                            <Box mt={2}>
                                {selectedTab === 1 ? <DetailProfile userInfo={user} /> : <DocumentUploadAndDisplay fetchOnSuccess={fetchOnSuccess} user={user} />
                                }
                            </Box>
                        </Box>
                    </Box>
                </Box>
            }
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

export default Profile