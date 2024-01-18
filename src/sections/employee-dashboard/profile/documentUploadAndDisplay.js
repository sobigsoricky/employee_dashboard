import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, InputLabel, TextField, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { uploadDocuments } from '@/redux/actions/user/profileAction';
import { toast } from 'react-toastify';
import { DocumentCard } from '@/components';
import docTypes from '@/data/docTypes';

const DocumentUploadAndDisplay = ({ user, fetchOnSuccess }) => {
    const dispatch = useDispatch();
    const { error, message, actionT } = useSelector((state) => state.userProfileReducer);

    const [hasDocument, setHasDocument] = useState(false)

    const [docs, setDocs] = useState({
        id: null,
        ssc: null,
        hsc: null,
        ug: null,
        pg: null,
        certification: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('employeeId', user._id);
        Object.keys(docs).forEach((key) => {
            if (docs[key]) {
                formData.append(key, docs[key]);
            }
        });
        dispatch(uploadDocuments(formData));
    };

    useEffect(() => {
        if (error && actionT === 'upload') {
            toast.error(message);
            setDocs({
                id: null,
                ssc: null,
                hsc: null,
                ug: null,
                pg: null,
                certification: null,
            });
        } else if (!error && actionT === 'upload') {
            toast.success(message);
            setDocs({
                id: null,
                ssc: null,
                hsc: null,
                ug: null,
                pg: null,
                certification: null,
            });

            fetchOnSuccess()
        }
    }, [error, actionT, message]);

    useEffect(() => {
        if (user && user !== null && user !== undefined && Object.keys(user).length > 0) {
            if (user.documents && user.documents !== null && user.documents !== undefined && user.documents !== "" && Object.keys(user.documents).length > 0) {
                const hasDoc = Object.values(user.documents).some(doc => doc !== null)
                setHasDocument(hasDoc)
            }
        }
    }, [user])

    return (
        <>
            {
                hasDocument && <Box>
                    <Typography variant='h2' className='fw-semibold'>Documents</Typography>
                    <Box mt={3}>
                        <Grid container spacing={2}>
                            {
                                user.documents !== null && user.documents !== undefined && user.documents !== "" && Object.keys(user.documents).length > 0 && Object.keys(user.documents).map(doc => user.documents[doc] !== null && <Grid item xs={12} sm={6}>
                                    <DocumentCard title={docTypes[doc]} link={user.documents[doc]} />
                                </Grid>)
                            }
                        </Grid>
                    </Box>
                </Box>
            }
            <Box mt={3}>
                <form onSubmit={handleSubmit}>
                    {
                        user.documents && user.documents !== null && user.documents !== undefined && user.documents !== "" && Object.keys(user.documents).map(tf => (
                            user.documents[tf] === null && (
                                <Box key={tf} mb={2}>
                                    <InputLabel>{docTypes[tf]}</InputLabel>
                                    <TextField
                                        type="file"
                                        accept=".jpg, .jpeg, .png, .pdf"
                                        name={tf}
                                        onChange={(e) => setDocs((prevDocs) => ({ ...prevDocs, [tf]: e.target.files[0] }))}
                                    />
                                </Box>
                            )
                        ))
                    }
                    <Box>
                        <Button type="submit" className="btn--dark">
                            Upload
                        </Button>
                    </Box>
                </form>
            </Box>
        </>
    );
};

export default DocumentUploadAndDisplay;
