import React from 'react'
import { Container, Grid } from '@mui/material'
import Link from 'next/link'

const Header = () => {
    return (
        <>
            <header>
                <Container maxWidth="xxl">
                    <Grid container justifyContent="center">
                        <Grid item xs={12} lg={11}>
                            <nav className='navbar'>
                                <Link href="/" legacyBehavior>
                                    <a className='navbar-barnd py-2'>
                                        <img src="/images/logo.svg" className='img-fluid' />
                                    </a>
                                </Link>
                            </nav>
                        </Grid>
                    </Grid>
                </Container>
            </header>
        </>
    )
}

export default Header