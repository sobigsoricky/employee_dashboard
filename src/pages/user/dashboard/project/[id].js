import { Layout } from "@/components";
import { Head, ProjectDetails } from "@/sections";
import { Box } from "@mui/material";
import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticateEmployee } from "@/redux/actions/authAction";


export default function singleProject() {
  const dispatch = useDispatch();
  const { userInfo, error, message, actionT } = useSelector(state => state.employeeAuthReducer)

  useEffect(() => {
    dispatch(authenticateEmployee());
  }, [dispatch]);

  useEffect(() => {
    if (error && actionT === "auth") {
      dispatch(logoutEmployeeUser())
      router.push('/user/auth/')
    }
  }, [error, actionT])

  return (
    <>
      <Head title="Project | Employee" />
      <Layout isAdmin={false} userInfo={userInfo} />
      <Box className="dashboard-main" id="projectMain">
        <Box className="dashboard-main-container" p={{ xs: 2, sm: 4 }}>
          <ProjectDetails isAdmin={false} />
        </Box>
      </Box>
    </>
  );
}