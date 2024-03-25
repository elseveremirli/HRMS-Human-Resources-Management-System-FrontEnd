import React, { useState } from 'react'
import { Button, Container, Divider, Form, Grid, Header, Icon, Image, Segment } from 'semantic-ui-react'
import EmployerService from '../../services/employerService';
import { Formik, useFormik } from 'formik';
import * as Yup from "yup";
import MessageModal from '../../layouts/Dashboard/MessageModal';
import employerPic from '../../img/office.png'

function Employer() {

    const [open, setOpen] = useState(false);

    let employerService = new EmployerService();

    const initialValues = {
        firstName: "",
        lastName: "",
        telephone: "",
        email: "",
        password: "",
        passwordRep: "",
        companyName: "",
        companyDescription: "",
        companyMail: "",
        webSiteName:""
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required("required field"),
        lastName: Yup.string().required("required field"),
        telephone: Yup.string().required("required field"),
        email: Yup.string().required("required field. this email must be company owner's email."),
        password: Yup.string().required("required field"),
        passwordRep: Yup.string().oneOf([Yup.ref("password")], "password doesn't match."),
        companyName: Yup.string().required("required field"),
        companyDescription: Yup.string().required("required field"),
        companyMail: Yup.string().required("required field"),
        webSiteName: Yup.string().required("required field"),
    });

    const onSubmit = (values, { resetForm }) => {
        console.log(values);
        employerService.addEmployer(values);
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
        <Container style={{ margin: "1em" }}>
            <Segment>
                <Header as='h3' disabled dividing>
                    <Icon name='sign language' />
                    <Header.Content>Sign up, join us and start!</Header.Content>
                </Header>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Image src={employerPic} centered />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column widths={16}>
                            <Formik>
                                <Form widths='equal' onSubmit={formik.handleSubmit}>
                                    <Header as='h4' disabled dividing>
                                        <Icon name='user outline' />
                                        <Header.Content>personal information</Header.Content>
                                    </Header>
                                    <Form.Group widths='equal'>
                                        <Form.Input
                                            name="firstName"
                                            label='First Name'
                                            placeholder='First Name'
                                            onChange={(event, data) => handleChange("firstName", data.value)}
                                            value={formik.values.firstName}
                                        />
                                        <Form.Input
                                            name="lastName"
                                            label='Last Name'
                                            placeholder='Last Name'
                                            onChange={(event, data) => handleChange("lastName", data.value)}
                                            value={formik.values.lastName}
                                        />
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
                                        <Form.Input
                                            name='password'
                                            label='Password'
                                            placeholder='Password'
                                            type='password'
                                            onChange={(event, data) => handleChange("password", data.value)}
                                            value={formik.values.password}
                                        />
                                        <Form.Input
                                            name='passwordRep'
                                            label='Re-Password'
                                            placeholder='Re-Password'
                                            type='password'
                                            onChange={(event, data) => handleChange("passwordRep", data.value)}
                                            value={formik.values.passwordRep}
                                        />
                                    </Form.Group><br />
                                    <Header as='h4' disabled dividing>
                                        <Icon name='briefcase' />
                                        <Header.Content>company information</Header.Content>
                                    </Header>
                                    <Form.Group>
                                        <Form.Input
                                            name='companyName'
                                            label='Company Name'
                                            placeholder='Company Name'
                                            onChange={(event, data) => handleChange("companyName", data.value)}
                                            value={formik.values.companyName}
                                        />
                                        <Form.Input
                                            name='companyMail'
                                            label='Company Mail'
                                            placeholder='Company Mail'
                                            onChange={(event, data) => handleChange("companyMail", data.value)}
                                            value={formik.values.companyMail}
                                        />
                                        <Form.Input
                                            name='telephone'
                                            label='Telephone'
                                            placeholder='Telephone'
                                            onChange={(event, data) => handleChange("telephone", data.value)}
                                            value={formik.values.telephone}
                                        />
                                    </Form.Group>
                                    <Form.Input
                                            name='webSiteName'
                                            label='Web Site'
                                            placeholder='Web Site'
                                            onChange={(event, data) => handleChange("webSiteName", data.value)}
                                            value={formik.values.webSiteName}
                                        />
                                    <Form.TextArea
                                        name='companyDescription'
                                        label='Company Description'
                                        placeholder='Company Description'
                                        onChange={(event, data) => handleChange("companyDescription", data.value)}
                                        value={formik.values.companyDescription}
                                    />
                                    <Container textAlign='right'>
                                        <Button animated='fade' inverted color='red' type ='submit'>
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
        </Container >
    )
}

export default Employer;