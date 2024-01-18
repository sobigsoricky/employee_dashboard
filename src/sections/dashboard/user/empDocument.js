import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { DocumentCard } from '@/components'
import docTypes from '@/data/docTypes'

const EmpDocument = ({ employee }) => {
    const [hasDocument, setHasDocument] = useState(1)

    useEffect(() => {
        if (employee.documents && employee.documents !== null && employee.documents !== undefined && employee.documents !== "" && Object.keys(employee.documents).length > 0) {
            const hasDoc = Object.values(employee.documents).some(doc => doc !== null)
            setHasDocument(hasDoc)
        }
    }, [employee])

    console.log(employee)

    return (
        <>
            <Box mt={4}>
                <Grid container spacing={2}>
                    {
                        employee.documents && employee.documents !== null && employee.documents !== undefined && employee.documents !== "" && Object.keys(employee.documents).length > 0 && Object.keys(employee.documents).map(doc => employee.documents[doc] && doc !== "payslips" && <Grid item xs={12} sm={6} >
                            <DocumentCard title={docTypes[doc]} link={employee.documents[doc]} />
                        </Grid>)
                    }
                </Grid>
            </Box>
        </>
    )
}

export default EmpDocument