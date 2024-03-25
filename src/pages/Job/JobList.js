/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Grid, Header, Icon, Label, Segment, Table } from 'semantic-ui-react';
import JobService from '../../services/jobService';
import { Formik, useFormik } from 'formik';
import * as Yup from "yup";
import MessageModal from '../../layouts/Dashboard/MessageModal';

function JobList() {

    const [jobs, setJobs] = useState([]);
    const [open, setOpen] = useState(false);

    let jobService = new JobService();

    useEffect(() => {
        jobService.getAllJob().then((result) => setJobs(result.data.data));
    }, []);
    //* useEffect örneği Yoksa her an tetiklenir. useEffect(()=>{},[]);

    const initialValues = {
        jobName: "",
    };

    const validationSchema = Yup.object({
        jobName: Yup.string().required("required field"),
    });


    function refreshPage() {
        window.location.reload();
    }

    const onSubmit = (values, { resetForm }) => {
        console.log(values);
        jobService.addJob({ 
            jobName: values.jobName })
        handleModal(true);
        setTimeout(() => {
            resetForm();
        }, 100);
        refreshPage();
    };

    const handleDelete = async (id) => {
        let jobService = new JobService();
        console.log(id);
        jobService.deleteJob(id);
        refreshPage();
    }

    const handleModal = (value) => {
        setOpen(value);
    };

    const handleChange = (fieldName, value) => {
        formik.setFieldValue(fieldName, value);
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    });

    return (
        <Container style={{ margin: "1em" }}>
            <Segment>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Table celled striped>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell colSpan='2'>Job</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {jobs.map((job) => (
                                        <Table.Row style={{ margin: "1em" }}>
                                            <Table.Cell>{job.job}</Table.Cell>
                                            <Table.Cell textAlign='center'>
                                                <Button icon inverted color="red">
                                                    <Icon name='pencil' />
                                                </Button>
                                                <Button icon inverted color="red" onClick={() => handleDelete(job.id)}>
                                                    <Icon name='cancel' />
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Segment>
                                <Header as='h3' dividing>
                                    <Icon name='archive' />  Add Job
                                </Header>
                                <Formik>
                                    <Form onSubmit={formik.handleSubmit} style={{ margin: "0.5em" }}>
                                        <Form.Input
                                            name='jobName'
                                            placeholder='please enter job name...'
                                            onChange={(event, data) => handleChange("jobName", data.value)}
                                            value={formik.values.jobName}
                                        />
                                        {formik.errors.jobName && formik.touched.jobName && <span><Label basic pointing color="red" content={formik.errors.jobName} /><br /></span>}
                                        <Button inverted color="red" type="submit">Submit</Button>
                                    </Form>
                                </Formik>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <MessageModal onClose={() => handleModal(false)} onOpen={() => handleModal(true)} open={open} content="changes are saved." />
            </Segment>
        </Container>
    )
}

export default JobList;