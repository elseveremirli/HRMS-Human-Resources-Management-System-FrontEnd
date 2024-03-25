import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Icon } from 'semantic-ui-react'

export default function NotFoundPage() {
  return (
    <div>
      <Container style={{ margin: "10em" }} textAlign='center'>
        <Header as="h1">404 Sayfa Bulunamadı</Header>
        <p>Aradığınız sayfa mevcut değil.</p>
      </Container>
    </div>
  )
}
