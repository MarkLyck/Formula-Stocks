import React from 'react'
import { ActionButton } from './ActionButton'

export default {
  title: 'ui-components/ActionButton',
  component: ActionButton,
  parameters: {
    layout: 'centered',
  },
}

export const action_button = (args: any) => <ActionButton {...args}>ACTION BUTTON</ActionButton>
