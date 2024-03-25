    import React, { useState } from 'react'
import { Container, Grid, Header, Icon, Menu, Segment } from 'semantic-ui-react'
import EmployerPersonalInformation from './EmployerPersonalInformation'
import EmployersAdvertisements from './EmployersAdvertisements';
import JobAdvertisementPost from '../JobAdvertisement/JobAdvertisementPost';
import EmployerInformation from './EmployerInformation';

export default function EmployerProfile() {

    const [activeMenuItem, setActiveMenuItem] = useState(null);

    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString(undefined, options);

    const handleMenuItemClick = (item) => {
        setActiveMenuItem(item);
    };

    const renderContent = () => {
        if (activeMenuItem === '/employerInformation') {
            return <EmployerPersonalInformation />;
        } else if (activeMenuItem === '/employersAdvertisements') {
            return <EmployersAdvertisements />;
        } else if (activeMenuItem === '/advertisementPost') {
            return <JobAdvertisementPost />;
        } else if (activeMenuItem === '/employerPersonalInformation') {
            return <EmployerInformation />;
        } else {
            return (
                <h4>
                    <Icon name='bolt'></Icon>
                    selected page will be published here.  <br /><br />
                </h4>
            );
        }
    };

    return (
        <Container style={{ margin: "1em", marginBottom: "12em" }}>
            <Segment raised>
                <Header as='h2' attached='top'>
                    Welcome Back,How are you today?
                </Header>
                <Segment attached>
                    {formattedDate}
                    <br />
                </Segment>
                <br />
                <Grid>
                    <Grid.Column width={4}>
                        <Menu fluid vertical tabular>
                            <Menu.Item
                                name='profile'
                                active={activeMenuItem === 'profile'}
                                onClick={() => handleMenuItemClick('/employerInformation')}
                            >
                                <Icon name='user'></Icon>
                                Profile
                            </Menu.Item>
                            <Menu.Item
                                name='yourAdvertisements'
                                icon='unordered list'
                                active={activeMenuItem === 'yourAdvertisements'}
                                onClick={() => handleMenuItemClick('/employersAdvertisements')}
                            >
                                <Icon name='unordered list'></Icon>
                                Your Advertisements
                            </Menu.Item>
                            <Menu.Item
                                name='addAdvertisement'
                                active={activeMenuItem === 'addAdvertisement'}
                                onClick={() => handleMenuItemClick('/advertisementPost')}
                            >
                                <Icon name='plug'></Icon>
                                Add Advertisement
                            </Menu.Item>
                            <Menu.Item
                                name='settings'
                                active={activeMenuItem === 'settings'}
                                onClick={() => handleMenuItemClick('/employerPersonalInformation')}
                            >
                                <Icon name='setting'></Icon>
                                Settings
                            </Menu.Item>
                        </Menu>
                    </Grid.Column>

                    <Grid.Column stretched width={12}>
                        <Segment>
                            {renderContent()}
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Container>
    )
}
