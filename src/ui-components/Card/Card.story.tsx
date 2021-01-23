import React from 'react'
import { Card, CardProps } from './index'

export default {
  title: 'ui-components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
}

export const card = (args: CardProps) => <Card {...args}>Card content</Card>
