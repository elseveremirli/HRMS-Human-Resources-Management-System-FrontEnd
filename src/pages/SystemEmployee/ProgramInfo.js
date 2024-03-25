import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Grid, Header, Icon, Label, Segment, Table } from 'semantic-ui-react'
import { Formik, useFormik } from 'formik';
import * as Yup from "yup";
import MessageModal from '../../layouts/Dashboard/MessageModal';
import ProgramInfoService from '../../services/programInfoService'

function ProgramInfo() {

  const [programs, setPrograms] = useState([]);
  const [open, setOpen] = useState(false);

  let programInfoService = new ProgramInfoService();

  useEffect(() => {
    let programInfoService = new ProgramInfoService();

    programInfoService.getAllProgramInfo().then((result => setPrograms(result.data.data)))
  }, []);

  const initialValues = {
    program: "",
  };

  const validationSchema = Yup.object({
    program: Yup.string().required("required field"),
  });

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    programInfoService.addProgramInfo(values);
    handleModal(true);
    setTimeout(() => {
      resetForm();
    }, 100);
    refreshPage()
  };

  const handleDelete = async (id) => {
    let programInfoService = new ProgramInfoService();
    console.log(id);
    programInfoService.deleteProgramInfo(id);
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
                {programs.map((program) => (
                  <Table.Row>
                    <Table.Cell>{program.program}</Table.Cell>
                    <Table.Cell textAlign='right'>
                    <Button icon inverted color="red">
                        <Icon name='pencil' />
                      </Button>
                      <Button icon inverted color="red" onClick={() => handleDelete(program.programId)}>
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
                <Icon name='book' />  Add Program Info
              </Header>
              <Formik>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Input
                    name='positionLevel'
                    placeholder='please enter program info...'
                    onChange={(event, data) => handleChange("program", data.value)}
                    value={formik.values.program}
                  />
                  {formik.errors.program && formik.touched.program && <span><Label basic pointing color="red" content={formik.errors.program} /><br /></span>}
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

export default ProgramInfo;