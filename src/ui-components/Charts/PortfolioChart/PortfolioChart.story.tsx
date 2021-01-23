import React from 'react'
import PortfolioChart from './index'
import { MockedProvider } from '@apollo/client/testing'
import { LAUNCH_PERFORMANCE_HISTORY } from '~/common/queries'
import { LAUNCH_PERFORMANCE_HISTORY_MOCK } from 'src/tests/mocks'

export default {
    title: 'charts/portfolio_chart',
    parameters: {
        layout: "centered",
    }
}

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

export const portfolio_chart = () => (
    <MockedProvider mocks={mocks}>
        <PortfolioChart />
    </MockedProvider>
)

portfolio_chart.parameters = {
    // disables Chromatic on a story level
    chromatic: { disable: true },
};