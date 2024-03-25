import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form, Grid, Header, Icon, Label, Segment, Table } from 'semantic-ui-react';
import AbilityService from '../../services/abilityService';
import * as Yup from "yup";
import { Formik, useFormik } from 'formik';
import MessageModal from '../../layouts/Dashboard/MessageModal';
import { UserContext } from '../../contexts/UserProvider';

function Ability() {

    const { user } = useContext(UserContext)
    const [abilities, setAbilities] = useState([])
    const [open, setOpen] = useState([])
    const [jobSeeker, setJobSeeker] = useState([])

    let abilityService = new AbilityService();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await abilityService.getByJobSeekerId(user?.data?.id).then((result) => setAbilities(result.data.data));
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

const initialValues = {
    abilityName: "",
    jobSeekerId: (user?.data?.id),
}

const validationSchema = Yup.object({
    abilityName: Yup.string().required("required field"),
})

function refreshPage() {
    window.location.reload();
}

const onSubmit = (values, { resetForm }) => {
    console.log(values);
    abilityService.addAbility(values);
    handleModal(true);
    setTimeout(() => {
        resetForm();
    }, 100);
    //refreshPage();
};

const handleDelete = async (id) => {
    console.log(id);
    abilityService.deleteAbility(id);
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
                <Icon name='flag checkered' />
                <Header.Content>Abilities</Header.Content>
            </Header>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Formik>
                            <Form dividing onSubmit={formik.handleSubmit}>
                                <Form.Input
                                    label='Ability'
                                    name='abilityName'
                                    placeholder='please enter your ability..'
                                    onChange={(event, data) => handleChange("abilityName", data.value)}
                                    value={formik.values.abilityName}
                                />
                                {formik.errors.abilityName && formik.touched.abilityName && <span><Label basic pointing color="red" content={formik.errors.abilityName} /><br /></span>}
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
                                    <Table.HeaderCell colSpan='2'>Your Abilities</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {abilities.map((ability) =>
                                    <Table.Row>
                                        <Table.Cell>{ability.abilityName}</Table.Cell>
                                        <Table.Cell textAlign='right'>
                                            <Button icon inverted color="red">
                                                <Icon name='pencil' />
                                            </Button>
                                            <Button icon inverted color="red"
                                                onClick={() => handleDelete(ability.id)}>
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
