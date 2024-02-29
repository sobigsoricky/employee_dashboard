import React from 'react'
import { Box } from '@mui/material'
import { CalenderTimeline } from '@/components'

const ProjectTimeline = ({ items, groups, dueDate, status }) => {
    return (
        <>
            <Box>
                <CalenderTimeline items={items} groups={groups} />
                <Box mt={5} className="table-responsive">
                    <table className='table' style={{ borderCollapse: "collapse", width: '100%' }}>
                        <thead>
                            <tr>
                                <th>Project Due Date</th>
                                <th>Project Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <td>{dueDate}</td>
                            <td>{status}</td>
                        </tbody>
                    </table>
                </Box>
            </Box>
        </>
    )
}

export default ProjectTimeline