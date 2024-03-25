import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Grid, Header, Icon, Label, Segment, Table } from 'semantic-ui-react'
import MilitaryStatuService from '../../services/militaryStatuService';
import { Formik, useFormik } from 'formik';
import * as Yup from "yup";
import MessageModal from '../../layouts/Dashboard/MessageModal';

function MilitaryStatu() {

  const [militaryStatus, setMilitaryStatus] = useState([]);
  const [open, setOpen] = useState(false);

  let militaryStatuService = new MilitaryStatuService();

  useEffect(() => {
    let militaryStatuService = new MilitaryStatuService();

    militaryStatuService.getAllMilitaryStatu().then((result => setMilitaryStatus(result.data.data)))
  }, []);

  const initialValues = {
    militaryStatuName: "",
  };

  const validationSchema = Yup.object({
    militaryStatuName: Yup.string().required("required field"),
  });

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    militaryStatuService.addMilitaryStatu(values);
    handleModal(true);
    setTimeout(() => {
      resetForm();
    }, 100);
    refreshPage()
  };

  const handleDelete = async (id) => {
    let militaryStatuService = new MilitaryStatuService();
    console.log(id);
    militaryStatuService.deleteMilitaryStatu(id);
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
                {militaryStatus.map((militaryStatu) => (
                  <Table.Row>
                    <Table.Cell>{militaryStatu.militaryStatuName}</Table.Cell>
                    <Table.Cell textAlign='right'>
                      <Button icon inverted color="red">
                        <Icon name='pencil' />
                      </Button>
                      <Button icon inverted color="red" onClick={() => handleDelete(militaryStatu.militaryStatuId)}>
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
                <Icon name='fighter jet' />  Add military Statu
              </Header>
              <Formik>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Input
                    name='militaryStatuName'
                    placeholder='please enter militaryStatu...'
                    onChange={(event, data) => handleChange("militaryStatuName", data.value)}
                    value={formik.values.militaryStatuName}
                  />
                  {formik.errors.militaryStatuName && formik.touched.militaryStatuName && <span><Label basic pointing color="red" content={formik.errors.militaryStatuName} /><br /></span>}
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

export default MilitaryStatu;