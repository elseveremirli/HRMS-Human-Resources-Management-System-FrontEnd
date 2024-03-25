import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form, Grid, Header, Icon, Label, Segment, Table } from 'semantic-ui-react';
import LanguageInfoService from '../../services/languageInfoService';
import * as Yup from "yup";
import { Formik, useFormik } from 'formik';
import LanguageService from '../../services/languageService';
import { UserContext } from '../../contexts/UserProvider';

function Ability() {

    const { user } = useContext(UserContext)
    const [languageInfos, setLanguageInfos] = useState([])
    const [languages, setLanguages] = useState([])
    const [open, setOpen] = useState([])
    const [jobSeeker, setJobSeeker] = useState([])

    let languageInfoService = new LanguageInfoService();
    let languageService = new LanguageService();

    useEffect(() => {
        languageService.getAllLanguage().then((result) => setLanguages(result.data.data));
        const fetchUser = async () => {
            try {
                const response = await languageInfoService.getByJobSeekerId(user?.data?.id).then((result) => setLanguageInfos(result.data.data));
                setJobSeeker(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const userId = user?.data?.id;

        if (userId) {
            fetchUser();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.data?.id]);

    const languageOptions = languages.map((language) => ({
        key: language.languageId,
        text: language.language,
        value: language,
    }));

    const initialValues = {
        language: "",
        jobSeekerId: (user?.data?.id),
    }

    const validationSchema = Yup.object({
        language: Yup.object().required("required field"),
    })

    function refreshPage() {
        window.location.reload();
    }

    const onSubmit = (values, { resetForm }) => {
        console.log(values);
        languageInfoService.addLanguage({
            jobSeekerId: values.jobSeekerId, 
            languageId:Number(values.language.languageId)} );
        handleModal(true);
        setTimeout(() => {
            resetForm();
        }, 100);
        refreshPage();
    };

    const handleDelete = async (id) => {
        console.log(id);
        languageInfoService.deleteLanguageInfo(id);
        refreshPage();
    }

    const handleModal = (value) => {
        setOpen(value);
    };

    const handleChange = (fieldName, value) => {
        formik.setFieldValue(fieldName, value);
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    });


    return (
        <Container>
            <Segment>
                <Header as='h3' disabled dividing>
                    <Icon name='puzzle' />
                    <Header.Content>Your Language Info's</Header.Content>
                </Header>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Formik>
                                <Form dividing onSubmit={formik.handleSubmit}>
                                    <Form.Select
                                        name="language"
                                        label='Language'
                                        placeholder="select language."
                                        options={languageOptions}
                                        onChange={(event, data) => handleChange("language", data.value)}
                                        value={formik.values.language}
                                    />
                                    {formik.errors.language && formik.touched.language && <span><Label basic pointing color="red" content={formik.dirtyerrors.language} /><br /></span>}
                                    <Button animated='fade' inverted color='red' type='submit'>
                                        <Button.Content visible>Add</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='thumbtack' />
                                        </Button.Content>
                                    </Button>
                                </Form>
                            </Formik>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Table striped>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell colSpan='2'>Your Known Language </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {languageInfos.map((languageInfo) =>
                                        <Table.Row>
                                            <Table.Cell>{languageInfo.language}</Table.Cell>
                                            <Table.Cell textAlign='right'>
                                                <Button icon inverted color="red">
                                                    <Icon name='pencil' />
                                                </Button>
                                                <Button icon inverted color="red"
                                                    onClick={() => handleDelete(languageInfo.languageInfoId)}>
                                                    <Icon name='cancel' />
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
               
            </Segment>
        </Container>
    )
}
export default Ability;
