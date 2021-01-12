import React from 'react'
import Portfolio from '../../pages/dashboard/portfolio'
import { MockedProvider } from '@apollo/client/testing'
import {
    LATEST_SELL_SIGNALS
} from '~/common/queries'
import {
    latestSellSignalsMock
} from '~/../tests/mocks'



const mocks = [
    {
        request: {
            query: LATEST_SELL_SIGNALS,
        },
        result: {
            data: latestSellSignalsMock,
        },
    }
]

export default {
    title: 'dashboard/portfolio',
}

export const portfolio = () => (
    <MockedProvider mocks={mocks}>
        <Portfolio />
    </MockedProvider>
)