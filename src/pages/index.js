import React from 'react'
import { useRouter } from 'next/router'
import { Container, Box, Typography, Grid, Button } from '@mui/material'

const index = () => {
  const router = useRouter()
  return (
    <>
      <header className='shadow'>
        <Container maxWidth="xxl" className='py-3'>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={11}>
              <Box>
                <img src="/images/logo.svg" alt="" className='img-fluid' />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </header>
      <section id="homeBanner">
        <Container maxWidth="xxl">
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={11}>
              <Box>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6} order={{ xs: 2, sm: 1 }}>
                    <Typography variant='h2'>Task Management with Employee Dashboard</Typography>
                    <Typography variant='h1'>Projects That Work.</Typography>
                    <Typography>Whether you're managing your next big project or digitalizing task management for your team's daily business, you need to know who’s doing what, when. Employee Dashboard helps you manage tasks in a beautiful, customizable environment that perfectly adapts to your needs.</Typography>
                    <Button className='btn--dark' onClick={() => router.push('/user/auth/')}>Login as Employee</Button>
                  </Grid>
                  <Grid item xs={12} sm={6} order={{ xs: 1, sm: 2 }}>
                    <Box>
                      <img src="/images/home-banner.png" alt="" className='img-fluid' />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  )
}

export default index