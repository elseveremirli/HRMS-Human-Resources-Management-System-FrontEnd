import { Formik, useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Container, Form, Header, Icon, Message } from 'semantic-ui-react';
import { UserContext } from '../../contexts/UserProvider';
import JobSeekerService from '../../services/jobSeekerService';

export default function PersonalInformation() {

    const [open, setOpen] = useState(null);
    const { user } = useContext(UserContext);
    let jobSeekerService = new JobSeekerService();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const formik = useFormik({
        initialValues: {
          id: user && user.data ? user.data.id : '',
          firstName: user && user.data ? user.data.firstName : 'none',
          lastName: user && user.data ? user.data.lastName : 'none',
          telephone: user && user.data ? user.data.telephone : 'none',
          email: user && user.data ? user.data.email : 'none',
          password: '',
        },
        onSubmit: async (values) => {
          console.log(values);
          try {
            jobSeekerService.updateJobSeeker(values)
              .then(response => {
                setSuccess(response.data.message);
                formik.setValues(values);
                handleModal(true);
              })
              .catch(error => {
                setError("Update error occurred.", error);
              });
          } catch (error) {
            setError("Update error occurred.", error);
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
        <Container>
            <Header as='h4' disabled dividing>
                <Icon name='user' />
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
            <Formik>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Input
                            icon='user'
                            name="firstName"
                            label='First Name'
                            placeholder='First Name'
                            onChange={(event, data) => handleChange("firstName", data.value)}
                            value={formik.values.firstName}
                        />
                        <Form.Input
                            icon='user'
                            name="lastName"
                            label='Last Name'
                            placeholder='Last Name'
                            onChange={(event, data) => handleChange("lastName", data.value)}
                            value={formik.values.lastName}
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input
                            icon='teletype'
                            name="telephone"
                            label='Telephone'
                            placeholder='Telephone'
                            onChange={(event, data) => handleChange("telephone", data.value)}
                            value={formik.values.telephone}
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input
                            icon='mail'
                            name="email"
                            label='Email'
                            placeholder='Email'
                            onChange={(event, data) => handleChange("email", data.value)}
                            value={formik.values.email}
                        />
                    </Form.Group>
                    <Form.Button inverted color='red' type="submit">Save</Form.Button>
                </Form>
            </Formik>
        </Container>
    )
}
