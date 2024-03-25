// JobAdvertisementSearchList.js

import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Checkbox, Container, Divider, Dropdown, Grid, Icon, Input, Item, Label, Menu, Pagination, Segment } from 'semantic-ui-react';
import '../../App.css';
import { UserContext } from '../../contexts/UserProvider';
import CityService from '../../services/cityService';
import JobAdvertisementService from '../../services/jobAdvertisementService';
import SectorService from '../../services/sectorService';

// UserContext oluşturulması
export const AdvertisementContext = React.createContext();

export default function JobAdvertisementSearchList() {
  const [searchValue, setSearchValue] = useState('')
  const [cities, setCities] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [jobAdvertisements, setjobAdvertisements] = useState([])
  const { user } = useContext(UserContext);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedSector, setSelectedSector] = useState(null);


  let cityService = new CityService();
  let sectorService = new SectorService();
  let jobAdvertisementService = new JobAdvertisementService();


  useEffect(() => {
    cityService.getAllCity().then((result) => setCities(result.data.data));
    sectorService.getSectors().then((result) => setSectors(result.data.data));
    jobAdvertisementService.getActiveAdvertisements().then((result) => setjobAdvertisements(result.data.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity, selectedSector, searchValue]);

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

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    jobAdvertisementService.getByAdvertisementName(value)
      .then(result => setjobAdvertisements(result.data.data));
  };

  const handleSearch = () => {
    jobAdvertisementService
      .getBySectorAndCity(selectedSector, selectedCity)
      .then((result) => setjobAdvertisements(result.data.data))
      .catch((error) => {
        console.error(error);
      });
  };

  const handleReset = () => {
    setjobAdvertisements([]);
    setSearchValue('');
    setSelectedCity('');
    setSelectedSector('');
  };

  return (
    <Container>
      <div className="App">
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Menu vertical style={{ marginTop: "2em" }}>
                <Menu.Item>
                  <Menu.Header>City</Menu.Header>
                  <Menu.Menu>
                    <Dropdown
                      search
                      placeholder='choose city'
                      selection
                      options={cityOptions}
                      style={{ margin: "0.5em" }}
                      onChange={(e, { value }) => setSelectedCity(value)}
                    />
                  </Menu.Menu>
                </Menu.Item>
                <Divider clearing />
                <Menu.Item>
                  <Menu.Header>Work Place</Menu.Header>
                  <Menu.Menu vertical style={{ margin: "0.5em" }}>
                    <Checkbox label='work from home' /><br />
                    <Checkbox label='hybrid' /><br />
                    <Checkbox label='at the workplace' /><br />
                  </Menu.Menu>
                </Menu.Item>
                <Divider clearing />
                <Menu.Item>
                  <Menu.Header>Sector</Menu.Header>
                  <Menu.Menu>
                    <Dropdown
                      search
                      placeholder='choose sector'
                      selection
                      style={{ margin: "0.5em" }}
                      options={sectorOptions}
                      onChange={(e, { value }) => setSelectedSector(value)} />
                  </Menu.Menu>
                </Menu.Item>
                <Divider clearing />
                <Menu.Item>
                  <Menu.Header>Work Type</Menu.Header>
                  <Menu.Menu vertical style={{ margin: "0.5em" }}>
                    <Checkbox label='full time' /><br />
                    <Checkbox label='period/project based' /><br />
                    <Checkbox label='intern' /><br />
                  </Menu.Menu>
                </Menu.Item>
                <Divider clearing />
                <Menu.Item>
                  <Menu.Header>Education</Menu.Header>
                  <Menu.Menu vertical style={{ margin: "0.5em" }}>
                    <Checkbox label='postgraduate, graduate' /><br />
                    <Checkbox label='bachelor level,graduate' /><br />
                    <Checkbox label='associate Degree' /><br />
                  </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                  <Button icon inverted color='red' onClick={handleSearch}>
                    <Icon name='search' />
                  </Button>
                  <Button icon inverted color='red' onClick={handleReset}>
                    <Icon name='refresh' />
                  </Button>
                </Menu.Item>
                <Divider clearing />
              </Menu>
            </Grid.Column>
            <Grid.Column width={12}>
              <Segment style={{ margin: "2em " }} size='mini'>
                <Input
                  icon='search'
                  placeholder='Search...'
                  fluid
                  size='large'
                  value={searchValue}
                  onChange={handleSearchChange}
                />
                <Segment style={{ margin: "2em" }} size='mini'>
                  {jobAdvertisements
                    .filter((jobAdvertisement) => {
                      if (selectedCity && selectedCity.id !== jobAdvertisement.cityId) {
                        return false;
                      }
                      if (selectedSector && selectedSector.id !== jobAdvertisement.sectorId) {
                        return false;
                      }
                      return true;
                    }).map((jobAdvertisement) => (
                      <Segment>
                       
                          <Item.Group divided>
                      
                              <Item key={jobAdvertisement.id}>
                                <Item.Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' />
                                <Item.Content>
                                  <Item.Header as='a'>{jobAdvertisement.advertisementName}</Item.Header>
                                  <Item.Meta>
                                    <span className='cinema'>{jobAdvertisement.companyName}, {jobAdvertisement.cityName}</span>
                                  </Item.Meta>
                                  <Item.Description>{jobAdvertisement.jobDescription}</Item.Description>
                                  <Item.Extra>
                                    <Button inverted color="red" floated='right' as={NavLink}>
                                      <Link to={`/advertisement/${jobAdvertisement.advertisementId}`}
                                        style={{ color: "white" }}>
                                        {user ? 'Apply' : 'View'}
                                        <Icon name='right chevron' />
                                      </Link>
                                    </Button>
                                    {user && (
                                      <Button icon inverted floated='right' color="red">
                                        <Icon name='heart outline' />
                                      </Button>
                                    )}

                                    <Label>Application Date: {jobAdvertisement.applicationDate}</Label>
                                  </Item.Extra>
                                </Item.Content>
                              </Item>
                          </Item.Group>
                      </Segment>
                    ))}
                  <Pagination defaultActivePage={1} disabled totalPages={5} />
                </Segment>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </Container>
  );
}
