import React from 'react'
import { Button, Card, Container, Header, Image, Segment } from 'semantic-ui-react'

export default function SeeApplicant() {
    return (
        <Container style={{ margin: "2em" }}>
            <Segment>
                <Header as='h3' dividing disabled>
                    See Applicant
                </Header>
                <Card.Group>
                    <Card>
                        <Card.Content>
                            <Image
                                floated='right'
                                size='mini'
                                src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                            />
                            <Card.Header>name</Card.Header>
                            <Card.Meta>city</Card.Meta>
                            <Card.Description>
                                university ,<strong> faculty - program</strong>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                                <Button inverted color='green'>
                                    Approve
                                </Button>
                                <Button inverted color='red'>
                                    Decline
                                </Button>
                            </div>
                        </Card.Content>
                    </Card>
                </Card.Group>
            </Segment>
        </Container>
    )
}
