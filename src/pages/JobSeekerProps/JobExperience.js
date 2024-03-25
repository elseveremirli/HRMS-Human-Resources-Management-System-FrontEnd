import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form, Grid, Header, Icon, Segment, Table } from 'semantic-ui-react'
import JobExperienceService from '../../services/jobExperienceService'
import CityService from '../../services/cityService';
import SectorService from '../../services/sectorService';
import * as Yup from "yup";
import { Formik, useFormik } from 'formik';
import { UserContext } from '../../contexts/UserProvider';


export default function JobExperience() {

    const [jobExperiences, setJobExperiences] = useState([]);
    const [cities, setCities] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [open, setOpen] = useState([])
    const [jobSeeker, setJobSeeker] = useState([])
    const { user } = useContext(UserContext);

    let jobExperienceService = new JobExperienceService();
    let cityService = new CityService();
    let sectorService = new SectorService();

    useEffect(() => {
        cityService.getAllCity().then((result) => setCities(result.data.data));
        sectorService.getSectors().then((result) => setSectors(result.data.data));

        const fetchUser = async () => {
            try {
                const response = await jobExperienceService.getByJobSeekerId(user?.data?.id).then((result) => setJobExperiences(result.data.data));
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

    const sectorOptions = sectors.map((sector) => ({
        key: sector.id,
        text: sector.sector,
        value: sector,
    }));

    const cityOptions = cities.map((city) => ({
        key: city.id,
        text: city.cityName,
        value: city,
    }));

    const initialValues = {
        companyName: "",
        position: "",
        jobDescription: "",
        city: "",
        startedDate: "",
        endDate: "",
        sector: "",
        jobSeekerId: (user?.data?.id),
    };

    const validationSchema = Yup.object({
        companyName: Yup.string().required("required field"),
        position: Yup.string().required("required field"),
        jobDescription: Yup.string().required("required field"),
        city: Yup.object().required("required field"),
        startedDate: Yup.date().required("required field"),
        endDate: Yup.date(),
        sector: Yup.object().required("required field"),
    })

    function refreshPage() {
        window.location.reload();
    }

    const onSubmit = (values, { resetForm }) => {
        console.log(values);
        jobExperienceService.addJobExperience({
            jobSeeker: values.jobSeekerId,
            companyName: values.companyName,
            position: values.position,
            jobDescription: values.jobDescription,
            city: Number(values.city.id),
            startedDate: values.startedDate,
            endDate: values.endDate,
            sector: Number(values.sector.id),
        });
        handleModal(true);
        setTimeout(() => {
            resetForm();
        }, 100);
        refreshPage();
    };

    const handleDelete = async (id) => {
        console.log(id);
        jobExperienceService.deleteJobExperience(id);
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
                    <Icon name='history' />
                    <Header.Content>Your Job Experiences</Header.Content>
                </Header>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Formik>
                                <Form dividing onSubmit={formik.handleSubmit}>
                                    <Form.Group widths='equal'>
                                        <Form.Input
                                            name='companyName'
                                            label='Company Name'
                                            icon='industry'
                                            placeholder='company name (exp: kodlama.io)'
                                            onChange={(event, data) => handleChange("companyName", data.value)}
                                            value={formik.values.companyName}
                                        />
                                        <Form.Input
                                            name='position'
                                            label='Position'
                                            icon='sitemap'
                                            placeholder='position (exp: java developer)'
                                            onChange={(event, data) => handleChange("position", data.value)}
                                            value={formik.values.position}
                                        />
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.TextArea
                                            name='jobDescription'
                                            label='Job Description'
                                            icon='chess board'
                                            placeholder='job description (exp: what did you do in the company? or what is your role?)'
                                            onChange={(event, data) => handleChange("jobDescription", data.value)}
                                            value={formik.values.jobDescription}
                                        />
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Input
                                            name='startedDate'
                                            label='Started-Day'
                                            icon='cogs'
                                            placeholder='started date (exp: yyyy-mm-dd)'
                                            onChange={(event, data) => handleChange("startedDate", data.value)}
                                            value={formik.values.startedDate}
                                        />
                                        <Form.Input
                                            name='endDate'
                                            label='End-Day'
                                            icon='cog'
                                            placeholder='end date (exp: yyyy-mm-dd)'
                                            onChange={(event, data) => handleChange("endDate", data.value)}
                                            value={formik.values.endDate}
                                        />
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Select
                                            name='city'
                                            label='City'
                                            placeholder='select city'
                                            options={cityOptions}
                                            onChange={(event, data) => handleChange("city", data.value)}
                                            value={formik.values.city.cityId}
                                        />
                                        <Form.Select
                                            name='sector'
                                            label='Sector'
                                            placeholder='select sector'
                                            options={sectorOptions}
                                            onChange={(event, data) => handleChange("sector", data.value)}
                                            value={formik.values.sector.sectorId}
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
                                        <Table.HeaderCell colSpan='8'>Your Job Experiences</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {jobExperiences.map((jobExperience) => (
                                        <Table.Row key={jobExperience.experienceId}>
                                            <Table.Cell>{jobExperience.companyName}</Table.Cell>
                                            <Table.Cell>{jobExperience.position}</Table.Cell>
                                            <Table.Cell>{jobExperience.jobDescription}</Table.Cell>
                                            <Table.Cell>{jobExperience.cityName}</Table.Cell>
                                            <Table.Cell>{jobExperience.startedDate}</Table.Cell>
                                            <Table.Cell>{jobExperience.endDate}</Table.Cell>
                                            <Table.Cell>{jobExperience.sectorName}</Table.Cell>
                                            <Table.Cell textAlign='right'>
                                                <Button icon inverted color="red">
                                                    <Icon name='pencil' />
                                                </Button>
                                                <Button
                                                    icon
                                                    inverted
                                                    color="red"
                                                    onClick={() => handleDelete(jobExperience.experienceId)}
                                                >
                                                    <Icon name='cancel' />
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Container>

    )
}
