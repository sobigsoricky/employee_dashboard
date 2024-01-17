import React from 'react'
import { Box, Button, Typography, Grid } from '@mui/material'
import { Edit } from '@mui/icons-material'

const Profile = ({ userInfo }) => {

    return (
        <>
            <Box mt={4}>
                <Box p={2} className="empDetail">
                    <Grid container>
                        <Grid item xs={12} sm={1.3}>
                            <Box className="detailAvatar">
                                {
                                    userInfo && userInfo !== null && userInfo !== undefined && userInfo !== "" && Object.keys(userInfo).length > 0 && <img src={userInfo?.displayProfile} className="img-fluid" />
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={9.7} className="d-flex align-items-center">
                            <Box>
                                <Typography variant="h3" className="fw-semibold" gutterBottom>
                                    {userInfo?.firstName} {userInfo?.lastName}
                                </Typography>
                                <Typography sx={{ color: "#848A94" }}>
                                    {userInfo?.designation}
                                </Typography>
                                <Typography sx={{ color: "#848A94" }}>Rankfast</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box p={2} mt={2} className="empDetail">
                    <Box className="d-flex justify-content-between align-items-center">
                        <Typography variant="h4" className="fw-semibold">
                            Personal Information
                        </Typography>
                        {/* <Button className="detailAvatarEditBtn">
                            <Edit /> Edit
                        </Button> */}
                    </Box>
                    <Box mt={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={5}>
                                <Box>
                                    <Typography className="empDetailLabel">
                                        Email Address
                                    </Typography>
                                    <Typography variant="h5">{userInfo?.email}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Box>
                                    <Typography className="empDetailLabel">
                                        Phone number
                                    </Typography>
                                    <Typography variant="h5">{userInfo?.phone}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box>
                                    <Typography className="empDetailLabel">About</Typography>
                                    <Typography variant="h5">{userInfo?.about}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Box>
                                    <Typography className="empDetailLabel">
                                        Email Address
                                    </Typography>
                                    <Typography variant="h5">{userInfo?.email}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Box>
                                    <Typography className="empDetailLabel">
                                        Email Address
                                    </Typography>
                                    <Typography variant="h5">{userInfo?.email}</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Box p={2} mt={2} className="empDetail">
                    <Box className="d-flex justify-content-between align-items-center">
                        <Typography variant="h4" className="fw-semibold">
                            Teams Information
                        </Typography>
                        {/* <Button className="detailAvatarEditBtn">
                            <Edit /> Edit
                        </Button> */}
                    </Box>
                    <Box mt={2}>
                        <Grid container spacing={2}>
                            {userInfo?.teams?.map((team) => (
                                <>
                                    <Grid item xs={12} sm={5}>
                                        <Box>
                                            <Typography className="empDetailLabel">
                                                Team Name
                                            </Typography>
                                            <Typography variant="h5">{team.teamName}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        <Box>
                                            <Typography className="empDetailLabel">
                                                Team Description
                                            </Typography>
                                            <Typography variant="h5">{team.teamDesc}</Typography>
                                        </Box>
                                    </Grid>
                                </>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Profile