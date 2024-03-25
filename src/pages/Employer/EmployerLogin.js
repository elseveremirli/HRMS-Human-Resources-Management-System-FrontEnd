import React, { useContext, useState } from 'react';
import { Button, Container, Divider, Form, Grid, Image, Segment } from 'semantic-ui-react';
import background from '../../img/background.jpg';
import AuthService from '../../services/authService';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../../contexts/UserProvider';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { NavLink } from 'react-router-dom';


export default function Login() {

    const { login } = useContext(UserContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const initialValues = {
        email: '',
        password: '',
    };

    const validateForm = Yup.object({
        email: Yup.string().required('Required field'),
        password: Yup.string().required('Required field'),
    });

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

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validateForm,
        onSubmit: handleSubmit,
    });

    return (
        <div style={{
            backgroundImage: `url(${background})`,
            justifyContent: 'center',
            alignItems: 'center',
            height: '420px',
        }}>
            <Container style={{
                margin: '1em',
                width: '400px',
                marginBottom: '25em',
                position: 'relative',
            }}>
                <Segment raised>
                    <Grid columns='equal'>
                        <Grid.Row textAlign='center'>
                            <Grid.Column>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Form.Input
                                        name='email'
                                        icon='user'
                                        iconPosition='left'
                                        label='Email'
                                        placeholder='Please enter your email.'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        error={formik.touched.email && formik.errors.email}
                                    />
                                    <Form.Input
                                        name='password'
                                        icon='lock'
                                        iconPosition='left'
                                        label='Password'
                                        type='password'
                                        placeholder='Please enter your password.'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        error={formik.touched.password && formik.errors.password}
                                    />
                                    <Button type='submit' content='Login' inverted color='red' />
                                </Form>
                                <Divider horizontal>OR</Divider>
                                <NavLink to='/employerLogin' style={{ color: "orangered" }}>
                                    SIGN UP!
                                </NavLink><br />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Container>
        </div>
    );
}