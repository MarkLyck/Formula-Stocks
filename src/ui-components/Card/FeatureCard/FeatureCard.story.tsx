import React from 'react'
import { FeatureCard, CardProps } from './index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default {
    title: 'Card/Feature',
    component: FeatureCard,
    parameters: {
        layout: 'centered'
    }
}

export const feature_card = (args: CardProps) => (
    <FeatureCard {...args}>Feature Card content</FeatureCard>
)

