import React, { useState } from 'react'
import { Button, Container, Divider, Form, Grid, Header, Icon, Label, Segment } from 'semantic-ui-react'
import SystemEmployeeService from '../../services/systemEmployeeService';
import * as Yup from "yup";
import { Formik, useFormik } from 'formik';
import MessageModal from '../../layouts/Dashboard/MessageModal';

function SystemEmployeeSignUp() {

    const [open, setOpen] = useState(false);

    let systemEmployeeService = new SystemEmployeeService();

    const initialValues = {
        firstName: "",
        lastName: "",
        telephone: "",
        email: "",
        password: "",
        passwordRep: "",
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required("required field"),
        lastName: Yup.string().required("required field"),
        telephone: Yup.string().required("required field"),
        email: Yup.string().required("required field."),
        password: Yup.string().required("required field"),
        passwordRep: Yup.string().required("required field"),
    });

    const onSubmit = (values, { resetForm }) => {
        console.log(values);
        systemEmployeeService.addSystemEmployee(values);
        handleModal(true);
        setTimeout(() => {
            resetForm();
        }, 100);
        refreshPage();
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    });

    const handleModal = (value) => {
        setOpen(value);
    };

    const handleChange = (fieldName, value) => {
        formik.setFieldValue(fieldName, value);
    };

    function refreshPage() {
        window.location.reload();
    }

    return (
        <Container style={{ margin: "1em", marginBottom: "3em" }}>
            <Segment>
                <Header as='h3' disabled dividing>
                    <Icon name='bug' />
                    <Header.Content>New System Employee </Header.Content>
                </Header>
                <Grid>
                    <Grid.Row style={{ margin: "0.5em" }}>
                        <Grid.Column>
                            <Formik>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Form.Group widths='equal'>
                                        <Form.Input
                                            name="firstName"
                                            label='First Name'
                                            placeholder='First Name'
                                            onChange={(event, data) => handleChange("firstName", data.value)}
                                            value={formik.values.firstName}
                                        />
                                        {formik.errors.firstName && formik.touched.firstName && <span><Label basic pointing='left' color="red" content={formik.errors.firstName} /><br /></span>}
                                        <Form.Input
                                            name="lastName"
                                            label='Last Name'
                                            placeholder='Last Name'
                                            onChange={(event, data) => handleChange("lastName", data.value)}
                                            value={formik.values.lastName}
                                        />
                                         {formik.errors.lastName && formik.touched.lastName && <span><Label basic pointing='left'  color="red" content={formik.errors.lastName} /><br /></span>}
                                    </Form.Group>
                                    <Divider />
                                    <Form.Group widths='equal'>
                                        <Form.Input
                                            name='email'
                                            label='E-mail'
                                            placeholder='E-mail'
                                            onChange={(event, data) => handleChange("email", data.value)}
                                            value={formik.values.email}
                                        />
                                         {formik.errors.email && formik.touched.email && <span><Label basic pointing='left' color="red" content={formik.errors.email} /><br /></span>}
                                         <Form.Input
                                            name='telephone'
                                            label='Telephone'
                                            placeholder='Telephone'
                                            onChange={(event, data) => handleChange("telephone", data.value)}
                                            value={formik.values.telephone}
                                        />
                                         {formik.errors.telephone && formik.touched.telephone && <span><Label basic pointing='left' color="red" content={formik.errors.telephone} /><br /></span>}
                                    </Form.Group>
                                    <Divider /><br />
                                    <Form.Group widths='equal'>
                                        <Form.Input
                                            name='password'
                                            label='Password'
                                            placeholder='Password'
                                            type='password'
                                            onChange={(event, data) => handleChange("password", data.value)}
                                            value={formik.values.password}
                                        />
                                         {formik.errors.password && formik.touched.password && <span><Label basic pointing='left'color="red" content={formik.errors.password} /><br /></span>}
                                        <Form.Input
                                            name='passwordRep'
                                            label='Re-Password'
                                            placeholder='Re-Password'
                                            type='password'
                                            onChange={(event, data) => handleChange("passwordRep", data.value)}
                                            value={formik.values.passwordRep}
                                        />
                                         {formik.errors.passwordRep && formik.touched.passwordRep && <span><Label basic pointing='left' color="red" content={formik.errors.passwordRep} /><br /></span>}
                                    </Form.Group><br />
                                    {/* <Button inverted color='red'>
                                        Create Password
                                    </Button> */}
                                    <Container textAlign='right'>
                                        <Button animated='fade' inverted color='red' type='submit'>
                                            <Button.Content visible>Next</Button.Content>
                                            <Button.Content hidden>
                                                <Icon name='arrow right' />
                                            </Button.Content>
                                        </Button>
                                    </Container>
                                </Form>
                            </Formik>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <MessageModal onClose={() => handleModal(false)} onOpen={() => handleModal(true)} open={open} content="An activation e-mail has been sent !" />
        </Container>
    )
}
export default SystemEmployeeSignUp;