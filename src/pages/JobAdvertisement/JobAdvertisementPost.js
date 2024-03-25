import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Divider, Form, Grid, Header, Icon, Segment } from 'semantic-ui-react'
import { Formik, useFormik } from "formik";
import SectorService from '../../services/sectorService';
import PositionLevelService from '../../services/positionLevelService';
import EducationTypeService from '../../services/educationTypeService';
import JobService from '../../services/jobService';
import CityService from '../../services/cityService';
import MilitaryStatuService from '../../services/militaryStatuService';
import WorkTypeService from '../../services/workTypeService';
import ExperienceService from '../../services/experienceService';
import JobAdvertisementService from '../../services/jobAdvertisementService';
import moment from 'moment';
import * as Yup from 'yup';
import MessageModal from '../../layouts/Dashboard/MessageModal';
import { UserContext } from '../../contexts/UserProvider';

export default function JobAdvertisementPost() {

    const { user } = useContext(UserContext)

    const [sectors, setSectors] = useState([]);
    const [positionLevels, setPositionLevels] = useState([]);
    const [educationTypes, setEducationType] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [cities, setCities] = useState([]);
    const [militaryStatus, setMilitaryStatus] = useState([]);
    const [typeOfWorks, setTypeOfWorks] = useState([]);
    const [experiences, setExperiences] = useState([]);

    const [open, setOpen] = React.useState(false);

    let jobAdvertisementService = new JobAdvertisementService();
    let sectorService = new SectorService();
    let positionLevelService = new PositionLevelService();
    let educationTypeService = new EducationTypeService();
    let jobService = new JobService();
    let cityService = new CityService();
    let militaryStatuService = new MilitaryStatuService();
    let workTypeService = new WorkTypeService();
    let experienceService = new ExperienceService();

    useEffect(() => {
        sectorService.getSectors().then((result) => { setSectors(result.data.data); });

        positionLevelService.getAllPositionLevel().then((result) => { setPositionLevels(result.data.data); })

        educationTypeService.getAllEducationType().then((result) => { setEducationType(result.data.data); })

        jobService.getAllJob().then((result) => { setJobs(result.data.data); });

        cityService.getAllCity().then((result) => { setCities(result.data.data); })

        militaryStatuService.getAllMilitaryStatu().then((result) => { setMilitaryStatus(result.data.data); })

        workTypeService.getAllWorkType().then((result) => { setTypeOfWorks(result.data.data); })

        experienceService.getAllExperience().then((result) => { setExperiences(result.data.data); })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const sectorOptions = sectors.map((sector) => ({
        key: sector.sectorId,
        text: sector.sector,
        value: sector,
    }));

    const cityOptions = cities.map((city) => ({
        key: city.cityId,
        text: city.cityName,
        value: city,
    }));

    const positionLevelOptions = positionLevels.map((positionLevel) => ({
        key: positionLevel.positionLevelId,
        text: positionLevel.positionLevelName,
        value: positionLevel,
    }));

    const educationTypeOptions = educationTypes.map((educationType) => ({
        key: educationType.educationTypeId,
        text: educationType.educationTypeName,
        value: educationType,
    }));

    const jobOptions = jobs.map((job) => ({
        key: job.jobId,
        text: job.job,
        value: job,
    }));

    const militaryStatuOptions = militaryStatus.map((militaryStatu) => ({
        key: militaryStatu.militaryStatuId,
        text: militaryStatu.militaryStatuName,
        value: militaryStatu,
    }));

    // const workTypeOptions = typeOfWorks.map((typeOfWork) => ({
    //     key: typeOfWork.id,
    //     text: typeOfWork.typeOfWork,
    //     value: typeOfWork,
    // }));

    const experienceOptions = experiences.map((experience) => ({
        key: experience.experienceId,
        text: experience.experienceName,
        value: experience,
    }));


    const initialValues = {
        advertisementName: "",
        sector: "",
        job: "",
        city: "",
        employerId: (user?.data?.id),
        numberOfVacancies: "",
        jobDescription: "",
        jobSalary: "",
        releaseDate: moment().format("YYYY-MM-DD"),
        applicationDate: "",
        // typeOfWork:"",
        experience: "",
        educationType: "",
        positionLevel: "",
        militaryStatu: "",
    };

    const validationSchema = Yup.object({
        advertisementName: Yup.string().required("advertisement name is cannot be blank."),
        sector: Yup.object().required("sector info is cannot be blank."),
        job: Yup.object().required("job name is cannot be blank."),
        city: Yup.object().required("city info is cannot be blank."),
        numberOfVacancies: Yup.number().required("number of  vacancies must be at least 1 person. "),
        jobDescription: Yup.string().required("job description is cannot be blank."),
        jobSalary: Yup.number(),
        releaseDate: Yup.date().required("required field."),
        applicationDate: Yup.date().required("required field."),
        // typeOfWork: Yup.object().required("work type is cannot be blank."),
        experience: Yup.object(),
        positionLevel: Yup.object().required("position level is cannot be blank."),
        educationType: Yup.object().required("educatiion level is cannot be blank"),
        militaryStatu: Yup.object(),
    })

    const onSubmit = async (values, { resetForm }) => {
        console.log(values);
        jobAdvertisementService.addAdvertisement({
            advertisementName: values.advertisementName,
            sector: Number(values.sector.id),
            job: Number(values.job.id),
            city: Number(values.city.id),
            employer: values.employerId,
            numberOfVacancies: values.numberOfVacancies,
            jobDescription: values.jobDescription,
            jobSalary: values.jobSalary,
            releaseDate: values.releaseDate,
            applicationDate: values.applicationDate,
            // typeOfWork: Number(values.typeOfWork.id),
            experience: Number(values.experience.experienceTypeId),
            educationType: Number(values.educationType.educationTypeId),
            positionLevel: Number(values.positionLevel.positionLevelId),
            militaryStatu: Number(values.militaryStatu.militaryStatuId),
        });
        handleModal(true);
        setTimeout(() => {
            resetForm();
        }, 100);
        //refreshPage();
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
            <Segment raised>
                <Header as='h3' dividing>
                    <Icon name='plug' />  Job Advertisement Posting
                </Header>
                <Grid>
                    <Grid.Row divided>
                        <Grid.Column>
                            <Formik>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Form.Group widths={'equal'}>
                                        <Form.Input
                                            name="advertisementName"
                                            label="Advertisement Name"
                                            icon='bullseye'
                                            placeholder='please enter advertisement name.'
                                            onChange={(event, data) => handleChange("advertisementName", data.value)}
                                            value={formik.values.advertisementName}
                                        />
                                    </Form.Group>
                                    <Divider />
                                    <Form.Group widths={'equal'}>
                                        <Form.TextArea
                                            name='jobDescription'
                                            label="Job Description"
                                            placeholder='please enter advertisement description.
                                        for example, what will they do? what you want them? what you offer them?'
                                            onChange={(event, data) => handleChange("jobDescription", data.value)}
                                            value={formik.values.jobDescription}
                                        />
                                    </Form.Group>
                                    <Divider />
                                    <Form.Group widths={'equal'}>
                                        <Form.Input
                                            name='numberOfVacancies'
                                            label="Number of Vacancies"
                                            icon='chess'
                                            placeholder='number of vacancies.'
                                            onChange={(event, data) => handleChange("numberOfVacancies", data.value)}
                                            value={formik.values.numberOfVacancies}
                                        />
                                        <Form.Input
                                            name='jobSalary'
                                            label="Job Salary"
                                            icon='dollar sign'
                                            placeholder='salary you offer.'
                                            onChange={(event, data) => handleChange("jobSalary", data.value)}
                                            value={formik.values.jobSalary}
                                        />
                                        <Form.Select
                                            name='militaryStatu'
                                            label="Military Statu"
                                            key={militaryStatu=>militaryStatu.militaryStatuId}
                                            placeholder='select military statu.'
                                            options={militaryStatuOptions}
                                            onChange={(event, data) => handleChange("militaryStatu", data.value)}
                                            value={formik.values.militaryStatu.id}
                                        />
                                    </Form.Group>
                                    <Divider />
                                    <Form.Group widths={'equal'}>
                                        <Form.Select
                                            name='sector'
                                            label="Sector"
                                            key={sector=>sector.sectorId}
                                            placeholder='select sector.'
                                            options={sectorOptions}
                                            // keyleri ekle 
                                            onChange={(event, data) => handleChange("sector", data.value)}
                                            value={formik.values.sector.sectorId}
                                        />
                                        <Form.Select
                                            name='job'
                                            label="Job"
                                            key={job=>job.jobId}
                                            placeholder='select job.'
                                            options={jobOptions}
                                            onChange={(event, data) => handleChange("job", data.value)}
                                            value={formik.values.job.jobId}
                                        />
                                        <Form.Select
                                            name='city'
                                            label="City"
                                            key={city=>city.cityId}
                                            placeholder='select city.'
                                            options={cityOptions}
                                            onChange={(event, data) => handleChange("city", data.value)}
                                            value={formik.values.city.cityId}
                                        />

                                    </Form.Group>
                                    <Divider />
                                    <Form.Group widths={'equal'}>
                                        <Form.Select
                                            name='experience'
                                            label="Experience"
                                            key={experience=>experience.experienceId}
                                            placeholder='select experience.'
                                            options={experienceOptions}
                                            onChange={(event, data) => handleChange("experience", data.value)}
                                            value={formik.values.experience.id}
                                        />
                                        <Form.Select
                                            name='positionLevel'
                                            label="Position Level"
                                            key="positionLevel=>positionLevel.positionLevelId"
                                            placeholder='select position level.'
                                            options={positionLevelOptions}
                                            onChange={(event, data) => handleChange("positionLevel", data.value)}
                                            value={formik.values.positionLevel.id}
                                        />
                                        <Form.Select
                                            name='educationType'
                                            label="Education Level"
                                            key={educationType=>educationType.educationTypeId}
                                            placeholder='select education level.'
                                            options={educationTypeOptions}
                                            onChange={(event, data) => handleChange("educationType", data.value)}
                                            value={formik.values.educationType.id}
                                        />
                                    </Form.Group>
                                    <Form.Group widths={'equal'}>
                                        {/* <Form.Select
                                            name='typeOfWork'
                                            label="Work Type"
                                            placeholder='select work type.'
                                            options={workTypeOptions}
                                            onChange={(event, data) => handleChange("typeOfWork", data.value)}
                                            value={formik.values.typeOfWork.id}
                                        /> */}
                                        <Form.Input
                                            name='releaseDate'
                                            label="Release Date"
                                            icon='step backward'
                                            placeholder='release date(YYYY-MM-DD)'
                                            onChange={(event, data) => handleChange("releaseDate", data.value)}
                                            value={formik.values.releaseDate}
                                        />
                                        <Form.Input
                                            name='applicationDate'
                                            label="Application Date"
                                            icon='step forward'
                                            placeholder='application date(YYYY-MM-DD)'
                                            onChange={(event, data) => handleChange("applicationDate", data.value)}
                                            value={formik.values.applicationDate}
                                        />
                                    </Form.Group>
                                    <Divider />
                                    <Button animated='fade' inverted color='red' type='submit'>
                                        <Button.Content visible>Post Advertisement</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='plug' />
                                        </Button.Content>
                                    </Button>
                                </Form>
                            </Formik>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <MessageModal onClose={() => handleModal(false)} onOpen={() => handleModal(true)} open={open} content="job advertisement has been created. please wait for it to be published." />

        </Container>
    )
}
