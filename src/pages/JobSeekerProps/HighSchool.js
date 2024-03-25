import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form, Grid, Header, Icon, Segment, Table } from 'semantic-ui-react'
import HighSchoolTypeService from '../../services/highSchoolTypeService'
import ProgramInfoService from '../../services/programInfoService'
import HighSchoolService from '../../services/highSchoolService'
import * as Yup from "yup";
import { Formik, useFormik } from 'formik'
import { UserContext } from '../../contexts/UserProvider'

function HighSchool() {

    const { user } = useContext(UserContext)
    const [open, setOpen] = useState([])
    const [highSchoolTypes, setHighSchoolTypes] = useState([])
    const [highSchools, setHighSchools] = useState([])
    const [programs, setPrograms] = useState([])
    const [jobSeeker, setJobSeeker] = useState([])

    let highSchoolTypeService = new HighSchoolTypeService()
    let programInfoService = new ProgramInfoService()
    let highSchoolService = new HighSchoolService()

    useEffect(() => {
        highSchoolTypeService.getAllHighSchoolType().then((result) => setHighSchoolTypes(result.data.data));
        programInfoService.getAllProgramInfo().then((result) => setPrograms(result.data.data));

        const fetchUser = async () => {
            try {
                const response = await highSchoolService.getByJobSeekerId(user?.data?.id).then((result) => setHighSchools(result.data.data));
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

    const programOptions = programs.map((program) => ({
        key: program.programId,
        text: program.programName,
        value: program,
    }));

    const highSchoolTypeOptions = highSchoolTypes.map((highSchoolType) => ({
        key: highSchoolType.id,
        text: highSchoolType.highSchoolType,
        value: highSchoolType,
    }));

    const initialValues = {
        jobSeekerId: (user?.data?.id),
        highSchoolName: "",
        highSchoolType: "",
        program: "",
        startedDate: "",
        graduationDate: "",
    };

    const validationSchema = Yup.object({
        highSchoolName: Yup.string().required("required field"),
        highSchoolType: Yup.object().required("required field"),
        program: Yup.object().required("required field"),
        startedDate: Yup.date().required("required field"),
        graduationDate: Yup.date(),
    })

    function refreshPage() {
        window.location.reload();
    }

    const onSubmit = (values, { resetForm }) => {
        console.log(values);
        highSchoolService.addHighSchoolInfo({
            jobSeekerId: values.jobSeekerId,
            highSchoolName: values.highSchoolName,
            highSchoolType: Number(values.highSchoolType.id),
            program: Number(values.program.programId),
            startedDate: values.startedDate,
            graduationDate: values.graduationDate,
        });
        handleModal(true);
        setTimeout(() => {
            resetForm();
        }, 100);
        //refreshPage();
    };

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
                    <Icon name='graduation cap' />
                    <Header.Content>High School History</Header.Content>
                </Header>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Formik>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Form.Group widths="equal">
                                        <Form.Input
                                            name="highSchoolName"
                                            icon="graduation"
                                            label="High School Name"
                                            placeholder="please enter high school name here."
                                            onChange={(event, data) => handleChange("highSchoolName", data.value)}
                                            value={formik.values.highSchoolName}
                                        />
                                    </Form.Group>
                                    <Form.Group widths="equal">
                                        <Form.Select
                                            name="highSchoolType"
                                            label="High School Type"
                                            placeholder='select high school type.'
                                            options={highSchoolTypeOptions}
                                            onChange={(event, data) => handleChange("highSchoolType", data.value)}
                                            value={formik.values.highSchoolType}
                                        />
                                        <Form.Select
                                            name="program"
                                            label="Program"
                                            placeholder='select program.'
                                            options={programOptions}
                                            onChange={(event, data) => handleChange("program", data.value)}
                                            value={formik.values.program.id}
                                        />
                                    </Form.Group>
                                    <Form.Group widths="equal">
                                        <Form.Input
                                            name="startedDate"
                                            icon="cogs"
                                            label="Started Date"
                                            placeholder="started day(only year - YYYY)"
                                            onChange={(event, data) => handleChange("startedDate", data.value)}
                                            value={formik.values.startedDate}
                                        />
                                        <Form.Input
                                            name="graduationDate"
                                            label="Graduation Date"
                                            icon="cog"
                                            placeholder="graduation day(only year - YYYY)"
                                            onChange={(event, data) => handleChange("graduationDate", data.value)}
                                            value={formik.values.graduationDate}
                                        />
                                    </Form.Group>
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
                                        <Table.HeaderCell collSpan='6'>
                                            Your High School History
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                {/* <Table.Body>
                                    {highSchools.map((highSchool) => 
                                    <Table.Row key={highSchool.highSchoolId}>
                                        <Table.Cell>{highSchool.highSchoolName}</Table.Cell>
                                        <Table.Cell>{highSchool.highSchoolType}</Table.Cell>
                                        <Table.Cell>{highSchool.program}</Table.Cell>
                                        <Table.Cell>{highSchool.startedDate}</Table.Cell>
                                        <Table.Cell>{highSchool.graduationDate}</Table.Cell>
                                    </Table.Row>
                                    )}
                                </Table.Body> */}
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Container>
    )
}
export default HighSchool;
