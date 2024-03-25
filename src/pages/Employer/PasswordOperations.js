import React, { useContext, useState } from 'react'
import { Button, Container, Form, Header, Icon, Label, Message } from 'semantic-ui-react'
import EmployerService from '../../services/employerService';
import { useFormik } from 'formik';
import { UserContext } from '../../contexts/UserProvider';

export default function PasswordOperations() {
    const { user } = useContext(UserContext);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const employerService = new EmployerService();

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        onSubmit: async (values) => {
            try {
                // Eski şifrenin doğrulanması
                const oldPassword = user.data?.password;

                if (oldPassword !== user.data?.password) {
                    setError('old password is incorrect!');
                    return;
                }

                // Yeni şifrelerin kontrolü
                if (values.newPassword !== values.confirmPassword) {
                    setError('the new password does not match.');
                    return;
                }

                // Şifrenin güncellenmesi
                const updatedValues = {
                    id: user.data.id,
                    firstName: user.data.firstName,
                    lastName: user.data.lastName,
                    telephone: user.data.telephone,
                    email: user.data.email,
                    password: values.newPassword,
                    companyName: user.data.companyName,
                    webSiteName: user.data.webSiteName,
                    companyMail: user.data.companyMail,
                    companyDescription: user.data.companyDescription,
                };

                employerService.updateEmployer(updatedValues)
                    .then(response => {
                        console.log("updated success.");
                        formik.resetForm();
                        setSuccess('your password has been updated successful.');
                        setError('');
                    })
                    .catch(error => {
                        console.error("update error", error);
                    });
            } catch (error) {
                console.error("update error", error);
            }
        }
    });

    return (
        <Container>
            <Header as='h4' disabled dividing>
                <Icon name='lock open' />
                <Header.Content>Password</Header.Content>
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
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Input
                        label='old password'
                        placeholder='please enter old password'
                        icon='unlock'
                        type='password'
                        name='oldPassword'
                        value={formik.values.oldPassword}
                        onChange={formik.handleChange}
                    />
                    <Form.Input
                        label='new password'
                        placeholder='please enter new password'
                        icon='unlock'
                        type='password'
                        name='newPassword'
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                    />
                    <Form.Input
                        label='new password re-enter'
                        placeholder='please enter new password again'
                        icon='lock'
                        name='confirmPassword'
                        type='password'
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                    />
                </Form.Group>
                <Button type='submit' inverted color='red'>Apply</Button>
            </Form>
        </Container>
    )
}
