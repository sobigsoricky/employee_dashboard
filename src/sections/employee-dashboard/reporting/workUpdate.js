import { WorkUpdateForm } from '@/components'
import React from 'react'

const WorkUpdate = ({ userInfo }) => {
    return (
        <>
            <WorkUpdateForm userInfo={userInfo} />
        </>
    )
}

export default WorkUpdate