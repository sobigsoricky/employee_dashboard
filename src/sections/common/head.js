import Head from 'next/head'
import React from 'react'

const head = ({ title }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
        </>
    )
}

export default head