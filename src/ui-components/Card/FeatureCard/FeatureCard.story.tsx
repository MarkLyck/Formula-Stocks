import React from 'react'
import { Story } from '@storybook/react';
import { FeatureCard, CardProps } from './index'
import theme from '~/lib/theme'

export default {
    title: 'Card/Feature',
    component: FeatureCard,
    parameters: {
        layout: 'centered'
    }
}

const Template: Story<CardProps> = (args: CardProps) => (
    <FeatureCard {...args} />
)


export const algorithmic = Template.bind({});
algorithmic.args = {
    title: 'Algorithmic approach',
    color: theme.palette.feature_color,
    icon: 'brain',
    children: 'Our algorithms identify high quality public companies with a large margin of safety, similar to methods used by Warren Buffet'
};

export const win_ratio = Template.bind({});
win_ratio.args = {
    title: 'Algorithmic approach',
    color: theme.palette.feature_color,
    icon: 'brain',
    children: 'Our algorithms identify high quality public companies with a large margin of safety, similar to methods used by Warren Buffet'
};

export const guarantee = Template.bind({});
guarantee.args = {
    title: 'Algorithmic approach',
    color: theme.palette.feature_color,
    icon: 'brain',
    children: 'Our algorithms identify high quality public companies with a large margin of safety, similar to methods used by Warren Buffet'
};
