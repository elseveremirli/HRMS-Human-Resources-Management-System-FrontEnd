import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Header, Icon, Item, Label, Segment } from 'semantic-ui-react'
import { UserContext } from '../../contexts/UserProvider';
import { useNavigate } from 'react-router';
import JobApplicationService from '../../services/jobApplicationService';

export default function JobApplication() {

    const { user } = useContext(UserContext);
    const [jobApplications, setJobApplications] = useState([])
    const [jobSeeker, setJobSeeker] = useState([])
    const navigate = useNavigate()

    let jobApplicationService = new JobApplicationService()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await jobApplicationService.getByJobSeekerId(user?.data?.id).then((result) => setJobApplications(result.data.data));
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

    const handleDelete = async (id) => {
        console.log(id);
        await jobApplicationService.deleteJobApplication(id);
    }

    return (
        <Container>
            <Header as='h3' dividing icon='crosshairs'>
                Your Applications
            </Header>
            <Segment>
                {jobApplications.length > 0 ? (
                    <Item.Group divided>
                        {jobApplications.map((jobApplication) => (
                            <Item key={jobApplication.id}>
                                <Item.Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' />
                                <Item.Content>
                                    <Item.Header as='a'>{jobApplication.job}</Item.Header>
                                    <Item.Meta>
                                        <span className='cinema'>{jobApplication.companyName}</span>
                                    </Item.Meta>
                                    <Item.Description>{jobApplication.jobDescription}</Item.Description>
                                    <Item.Extra>
                                        <Button inverted color='red' floated='right' onClick={() => navigate(`/advertisement/${jobApplication.advertisementId}`)}>
                                            View
                                            <Icon name='right chevron' />
                                        </Button>

                                        <Label>Application Date: {jobApplication.applicationDate}</Label>
                                        <Label
                                            as='a'
                                            inverted
                                            color="red"
                                            onClick={() => handleDelete(jobApplication.id)}
                                        >
                                            withdraw application
                                        </Label>
                                        <Label>
                                            {jobApplication.advertisementId}
                                        </Label>
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        ))}
                    </Item.Group>
                ) : (
                    <p>Nothing to display.</p>
                )}
            </Segment>
        </Container>
    )
}
