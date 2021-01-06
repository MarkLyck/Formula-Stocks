import React from 'react'
import styled from '@emotion/styled'
import Navbar, { NavbarType } from './index'

const Container = styled.div`
  padding: 32px;
`

export default {
  title: 'Dashboard/Navbar',
  decorators: [],
  component: Navbar,
}

export const navbar = (args: NavbarType) => (
  <Container>
    <Navbar {...args} />
  </Container>
)
