import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Grid, Header, Icon, Label, Segment, Table } from 'semantic-ui-react'
import { Formik, useFormik } from 'formik';
import * as Yup from "yup";
import MessageModal from '../../layouts/Dashboard/MessageModal';
import PositionLevelService from '../../services/positionLevelService'

function PositionLevel() {

  const [positionLevels, setPositionLevels] = useState([]);
  const [open, setOpen] = useState(false);

  let positionLevelService = new PositionLevelService();

  useEffect(() => {
    let positionLevelService = new PositionLevelService();

    positionLevelService.getAllPositionLevel().then((result => setPositionLevels(result.data.data)))
  }, []);

  const initialValues = {
    positionLevelName: "",
  };

  const validationSchema = Yup.object({
    positionLevelName: Yup.string().required("required field"),
  });

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    positionLevelService.addPositionLevel(values);
    handleModal(true);
    setTimeout(() => {
      resetForm();
    }, 100);
    refreshPage()
  };

  const handleDelete = async (id) => {
    let positionLevelService = new PositionLevelService();
    console.log(id);
    positionLevelService.deletePositionLevel(id);
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
                {positionLevels.map((positionLevel) => (
                  <Table.Row>
                    <Table.Cell>{positionLevel.positionLevelName}</Table.Cell>
                    <Table.Cell textAlign='right'>
                    <Button icon inverted color="red">
                        <Icon name='pencil' />
                      </Button>
                      <Button icon inverted color="red" onClick={() => handleDelete(positionLevel.positionLevelId)}>
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
                <Icon name='cogs' />  Add Position Level
              </Header>
              <Formik>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Input
                    name='positionLevel'
                    placeholder='please enter position Level...'
                    onChange={(event, data) => handleChange("positionLevelName", data.value)}
                    value={formik.values.positionLevelName}
                  />
                  {formik.errors.positionLevelName && formik.touched.positionLevelName && <span><Label basic pointing color="red" content={formik.errors.positionLevelName} /><br /></span>}
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

export default PositionLevel;