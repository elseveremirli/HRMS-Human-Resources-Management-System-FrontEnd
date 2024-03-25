import React, { useState, useEffect, useContext } from 'react'
import { Button, Divider, Icon, Item, Pagination, Segment } from 'semantic-ui-react'
import JobAdvertisementService from '../../services/jobAdvertisementService';
// import FavoriteJobAdvertisementService from '../../services/favoriteJobAdvertisementService';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../contexts/UserProvider';
import { AdvertisementContext } from './JobAdvertisementSearchList';

export default function JobAdvertisement() {

  const [jobAdvertisements, setjobAdvertisements] = useState([])
  const { user } = useContext(UserContext);
  const searchValue = useContext(AdvertisementContext);


  let jobAdvertisementService = new JobAdvertisementService();

  useEffect(() => {
    jobAdvertisementService.getByAdvertisementName(searchValue).then(result => setjobAdvertisements(result.data.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <Segment style={{ margin: "2em" }} size='mini'>
      {jobAdvertisements.map((jobAdvertisement) => (
        <Item.Group dividing key={jobAdvertisement.id}>
          <Item>
            <Icon name='recycle' size='massive' />
            <Item.Content>
              <Item.Header as='a' floated='left'>
                <Link to={`/advertisement/${jobAdvertisement.advertisementId}`}
                  style={{ color: "black" }}>
                  {jobAdvertisement.advertisementName}
                </Link>
              </Item.Header>
              <Item.Header as='a' floated='left'>
              </Item.Header>
              <Item.Meta floated='left'>
              </Item.Meta>
              <Item.Extra>{jobAdvertisement.companyName}, {jobAdvertisement.cityName}</Item.Extra>
              <Item.Description floated='left'>{jobAdvertisement.jobDescription}</Item.Description>
              <span>{jobAdvertisement.sectorName}, {jobAdvertisement.workTypeName}</span>
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
              </Item.Extra>
            </Item.Content>
          </Item>
          <Divider clearing />
        </Item.Group>
      ))}
      <Pagination defaultActivePage={1} disabled totalPages={5} />
    </Segment>
  )
}