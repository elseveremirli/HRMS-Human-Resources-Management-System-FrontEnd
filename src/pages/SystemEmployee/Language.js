import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Grid, Header, Icon, Label, Segment, Table } from 'semantic-ui-react'
import LanguageService from '../../services/languageService'
import * as Yup from "yup";
import { Formik, useFormik } from 'formik';
import MessageModal from '../../layouts/Dashboard/MessageModal';

function Language() {

    const [languages, setLanguages] = useState([]);
    const [open, setOpen] = useState(false);

    let languageService = new LanguageService();

    useEffect(() => {
        let languageService = new LanguageService();

        languageService.getAllLanguage().then((result => setLanguages(result.data.data)))
    }, []);

    const initialValues = {
        language: "",
    };

    const validationSchema = Yup.object({
        language: Yup.string().required("Required Field"),
    });

    const onSubmit = (values, { resetForm }) => {
        console.log(values);
        languageService.addLanguage(values);
        handleModal(true);
        setTimeout(() => {
            resetForm();
        }, 100);
        refreshPage()
    };

    const handleDelete = async (id) => {
        let languageService = new LanguageService();
        console.log(id);
        languageService.deleteLanguage(id);
        handleModal(true);
        refreshPage()
    }

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
        <Container style={{ margin: '1em' }}>
            <Container style={{ margin: "1em" }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Table singleLine>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Name</Table.HeaderCell>
                                        <Table.HeaderCell></Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {languages.map((language) => (
                                        <Table.Row>
                                            <Table.Cell>{language.language}</Table.Cell>
                                            <Table.Cell textAlign='right'>
                                                <Button icon inverted color="red">
                                                    <Icon name='pencil' />
                                                </Button>
                                                <Button icon inverted color="red" onClick={() => handleDelete(language.languageId)}>
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
                                    <Icon name='hand lizard outline' />  Add Language
                                </Header>
                                <Formik>
                                    <Form onSubmit={formik.handleSubmit}>
                                        <Form.Input
                                            name='language'
                                            placeholder='please enter language...'
                                            onChange={(event, data) => handleChange("language", data.value)}
                                            value={formik.values.language}
                                        />
                                        {formik.errors.language && formik.touched.language && <span><Label basic pointing color="red" content={formik.errors.language} /><br /></span>}
                                        <Button inverted color="red" type="submit" content="Add">Add</Button>
                                    </Form>
                                </Formik>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <MessageModal onClose={() => handleModal(false)} onOpen={() => handleModal(true)} open={open} content="changes are saved." />
            </Container>
        </Container>
    )
}
export default Language;