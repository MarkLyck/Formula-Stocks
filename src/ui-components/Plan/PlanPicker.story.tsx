import React from 'react'
import { PlanPicker } from './index'

export default {
  title: 'ui-components/plan_picker',
  component: PlanPicker,
  parameters: {
    layout: 'centered'
  }
}

export const plan_picker = () => (
  <PlanPicker onChange={console.log} />
)