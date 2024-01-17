import { Layout } from "@/components";
import { Head, ProjectDetails } from "@/sections";
import {  Box } from "@mui/material";
import  { React,useEffect } from "react";
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
      <Layout isAdmin={false} userInfo={userInfo} />
      <Box className="dashboard-main" id="projectMain">
        <Box className="dashboard-main-container" p={{ xs: 2, sm: 4 }}>
          <ProjectDetails />
        </Box>
      </Box>
    </>
  );
}

export  const getServerSideProps = authMiddleware(async (context) => {
  const { req } = context;

  const cookies = parse(req.headers.cookie || "");
  const token = cookies["employeetoken"] || null;

  return {
    props: {
      token,
    },
  };
});
