import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, MenuItem, Select, Button } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllEmployees } from '@/redux/actions/admin/employee-action';
import { getAdmins } from '@/redux/actions/admin/adminAction';
import month from '@/data/month';
import { handleSaveWorkReport } from '@/redux/actions/user/reportAction';
import { toast } from 'react-toastify'

const WorkUpdateForm = ({ userInfo }) => {
    const [report, setReport] = useState({ to: "", cc: [] });
    const dispatch = useDispatch();
    const { employees } = useSelector(state => state.adminEmployeeReducer);
    const { admins } = useSelector(state => state.adminReducer);
    const { message, error, actionT } = useSelector(state => state.reportReducer)

    useEffect(() => {
        dispatch(getAllEmployees());
        dispatch(getAdmins());
    }, [dispatch]);

    const editorRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReport(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSendWorkReport = (e) => {
        e.preventDefault();

        const date = new Date().getDate()
        const mon = month[Number(new Date().getMonth())]
        const year = new Date().getFullYear()

        const today = `${date} ${mon}, ${year}`

        if (editorRef.current && userInfo) {
            const newReport = { ...report, work: editorRef.current.getContent(), sender: userInfo, date: today }
            dispatch(handleSaveWorkReport(newReport))
        }
    }

    useEffect(() => {
        if (!error && actionT === "send") {
            toast.success(message)
            setReport({ to: "", cc: [] })
            window.location.reload()
        } else if (error && actionT === "send") {
            toast.error(message)
        }
    }, [error, actionT])

    return (
        <Box>
            <form onSubmit={handleSendWorkReport}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box>
                            <Editor
                                apiKey='cvda1km260zzvtwee3inippqpwopc45mcverz7bpnf5duff1'
                                onInit={(evt, editor) => editorRef.current = editor}
                                initialValue="<p>This is the initial content of the editor.</p>"
                                init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                    ],
                                    toolbar: 'undo redo | blocks | ' +
                                        'bold italic forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {(employees && employees.length > 0 && admins && admins.length > 0) && (
                            <Box>
                                <label>Send To</label>
                                <Select fullWidth onChange={handleChange} name="to" value={report.to}>
                                    {[...employees.map(e => <MenuItem key={e?.email} value={e?.email}>{e?.firstName} {e?.lastName}</MenuItem>), ...admins.map(a => <MenuItem key={a?.email} value={a?.email}>{a?.details?.firstName} {a?.details?.lastName}</MenuItem>)]}
                                </Select>
                            </Box>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {(employees && employees.length > 0 && admins && admins.length > 0) && (
                            <Box>
                                <label>Send To CC</label>
                                <Select multiple fullWidth onChange={handleChange} name="cc" value={report.cc || []}>
                                    {[...employees.map(e => <MenuItem key={e?.email} value={e?.email}>{e?.firstName} {e?.lastName}</MenuItem>), ...admins.map(a => <MenuItem key={a?.email} value={a?.email}>{a?.details?.firstName} {a?.details?.lastName}</MenuItem>)]}
                                </Select>
                            </Box>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box>
                            <Button type="submit" className='btn--dark'>Send</Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}

export default WorkUpdateForm;
