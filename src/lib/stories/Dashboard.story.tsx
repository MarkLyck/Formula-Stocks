import React from 'react'
import Portfolio from '../../pages/dashboard/portfolio'
import { MockedProvider } from '@apollo/client/testing'
import {
    LAUNCH_PERFORMANCE_HISTORY
} from 'src/common/queries'
import {
    LAUNCH_PERFORMANCE_HISTORY_MOCK
} from 'src/../tests/mocks'



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
    title: 'pages/dashboard/portfolio',
}

export const portfolio_page = () => (
    <MockedProvider mocks={mocks}>
        <Portfolio />
    </MockedProvider>
) 