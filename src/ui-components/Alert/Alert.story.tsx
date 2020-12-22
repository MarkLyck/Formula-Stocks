import React from 'react'
import { Alert, AlertProps } from './index'

export default {
    title: 'ui-components/Alert',
    component: Alert,
    parameters: {
        layout: 'centered'
    }
}

export const alert = (args: AlertProps) => (
    <Alert {...args} />
)

