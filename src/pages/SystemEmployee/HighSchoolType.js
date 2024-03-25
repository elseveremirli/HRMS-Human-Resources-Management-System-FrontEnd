import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Grid, Header, Icon, Label, Segment, Table } from 'semantic-ui-react'
import { Formik, useFormik } from 'formik';
import * as Yup from "yup";
import MessageModal from '../../layouts/Dashboard/MessageModal';
import HighSchoolTypeService from '../../services/highSchoolTypeService';

function HighSchoolType() {

  const [highSchoolTypes, setHighSchools] = useState([]);
  const [open, setOpen] = useState(false);

  let highSchoolTypeService = new HighSchoolTypeService();

  useEffect(() => {
    let highSchoolTypeService = new HighSchoolTypeService();

    highSchoolTypeService.getAllHighSchoolType().then((result => setHighSchools(result.data.data)))
  }, []);

  const initialValues = {
    highSchoolType: "",
  };

  const validationSchema = Yup.object({
    highSchoolType: Yup.string().required("required field"),
  });

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    highSchoolTypeService.addHighSchoolType(values);
    handleModal(true);
    setTimeout(() => {
      resetForm();
    }, 100);
    refreshPage();
  };

  const handleDelete = async (id) => {
    let highSchoolTypeService = new HighSchoolTypeService();
    console.log(id);
    highSchoolTypeService.deleteHighSchoolType(id);
    handleModal(true);
    refreshPage();
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
                {highSchoolTypes.map((highSchoolType) => (
                  <Table.Row>
                    <Table.Cell>{highSchoolType.highSchoolType}</Table.Cell>
                    <Table.Cell textAlign='right'>
                      <Button icon inverted color="red">
                        <Icon name='pencil' />
                      </Button>
                      <Button icon inverted color="red" onClick={() => handleDelete(highSchoolType.id)}>
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
                <Icon name='graduation cap' />  Add High School Type
              </Header>
              <Formik>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Input
                    name='highSchoolType'
                    placeholder='please enter highSchoolType...'
                    onChange={(event, data) => handleChange("highSchoolType", data.value)}
                    value={formik.values.highSchoolType}
                  />
                  {formik.errors.highSchoolType && formik.touched.highSchoolType && <span><Label basic pointing color="red" content={formik.errors.highSchoolType} /><br /></span>}
                  <Button inverted color="red" type="submit" content="Add">Add</Button>
                </Form>
              </Formik>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <MessageModal onClose={() => handleModal(false)} onOpen={() => handleModal(true)} open={open} content="changes are saved." />
    </Container >
  )
}

export default HighSchoolType;