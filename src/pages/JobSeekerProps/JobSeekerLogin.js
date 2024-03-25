import React, { useContext, useState } from 'react';
import { Button, Container, Divider, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../contexts/UserProvider';

const JobSeekerLogin = () => {
    const { login } = useContext(UserContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = async (values) => {
        try {
          const response = await axios.post('http://localhost:8080/api/auth/login', {
            email: values.email,
            password: values.password
          });
          const { success, message } = response.data;
          if (success) {
            setIsLoggedIn(true);
            login(response.data); // Kullanıcı bilgilerini kaydedin
            navigate('/');
          } else {
            setError(message);
          }
        } catch (error) {
          console.log(error.response.data);
          setError('Bir hata oluştu');
        }
      };

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().required('Required field'),
        password: Yup.string().required('Required field'),
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <Container style={{ margin: '1em', width: '400px', marginBottom: '16em' }}>
            <Segment raised>
                <Header as='h4'>Candidate Login</Header>
                <Grid columns='equal'>
                    <Grid.Row textAlign='center'>
                        <Grid.Column>
                            <Form onSubmit={formik.handleSubmit}>
                                <Form.Input
                                    name='email'
                                    type='email'
                                    icon='user'
                                    iconPosition='left'
                                    label='Email'
                                    placeholder='Please enter your email.'
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    error={formik.touched.email && formik.errors.email}
                                    onChange={formik.handleChange}
                                    required
                                />
                                <Form.Input
                                    name='password'
                                    icon='lock'
                                    iconPosition='left'
                                    label='Password'
                                    type='password'
                                    placeholder='Please enter your password.'
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    error={formik.touched.password && formik.errors.password}
                                    onChange={formik.handleChange}
                                    required
                                />
                                <Button type='submit' content='Login' inverted color='red' />
                            </Form>
                            <Divider horizontal>OR</Divider>
                            <NavLink to='/jobSeekerSignUp' style={{ color: 'orangered' }}>
                                Sign Up as a Job Seeker
                            </NavLink>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Container>
    );
}

export default JobSeekerLogin;
