import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Grid, Header, Icon, Label, Segment, Table } from 'semantic-ui-react'
import SectorService from '../../services/sectorService';
import { Formik, useFormik } from 'formik';
import * as Yup from "yup";
import MessageModal from '../../layouts/Dashboard/MessageModal';

function SectorList() {

  const [sectors, setSectors] = useState([]);
  const [open, setOpen] = useState(false);

  let sectorService = new SectorService();

  useEffect(() => {
    let sectorService = new SectorService();

    sectorService.getSectors().then((result => setSectors(result.data.data)))
  }, []);

  const initialValues = {
    sector: "",
  };

  const validationSchema = Yup.object({
    sector: Yup.string().required("required field"),
  });

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    sectorService.addSector(values);
    handleModal(true);
    setTimeout(() => {
      resetForm();
    }, 100);
    refreshPage();
  };

  const handleDelete = async (id) => {
    let sectorService = new SectorService();
    console.log(id);
    sectorService.deleteSector(id);
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
                {sectors.map((sector) => (
                  <Table.Row>
                    <Table.Cell>{sector.sector}</Table.Cell>
                    <Table.Cell textAlign='right'>
                      <Button icon basic color="red" onClick={() => handleDelete(sector.id)}>
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
                <Icon name='archive' />  Add Sector
              </Header>
              <Formik>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Input
                    name='sector'
                    placeholder='please enter sector...'
                    onChange={(event, data) => handleChange("sector", data.value)}
                    value={formik.values.sector}
                  />
                  {formik.errors.sector && formik.touched.sector && <span><Label basic pointing color="red" content={formik.errors.sector} /><br /></span>}
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

export default SectorList;