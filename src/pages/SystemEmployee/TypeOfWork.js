import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Grid, Header, Icon, Label, Segment, Table } from 'semantic-ui-react'
import WorkTypeService from '../../services/workTypeService';
import { Formik, useFormik } from 'formik';
import * as Yup from "yup";
import MessageModal from '../../layouts/Dashboard/MessageModal';

function TypeOfWork() {

  const [typeOfWorks, setTypeOfWorks] = useState([]);
  const [open, setOpen] = useState(false);

  let workTypeService = new WorkTypeService();

  useEffect(() => {
    let workTypeService = new WorkTypeService();

    workTypeService.getAllWorkType().then((result => setTypeOfWorks(result.data.data)))
  }, []);

  const initialValues = {
    typeOfWork: "",
  };

  const validationSchema = Yup.object({
    typeOfWork: Yup.string().required("required field"),
  });

  function refreshPage() {
    window.location.reload();
  }

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    workTypeService.addWorkType(values);
    handleModal(true);
    setTimeout(() => {
      resetForm();
    }, 100);
    refreshPage()
  };

  const handleDelete = async (id) => {
    let workTypeService = new WorkTypeService();
    console.log(id);
    workTypeService.deleteWorkType(id);
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
                {typeOfWorks.map((typeOfWork) => (
                  <Table.Row>
                    <Table.Cell>{typeOfWork.typeOfWork}</Table.Cell>
                    <Table.Cell textAlign='right'>
                      <Button icon inverted color="red">
                        <Icon name='pencil' />
                      </Button>
                      <Button icon inverted color="red" onClick={() => handleDelete(typeOfWork.typeOfWorkId)}>
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
                <Icon name='world' />  Add Type Of Work
              </Header>
              <Formik>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Input
                    name='typeOfWork'
                    placeholder='please enter typeOfWork...'
                    onChange={(event, data) => handleChange("typeOfWork", data.value)}
                    value={formik.values.typeOfWork}
                  />
                  {formik.errors.typeOfWork && formik.touched.typeOfWork && <span><Label basic pointing color="red" content={formik.errors.typeOfWork} /><br /></span>}
                  <Button inverted color="red" type="submit" content="Add" onClick={refreshPage}>Add</Button>
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

export default TypeOfWork;