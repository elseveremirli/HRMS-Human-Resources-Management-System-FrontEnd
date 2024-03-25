import React from 'react';
import { Button, Container, Divider, Form, Grid, Image, Segment } from 'semantic-ui-react';
import loginPhoto from '../../img/meeting.jpg';
import AuthService from '../../services/authService';
import { useFormik } from 'formik';
import * as Yup from 'yup';


export default function Login() {

    const authService = new AuthService();

    const initialValues = { 
        email: '',
        password: '',
    };

    const validateForm = Yup.object({
        email: Yup.string().required('Required field'),
        password: Yup.string().required('Required field'),
    });

    const handleSubmit = (values) => {
        console.log(values);
        authService.login(values.email, values.password)
            .then((response) => {
                console.log("welcome")
                //history.push('/');
            })
            .catch((error) => {
                console.log("try again")
            });
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validateForm,
        onSubmit: handleSubmit,
    });

    return (
        <Container style={{ margin: '1em' }}>
            <Segment>
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
                            Sign UP!
                        </Grid.Column>
                        <Grid.Column>
                            <Image src={loginPhoto} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Container>
    );
}