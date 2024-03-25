import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Button, Container, Form, Header, Icon, Message, Segment } from 'semantic-ui-react';
import { UserContext } from '../../contexts/UserProvider';
import EmployerService from '../../services/employerService';
import PasswordOperations from './PasswordOperations';

export default function EmployerPersonalInformation() {

    const [open, setOpen] = useState(null);
    const { user } = useContext(UserContext);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    let employerService = new EmployerService()

    const formik = useFormik({
        initialValues: {
            id: user && user.data ? user.data.id : '',
            firstName: user && user.data ? user.data.firstName : 'none',
            lastName: user && user.data ? user.data.lastName : 'none',
            telephone: user && user.data ? user.data.telephone : 'none',
            email: user && user.data ? user.data.email : 'none',
            password: '',
            companyName: user && user.data ? user.data.companyName : '',
            companyMail: user && user.data ? user.data.companyMail : '',
            companyDescription: user && user.data ? user.data.companyDescription : '',
            webSiteName: user && user.data ? user.data.webSiteName : '',
        },
        onSubmit: async (values) => {
            console.log(values);
            try {
                employerService.updateEmployer(values).then(response => {
                    console.log("updated has been success.");
                    setSuccess("updated has been success.");
                    formik.setValues(values);
                    handleModal(true);
                }).catch(error => {
                    setError("updated has been error.");
                    console.log("updated has been error.");
                });
            } catch (error) {
                setError("updated has been error.", error);
            }
        }
    });

    const handleModal = (value) => {
        setOpen(value);
    };

    const handleChange = (fieldName, value) => {
        formik.setFieldValue(fieldName, value);
    };

    return (
        <Container style={{ margin: '1em' }}>
            <Segment raised>
                <Header as='h4' disabled dividing>
                    <Icon name='user outline' />
                    <Header.Content>Personal Information</Header.Content>
                </Header>
                {error && (
                    <Message negative>
                        <Message.Header>Error!</Message.Header>
                        <p>{error}</p>
                    </Message>
                )}
                {success && (
                    <Message positive>
                        <Message.Header>Success!</Message.Header>
                        <p>{success}</p>
                    </Message>
                )}
                <Form widths='equal' onSubmit={formik.handleSubmit}>
                    <Form.Group>
                        <Form.Input
                            name='firstName'
                            label='First Name'
                            placeholder='please enter your first name'
                            icon='user'
                            onChange={(event, data) => handleChange("firstName", data.value)}
                            value={formik.values.firstName} />
                        <Form.Input
                            name='lastName'
                            label='Last Name'
                            placeholder='please enter your last name'
                            icon='user'
                            onChange={(event, data) => handleChange("lastName", data.value)}
                            value={formik.values.lastName} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input
                            name='telephone'
                            label='Telephone'
                            placeholder='please enter your telephone'
                            icon='teletype'
                            onChange={(event, data) => handleChange("telephone", data.value)}
                            value={formik.values.telephone} />
                        <Form.Input
                            name='email'
                            label='E-mail'
                            placeholder='please enter your email'
                            icon='mail'
                            onChange={(event, data) => handleChange("email", data.value)}
                            value={formik.values.email} />
                    </Form.Group>
                    <Button inverted color='red'>Apply</Button>
                </Form>
                <br /><br />
                <PasswordOperations />
            </Segment>
        </Container>
    )
}
