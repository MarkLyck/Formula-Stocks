import React from 'react'
import styled from '@emotion/styled'
import Hero from './index'

const Container = styled.div`
  padding: 32px;
`

export default {
  title: 'Sales page/hero',
}

export const hero = () => {
  return (
    <Container>
      <Hero showSignup={() => { }} />
    </Container>
  )
}

hero.story = {
  parameters: {
    chromatic: { disable: true },
  },
}
