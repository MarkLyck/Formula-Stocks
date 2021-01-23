import React from 'react'
import { Legends, Legend } from './index'

export default {
    title: 'ui components/charts/legend',
}

export const tag = () => (
    <Legends>
        <Legend color="red">
            legend 1
        </Legend>
        <Legend color="blue">
            legend 2
        </Legend>
    </Legends>
)