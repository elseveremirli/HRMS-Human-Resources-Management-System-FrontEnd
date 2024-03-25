import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Header, Segment, Icon, Grid, Button, GridColumn, Divider, Card, List, Container } from 'semantic-ui-react';
import JobAdvertisementService from '../../services/jobAdvertisementService';
import FavoriteJobAdvertisementService from '../../services/favoriteJobAdvertisementService';
import JobApplicationService from '../../services/jobApplicationService'
import { UserContext } from '../../contexts/UserProvider';
import { useFormik } from 'formik';
import moment from 'moment';

export default function JobAdvertisementDetail() {

    let { id } = useParams();
    const { user } = useContext(UserContext)
    const [jobAdvertisement, setJobAdvertisement] = useState([]);
    const [employer, setEmployer] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isApplied, setIsApplied] = useState(false);


    let jobAdvertisementService = new JobAdvertisementService()
    let favoriteJobAdvertisementService = new FavoriteJobAdvertisementService()
    let jobApplicationService = new JobApplicationService()

    useEffect(() => {
        jobAdvertisementService.getByAdvertisementId(id).then((result => setJobAdvertisement(result.data.data))
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const isEmployer = user && user.data?.userStatu.typeId === 1;
    //const isAdvertisementOwner = user && user.data?.id  === jobAdvertisement.employerId;


    const handleDelete = async (id) => {
        console.log(id);
        jobAdvertisementService.deleteAdvertisement(id);
    }

    const formik = useFormik({
        initialValues: {
            jobAdvertisementId: id,
            jobSeekerId: (user.data?.id),
        },
        onSubmit: async (values) => {
            try {
                console.log(values)
                await favoriteJobAdvertisementService.addFavoriteJobAdvertisement(
                    {
                        jobAdvertisementId: values.jobAdvertisementId,
                        jobSeekerId: values.jobSeekerId,
                    }
                );
                console.log("advertisement has been added to your list successfully.");
                setIsFavorite(true);
            } catch (error) {
                console.error("Error adding favorite job advertisement:", error);
                console.log("An error occurred while adding the advertisement to your list.");
                setIsFavorite(false);
            }
        }
    })

    const handleJobApplication = async (values) => {
        try {
            console.log(values)
            await jobApplicationService.addJobApplication({
                advertisementId: id,
                jobSeekerId: (user.data?.id),
                applicationDate: moment().format("YYYY-MM-DD"),
            });
            console.log("advertisement has been added to your list successfully.");
        } catch (error) {
            console.error("Error adding favorite job advertisement:", error);
            console.log("An error occurred while adding the advertisement to your list.");
        }
    }
    return (
        <div style={{ margin: '1em' }}>
            <Container>
                <Segment>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={10}>
                                <Header as='h2'>
                                    <Icon name='flag checkered' />
                                    <Header.Content>
                                        {jobAdvertisement.advertisementName}
                                        <Header.Subheader>{jobAdvertisement.companyName}</Header.Subheader>
                                        <Header.Subheader>{jobAdvertisement.cityName}</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                {isEmployer ? (
                                    <div>
                                        <Button
                                            size="medium"
                                            floated="right"
                                            color="red">Edit
                                        </Button>
                                        <Button
                                            size="medium"
                                            floated="right"
                                            color="red"
                                            onClick={() => handleDelete(jobAdvertisement.id)}>Delete
                                        </Button>
                                        <Link to="/seeApplicants">
                                        <Button
                                            size="medium"
                                            floated="right"
                                            inverted color="red">See Applicants
                                        </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div>
                                        <Button
                                            size="medium"
                                            circular
                                            floated="right"
                                            inverted color="red"
                                            onClick={handleJobApplication}
                                        >
                                            {isApplied ? "Applied" : "Apply now!"}
                                        </Button>
                                        <Button
                                            inverted
                                            floated='right'
                                            color='red'
                                            circular
                                            onClick={formik.handleSubmit}
                                        >
                                            <Icon name={isFavorite ? 'heart' : 'heart outline'} />
                                        </Button>
                                    </div>
                                )}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={11}>
                                <Segment>
                                    Job Advertisement Image
                                </Segment>
                                <Segment>
                                    <Header as='h2' floated='right'>
                                        general qualifications and job description
                                    </Header>
                                    <Divider clearing />
                                    <p>
                                        {employer.companyDescription}
                                    </p>
                                    <Header as='h2' floated='left'>Job description</Header>
                                    <Divider clearing />
                                    <p>
                                        {jobAdvertisement.jobDescription}
                                    </p>
                                    <Card.Group>
                                        <Card fluid color='red'>
                                            <Card.Content>
                                                <Header as="h3"> <Icon name='info' />candidate criteria</Header>
                                            </Card.Content>
                                            <Segment>
                                                <List size="large">
                                                    <List.Item>
                                                        <List.Icon name="sign language" />
                                                        <List.Content>experience: {jobAdvertisement.experienceName}</List.Content>
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Icon name="compass outline" />
                                                        <List.Content>military status: {jobAdvertisement.militaryStatuName}</List.Content>
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Icon name="chess king" />
                                                        <List.Content>education level: {jobAdvertisement.educationTypeName}</List.Content>
                                                    </List.Item>
                                                </List>
                                            </Segment>
                                        </Card>
                                        <Card fluid color='red'>
                                            <Card.Content>
                                                <Header as="h3"> <Icon name='info' />job information</Header>
                                            </Card.Content>
                                            <Segment>
                                                <List size="large">
                                                    <List.Item>
                                                        <List.Icon name="chess board" />
                                                        <List.Content>Sector : {jobAdvertisement.sectorName}</List.Content>
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Icon name="pencil alternate" />
                                                        <List.Content>position level : {jobAdvertisement.positionLevelName}</List.Content>
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Icon name="map signs" />
                                                        <List.Content>way of working : {jobAdvertisement.workTypeName}</List.Content>
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Icon name="child" />
                                                        <List.Content>personal number: {jobAdvertisement.numberOfVacancies}</List.Content>
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Icon name="map marker alternate" />
                                                        <List.Content>city : {jobAdvertisement.cityName}</List.Content>
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Icon name="dollar sign" />
                                                        <List.Content>offered fee : {jobAdvertisement.jobSalary}</List.Content>
                                                    </List.Item>
                                                </List>
                                            </Segment>
                                        </Card>
                                    </Card.Group>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Segment>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Segment>Company Image</Segment>
                                                <Header as="h5">Sector : {jobAdvertisement.sectorName}</Header>
                                                <Header as="h5">Company : {jobAdvertisement.companyName}</Header>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <GridColumn>
                                                <Button.Group
                                                    size="mini"
                                                    style={{ marginRight: '0.5em' }}
                                                    inverted color="red">
                                                    <Button>Google it!</Button>
                                                    <Button>Company Profile</Button>
                                                    <Button>Open Positions</Button>
                                                </Button.Group>
                                            </GridColumn>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Segment basic color="red">
                                                    Last Date: {jobAdvertisement.applicationDate}
                                                </Segment>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Container>
        </div>
    )
}
