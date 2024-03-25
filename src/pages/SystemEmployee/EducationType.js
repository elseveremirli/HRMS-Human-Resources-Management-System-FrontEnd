import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Grid, Header, Icon, Label, Segment, Table } from 'semantic-ui-react'
import EducationTypeService from '../../services/educationTypeService'
import * as Yup from "yup";
import { Formik, useFormik } from 'formik';

function EducationType() {

    const [educationTypes, setEducationTypes] = useState([]);
    const [open, setOpen] = useState(false);

    let educationTypeService = new EducationTypeService();

    useEffect(() => {
        let educationTypeService = new EducationTypeService();

        educationTypeService.getAllEducationType().then((result => setEducationTypes(result.data.data)))
    }, []);

    const initialValues = {
        educationType: "",
    };

    const validationSchema = Yup.object({
        educationType: Yup.string().required("Required Field"),
    });

    const onSubmit = (values, { resetForm }) => {
        console.log(values);
        educationTypeService.addEducationType(values);
        handleModal(true);
        setTimeout(() => {
            resetForm();
        }, 100);
       refreshPage()
    };

    const handleDelete = async (id) => {
        console.log(id);
        educationTypeService.deleteEducationType(id);
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
        <Container style={{ margin: '1em'}}>
            <Container style={{ margin: "1em" }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Table singleLine>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Education Type</Table.HeaderCell>
                                        <Table.HeaderCell></Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {educationTypes.map((educationType) => (
                                        <Table.Row>
                                            <Table.Cell>{educationType.educationTypeName}</Table.Cell>
                                            <Table.Cell textAlign='right'>
                                                <Button icon inverted color="red">
                                                    <Icon name='pencil' />
                                                </Button>
                                                <Button icon inverted color="red" onClick={() => handleDelete(educationType.educationTypeId)}>
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
                                    <Icon name='graduation cap' />  Add Education Type
                                </Header>
                                <Formik>
                                    <Form onSubmit={formik.handleSubmit}>
                                        <Form.Input
                                            name='educationType'
                                            placeholder='please enter language...'
                                            onChange={(event, data) => handleChange("educationType", data.value)}
                                            value={formik.values.educationType}
                                        />
                                        {formik.errors.educationType && formik.touched.educationType && <span><Label basic pointing color="red" content={formik.errors.educationType} /><br /></span>}
                                        <Button inverted color="red" type="submit" content="Add">Add</Button>
                                    </Form>
                                </Formik>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Container>
    )
}
export default EducationType;