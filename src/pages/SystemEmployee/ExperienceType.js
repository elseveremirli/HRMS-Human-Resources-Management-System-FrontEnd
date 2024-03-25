import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Grid, Header, Icon, Label, Segment, Table } from 'semantic-ui-react';
import ExperienceService from '../../services/experienceService';
import * as Yup from "yup";
import { Formik, useFormik } from 'formik';

function ExperienceType() {

    const [experiences, setExperiences] = useState([])
    const [open, setOpen] = useState([])

    let experienceService = new ExperienceService();

    useEffect(() => {
        experienceService.getAllExperience().then((result) => setExperiences(result.data.data));
    }, []);

    const initialValues = {
        experienceName:"",
    }

    const validationSchema = Yup.object({
        experienceName: Yup.string().required("required field"),
    })

    function refreshPage() {
        window.location.reload();
    }

    const onSubmit = (values, { resetForm }) => {
        console.log(values);
        experienceService.addExperience(values);
        handleModal(true);
        setTimeout(() => {
            resetForm();
        }, 100);
        refreshPage();
    };

    const handleDelete = async (id) => {
        console.log(id);
        experienceService.deleteExperience(id);
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
        <Container style={{ margin: "1em"}}>
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
                    {experiences.map((experience) => (
                      <Table.Row>
                        <Table.Cell>{experience.experienceName}</Table.Cell>
                        <Table.Cell textAlign='right'>
                        <Button icon inverted color="red">
                            <Icon name='pencil' />
                          </Button>
                          <Button icon inverted color="red" onClick={() => handleDelete(experience.experienceTypeId)}>
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
                    <Icon name='certificate' />  Add Experience
                  </Header>
                  <Formik>
                    <Form onSubmit={formik.handleSubmit}>
                      <Form.Input
                        name='experienceName'
                        placeholder='please enter experience...'
                        onChange={(event, data) => handleChange("experienceName", data.value)}
                        value={formik.values.experienceName}
                      />
                      {formik.errors.experienceName && formik.touched.experienceName && <span><Label basic pointing color="red" content={formik.errors.experienceName} /><br /></span>}
                      <Button inverted color="red" type="submit" content="Add">Add</Button>
                    </Form>
                  </Formik>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container >
      )
}
export default ExperienceType;
