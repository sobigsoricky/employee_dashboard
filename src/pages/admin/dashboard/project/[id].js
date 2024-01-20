import { Layout } from "@/components";
import { Head, ProjectDetails } from "@/sections";
import { Box } from "@mui/material";
import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { parse } from "cookie";
import { authenticateEmployee } from "@/redux/actions/authAction";
import authMiddleware from "@/middleware";


export default function singleProject({ token }) {

    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.employeeAuthReducer);

    useEffect(() => {
        if (token) dispatch(authenticateEmployee(token));
    }, [token]);


    return (
        <>
            <Head title="Project | Employee" />
            <Layout isAdmin={true} userInfo={userInfo} />
            <Box className="dashboard-main" id="projectMain">
                <Box className="dashboard-main-container" p={{ xs: 2, sm: 4 }}>
                    <ProjectDetails isAdmin={true} />
                </Box>
            </Box>
        </>
    );
}

export const getServerSideProps = authMiddleware(async (context) => {
    const { req } = context;

    const cookies = parse(req.headers.cookie || "");
    const token = cookies["token"] || null;

    return {
        props: {
            token,
        },
    };
});
