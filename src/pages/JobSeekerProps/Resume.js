import React from 'react'
import { Button, Container, Grid, Icon } from 'semantic-ui-react'
import Education from './Education'
import JobExperience from './JobExperience'
import Ability from './Ability'
import HighSchool from './HighSchool'
import LanguageInfo from './LanguageInfo'
import CoverLetter from './CoverLetter'
import SocialMedia from './SocialMedia'

export default function Resume() {
    return (
        <Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column verticalAlign='right'>
                    <Button animated='fade' inverted color='red' type='submit'>
                        <Button.Content visible>Get PDF</Button.Content>
                        <Button.Content hidden>
                            <Icon name='file pdf outline' />
                        </Button.Content>
                    </Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Education />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <JobExperience />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Ability />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <HighSchool />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <LanguageInfo />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <SocialMedia />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <CoverLetter />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}
