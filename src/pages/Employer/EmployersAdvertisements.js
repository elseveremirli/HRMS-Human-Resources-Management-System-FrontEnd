import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Divider, Icon, Item, Segment } from 'semantic-ui-react'
import { UserContext } from '../../contexts/UserProvider'
import JobAdvertisementService from '../../services/jobAdvertisementService'
import { Link, NavLink } from 'react-router-dom'

export default function EmployersAdvertisements() {

  const { user } = useContext(UserContext)
  const [open, setOpen] = useState([])
  const [employer, setEmployers] = useState([])
  const [jobAdvertisements, setjobAdvertisements] = useState([])

  let jobAdvertisementService = new JobAdvertisementService()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await jobAdvertisementService.getDetailsSortedByEmployerId(user?.data?.id).then((result) => setjobAdvertisements(result.data.data));
        setEmployers(response.data);
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

  return (
    <Container>
      <Segment size='mini'>
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
                    View
                    <Icon name='right chevron' />
                  </Link>
                </Button>
                </Item.Extra>
              </Item.Content>
            </Item>
            <Divider clearing />
          </Item.Group>
        ))}
      </Segment>
    </Container>
  )
}
