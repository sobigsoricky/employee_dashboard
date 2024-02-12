import { handleGetWorkReport } from '@/redux/actions/user/reportAction'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography, Paper } from '@mui/material'
import month from '@/data/month'

const WorkHistory = () => {
    const dispatch = useDispatch()
    const { reports } = useSelector(state => state.reportReducer)

    useEffect(() => {
        dispatch(handleGetWorkReport())
    }, [dispatch])

    console.log(reports)

    const setDate = (d) => {
        const date = new Date(d).getDate()
        const mon = month[Number(new Date().getMonth())]
        const year = new Date(d).getFullYear()
        return `${date} ${mon}, ${year}`
    }

    return (
        <>
            <Box px={2} className="whistory">
                {
                    reports && reports !== null && reports !== undefined && reports !== "" && reports.length > 0 && reports.reverse().map(item => <Box p={2} mb={2} component={Paper} className='shadow'>
                        <Typography variant="h2" className='fw-semibold' gutterBottom>Work Update | {setDate(item?.date)}</Typography>

                        <Box mt={2} className="table-responsive">
                            <table cellpadding="16" border="1" rules="all" style={{ width: "100%", borderCollapse: 'collapse' }}>
                                <tr>
                                    <th>Reciever</th>
                                    <td>{item?.receiver}</td>
                                </tr>
                                <tr>
                                    <th>CC</th>
                                    <td>{item?.cc.map((e, index) => <span>{e}{index + 1 < item?.cc.length ? ', ' : ''}</span>)}</td>
                                </tr>
                                <tr>
                                    <th>Sender</th>
                                    <td>{item?.sender}</td>
                                </tr>
                            </table>
                        </Box>
                        <Box mt={2}>
                            <Typography variant='h3' className='fw-semibold'>Work Report</Typography>
                            <Box mt={2} dangerouslySetInnerHTML={{ __html: item?.work }} />
                        </Box>
                    </Box>)
                }
            </Box>
        </>
    )
}

export default WorkHistory