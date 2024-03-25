import React, { useState } from 'react'
import { Container, Grid, Header, Icon, Menu, Segment } from 'semantic-ui-react'
import SectorList from './SectorList';
import City from './City';
import University from './University';
import Faculty from './Faculty';
import ProgramInfo from './ProgramInfo';
import EducationType from './EducationType';
import ExperienceType from './ExperienceType';
import HighSchoolType from './HighSchoolType';
import TypeOfWork from './TypeOfWork';
import Language from './Language';
import MilitaryStatu from './MilitaryStatu';
import PositionLevel from './PositionLevel';

export default function SystemEmployeeInfo() {

    const [activeMenuItem, setActiveMenuItem] = useState(null);

    const handleMenuItemClick = (item) => {
        setActiveMenuItem(item);
    };

    const renderContent = () => {
        if (activeMenuItem === '/cityList') {
            return <City />;
        } else if (activeMenuItem === '/sectorList') {
            return <SectorList />;
        } else if (activeMenuItem === '/universityList') {
            return <University />;
        } else if (activeMenuItem === '/faculty') {
            return <Faculty />;
        } 
        else if (activeMenuItem === '/programInfo') {
            return <ProgramInfo />;
        }
        else if (activeMenuItem === '/educationType') {
            return <EducationType />;
        }
        else if (activeMenuItem === '/experience') {
            return <ExperienceType />;
        } 
        else if (activeMenuItem === '/highSchoolTypeList') {
            return <HighSchoolType />;
        } 
        else if (activeMenuItem === '/typeOfWork') {
            return <TypeOfWork />;
        } 
        else if (activeMenuItem === '/languageList') {
            return <Language />;
        } 
        else if (activeMenuItem === '/militaryStatuInfo') {
            return <MilitaryStatu />;
        } 
        else if (activeMenuItem === '/positionLevel') {
            return <PositionLevel />;
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
        <Container style={{ margin: '1em' }}>
            <Segment raised>
                <Header as='h3' dividing>
                    <Icon name='wrench'></Icon>
                    Hello -person-! How are you today? 
                    <br/>
                </Header>
                <Segment attached tertiary>
                    You can add everything that should be on the website here.
                </Segment>
                <br/>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Menu vertical>
                                <Menu.Item>
                                    <Menu.Header>Main Implementation</Menu.Header>

                                    <Menu.Menu>
                                        <Menu.Item
                                            name='city'
                                            active={activeMenuItem === 'city'}
                                            onClick={() => handleMenuItemClick('/cityList')}
                                        />
                                        <Menu.Item
                                            name='sector'
                                            active={activeMenuItem === 'sector'}
                                            onClick={() => handleMenuItemClick('/sectorList')}
                                        />
                                        <Menu.Item
                                            name='university'
                                            active={activeMenuItem === 'university'}
                                            onClick={() => handleMenuItemClick('/universityList')}
                                        />
                                        <Menu.Item
                                            name='faculty'
                                            active={activeMenuItem === 'faculty'}
                                            onClick={() => handleMenuItemClick('/faculty')}
                                        />
                                         <Menu.Item
                                            name='program'
                                            active={activeMenuItem === 'program'}
                                            onClick={() => handleMenuItemClick('/programInfo')}
                                        />
                                    </Menu.Menu>
                                </Menu.Item>
                                <Menu.Item>
                                    <Menu.Header>Types</Menu.Header>
                                    <Menu.Menu>
                                        <Menu.Item
                                            name='educationType'
                                            active={activeMenuItem === 'education Type'}
                                            onClick={() => handleMenuItemClick('/educationType')}
                                        />
                                        <Menu.Item
                                            name='experienceType'
                                            active={activeMenuItem === 'experienceType'}
                                            onClick={() => handleMenuItemClick('/experience')}
                                        />
                                        <Menu.Item
                                            name='highSchoolType'
                                            active={activeMenuItem === 'highSchoolType'}
                                            onClick={() => handleMenuItemClick('/highSchoolTypeList')}
                                        />
                                        <Menu.Item
                                            name='workType'
                                            active={activeMenuItem === 'workType'}
                                            onClick={() => handleMenuItemClick('/typeOfWork')}
                                        />
                                    </Menu.Menu>
                                </Menu.Item>
                                <Menu.Item>
                                    <Menu.Header>Others</Menu.Header>
                                    <Menu.Menu>
                                        <Menu.Item
                                            name='language'
                                            active={activeMenuItem === 'language'}
                                            onClick={() => handleMenuItemClick('/languageList')}
                                        />
                                        <Menu.Item
                                            name='militaryStatu'
                                            active={activeMenuItem === 'militaryStatu'}
                                            onClick={() => handleMenuItemClick('/militaryStatuInfo')}
                                        />
                                        <Menu.Item
                                            name='positionLevel'
                                            active={activeMenuItem === 'positionLevel'}
                                            onClick={() => handleMenuItemClick('/positionLevel')}
                                        />
                                    </Menu.Menu>
                                </Menu.Item>
                            </Menu>
                        </Grid.Column>
                        <Grid.Column width={12}>
                          <Segment>
                            {renderContent()}
                          </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Container>
    )
}
