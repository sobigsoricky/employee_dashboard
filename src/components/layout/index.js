import React from 'react'
import SidePanel from './side-panel'

const index = ({ userInfo, isAdmin }) => {
    return (
        <>
            <SidePanel isAdmin={isAdmin} />
        </>
    )
}

export default index