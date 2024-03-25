import React, { useContext, useState } from 'react'
import { Button, Container, Form, Header, Icon, Message, Segment } from 'semantic-ui-react'
import { UserContext } from '../../contexts/UserProvider';
import EmployerService from '../../services/employerService';
import { useFormik } from 'formik';

export default function EmployerInformation() {

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
        <Segment raised>
            <Header as='h4' disabled dividing>
                <Icon name='user outline' />
                <Header.Content>Company Information</Header.Content>
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
                        name='companyName'
                        icon='industry'
                        label='company name'
                        placeholder='please enter company name'
                        onChange={(event, data) => handleChange("companyName", data.value)}
                        value={formik.values.companyName} />
                    <Form.Input
                        name='webSiteName'
                        icon='globe'
                        label='web site name'
                        placeholder='web site name'
                        onChange={(event, data) => handleChange("webSiteName", data.value)}
                        value={formik.values.webSiteName} />
                    <Form.Input
                        name='companyMail'
                        icon='at'
                        label='company mail'
                        placeholder='please enter company mail'
                        onChange={(event, data) => handleChange("companyMail", data.value)}
                        value={formik.values.companyMail} />
                </Form.Group>
                <Form.Group>
                    <Form.TextArea
                        name='companyDescription'
                        label='company description'
                        placeholder='please enter company description..'
                        onChange={(event, data) => handleChange("companyDescription", data.value)}
                        value={formik.values.companyDescription} />
                </Form.Group>
                <Button inverted color='red' type='submit'>Apply</Button>
            </Form>
        </Segment>
    )
}
