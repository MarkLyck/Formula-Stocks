import React from 'react'
import { GenericLoading, LoadingIndicator } from './index'

export default {
    title: 'ui-components/Loading',
    component: GenericLoading,
    parameters: {
        layout: 'centered'
    }
}

export const generic_loading = () => (
    <GenericLoading />
)

export const loading_indicator = (args: any) => (
    <LoadingIndicator {...args} />
)


loading_indicator.args = {
    size: '2x'
}