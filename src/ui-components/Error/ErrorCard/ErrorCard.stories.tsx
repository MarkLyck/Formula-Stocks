import React from 'react'
import { ErrorCard } from './index'

export default {
  title: 'ui-components/error',
  component: ErrorCard,
}

export const error_card = (args: any) => <ErrorCard {...args} />
error_card.args = {
  cardTitle: 'Section',
  error: new Error('test Error'),
}
