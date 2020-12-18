import React from 'react'
import Newsletter from './index'

export default {
  title: 'Landing page/newsletter',
  component: Newsletter,
  parameters: {
    layout: 'centered'
  }
}

export const newsletter = () => (
  <Newsletter />
)