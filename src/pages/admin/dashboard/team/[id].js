import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { Layout } from "@/components";
import { Head, TeamDetails } from "@/sections";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { authenticateUser } from "@/redux/actions/authAction";
import { getTeam } from '@/redux/actions/admin/teamAction';
import { getAllEmployees } from '@/redux/actions/admin/employee-action';

const SingleTeam = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const { userInfo, error, message, actionT } = useSelector(state => state.authReducer);
    const { team } = useSelector((state) => state.teamReducer)
    const { employees } = useSelector((state) => state.adminEmployeeReducer)
    const { id } = router.query

    useEffect(() => {
        dispatch(authenticateUser())
    }, [dispatch])

    useEffect(() => {
        if (error && actionT === "auth") {
            dispatch(logoutAdmin())
        }
    }, [error, actionT])

    useEffect(() => {
        if (id !== null && id !== undefined && id !== "") {
            dispatch(getTeam(id))
            dispatch(getAllEmployees())
        }
    }, [id])

    return (
        <>
            <Head title="Team | Employee" />
            <Layout isAdmin={true} userInfo={userInfo} />
            <Box className="dashboard-main" id="projectMain">
                <Box className="dashboard-main-container" p={{ xs: 2, sm: 4 }}>
                    <TeamDetails team={team} employees={employees} />
                </Box>
            </Box>
        </>
    )
}

export default SingleTeam