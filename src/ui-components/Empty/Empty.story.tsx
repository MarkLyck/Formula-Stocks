import React from 'react'
import { Empty, EmptyProps } from './index'

export default {
  title: 'ui-components/Empty',
  component: Empty,
  parameters: {
    layout: 'centered',
  },
}

export const empty = (args: EmptyProps) => <Empty {...args} />
