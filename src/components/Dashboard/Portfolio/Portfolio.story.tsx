import React from 'react'
import Portfolio from './index'
import { MockedProvider } from '@apollo/client/testing'
import { LAUNCH_PERFORMANCE_HISTORY } from 'src/common/queries'
import { LAUNCH_PERFORMANCE_HISTORY_MOCK } from 'src/../tests/mocks'


const mocks = [
    {
        request: {
            query: LAUNCH_PERFORMANCE_HISTORY,
        },
        result: {
            data: LAUNCH_PERFORMANCE_HISTORY_MOCK,
        },
    },
]

export default {
    title: 'dashboard/portfolio',
}

export const portfolio = () => (
    <MockedProvider mocks={mocks}>
        <Portfolio />
    </MockedProvider>
) 