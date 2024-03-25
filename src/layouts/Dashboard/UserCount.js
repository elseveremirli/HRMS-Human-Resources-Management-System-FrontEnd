import React from 'react'
import { Container, Grid, Header, Segment } from 'semantic-ui-react'

const square = { width: 200, height: 200 }

export default function Count() {
  return (
    <Container textAlign='center'>
    <Grid verticalAlign='middle'>
        <Grid.Row columns={4}>
            <Grid.Column>
            <Segment circular style={square}>
                <Header as='h2'>
                    job seeker
                <Header.Subheader>100+</Header.Subheader>
                </Header>
             </Segment>
            </Grid.Column>
            <Grid.Column >
            <Segment circular style={square}>
                <Header as='h2'>
                    employer
                <Header.Subheader>100+</Header.Subheader>
                </Header>
             </Segment>
            </Grid.Column>
            <Grid.Column >
            <Segment circular style={square}>
                <Header as='h2'>
                    jobs
                <Header.Subheader>100+</Header.Subheader>
                </Header>
             </Segment>
            </Grid.Column>
            <Grid.Column>
            <Segment circular style={square}>
                <Header as='h2'>
                    company
                <Header.Subheader>100+</Header.Subheader>
                </Header>
             </Segment>
            </Grid.Column>
        </Grid.Row>
    </Grid>
    </Container>
  )
}
