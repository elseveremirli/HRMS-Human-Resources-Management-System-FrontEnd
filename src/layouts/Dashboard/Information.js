import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Button, Container, Grid, Header, Icon, Image, List, Search, Segment } from 'semantic-ui-react';
import { UserContext } from '../../contexts/UserProvider';
import bannerPicture from '../../img/meeting2.jpg';
import UserCount from "../Dashboard/UserCount";
import JobAdvertisementService from '../../services/jobAdvertisementService';
import companyAvatar from '../../img/company.png';

const HomepageHeading = ({ mobile }) => (
  <Container>
    <Grid>
      <Grid.Row columns={2} only="large screen">
        <Grid.Column>
          <Container className="App">
            <Container></Container>
            <Header as='h1' content='Search-a-Find-Job' color="grey" />
            <Header as='h2' content='Do whatever you want when you want to.' color="grey" />
            <Search size="huge" placeholder='Write the job you are looking for.' />
          </Container>
        </Grid.Column>
        <Grid.Column>
          <Image src={bannerPicture} size="large" color="red" floated='right' />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
);

export default function Information() {

  const { user } = useContext(UserContext);
  const [jobAdvertisements, setJobAdvertisements] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService()
    jobAdvertisementService.getActiveAdvertisements().then(result => setJobAdvertisements(result.data.data))
  }, [])

  return (
    <Container style={{ margin: '1em' }}>
      <HomepageHeading />
      <Segment placeholder>
        <Grid columns={2} stackable textAlign='center'>
          <Grid.Row verticalAlign='middle'>
            <Grid.Column>
              <Segment>
                <List divided style={{ textAlign: 'left' }}>
                  {jobAdvertisements.map((jobAdvertisement) => (
                    <List.Item key={jobAdvertisement.advertisementId} style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Icon name='bullhorn' size='large' style={{ marginTop: '13px' }} />
                      <List.Content>
                        <List.Header as='a' onClick={() => navigate(`/advertisement/${jobAdvertisement.advertisementId}`)}>
                            {jobAdvertisement.advertisementName}
                        </List.Header>
                        <List.Description>
                          {jobAdvertisement.cityName}
                        </List.Description>
                        <List.Description>
                          {jobAdvertisement.companyName}
                        </List.Description>
                      </List.Content>
                    </List.Item>
                  ))}
                </List>

              </Segment>
            </Grid.Column>
            {!user && (
              <Grid.Column>
                <Header icon>
                  <Icon name='users' />
                  Join as employer
                </Header>
                <Button color='red' as={Link} to='/employer'>Join</Button>
              </Grid.Column>
            )}
          </Grid.Row>
        </Grid>
      </Segment>
      <Container>
        <Segment>
          <Grid divided>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Header size="huge" as="h1">
                  Heading
                </Header>
                <p>
                  Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
                  tellus ac cursus commodo, tortor mauris condimentum nibh, ut
                  fermentum massa justo sit amet risus. Etiam porta sem malesuada
                  magna mollis euismod. Donec sed odio dui.
                </p>
                <Button size="small">View details &raquo;</Button>
              </Grid.Column>
              <Grid.Column>
                <Header size="huge" as="h1">
                  Heading
                </Header>
                <p>
                  Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
                  tellus ac cursus commodo, tortor mauris condimentum nibh, ut
                  fermentum massa justo sit amet risus. Etiam porta sem malesuada
                  magna mollis euismod. Donec sed odio dui.
                </p>
                <Button size="small">View details &raquo;</Button>
              </Grid.Column>
              <Grid.Column>
                <Header size="huge" as="h1">
                  Heading
                </Header>
                <p>
                  Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
                  tellus ac cursus commodo, tortor mauris condimentum nibh, ut
                  fermentum massa justo sit amet risus. Etiam porta sem malesuada
                  magna mollis euismod. Donec sed odio dui.
                </p>
                <Button size="small">View details &raquo;</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <UserCount />
      </Container>
    </Container>
  )
}
