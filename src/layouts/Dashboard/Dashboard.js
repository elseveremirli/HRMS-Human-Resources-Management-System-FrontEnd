import React from 'react'
import {Grid, Header, Icon,} from 'semantic-ui-react'
import UserCount from './../Dashboard/UserCount'
import JobAdvertisement from '../../pages/JobAdvertisement/JobAdvertisement'

export default function Dashboard() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
            </Grid.Column>
                <Grid.Column width={16}>
                  <Header as='h3'>
                    <Icon name='braille' />
                      <Header.Content>today's new</Header.Content>
                      </Header>
                  <JobAdvertisement/>
                  <UserCount/>
                </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }