import React from 'react'
import { Button, Divider, Header, Popup } from 'semantic-ui-react'
import { Link, NavLink } from 'react-router-dom'

export default function SignedOut() {
  return (
    <Popup
      trigger={<Button content="Sign In / Login" color='red' />}
      on="click"
      position="bottom center"

    >
      <Popup.Content>
        <Header as='h5'>Are you looking for job?</Header>
        <Button.Group>
          <Button inverted color='red'
            as={Link} to='/jobSeekerLogin'>Login
          </Button>
          <Button color='red'
            as={Link}
            to='/jobSeekerSignUp'>Sign Up
          </Button>
        </Button.Group>
        <Divider horizontal>OR</Divider>
        <Header as='h5'>Are you employer?</Header>
        <NavLink to='/employerLogin' style={{color:"orangered"}}>Login as an Employer</NavLink><br />
        <NavLink to='/employer' style={{color:"orangered"}}>Sign Up as an Employer</NavLink>
      </Popup.Content>
    </Popup>
  )
}