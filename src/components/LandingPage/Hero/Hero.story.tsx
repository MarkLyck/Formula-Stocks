import React from 'react'
import styled from '@emotion/styled'
import Hero from './index'

export default {
  title: 'Sales page/hero',
}

export const hero = () => {
  return (
    <Hero showSignup={() => { }} />
  )
}

hero.story = {
  parameters: {
    chromatic: { disable: true },
  },
}
