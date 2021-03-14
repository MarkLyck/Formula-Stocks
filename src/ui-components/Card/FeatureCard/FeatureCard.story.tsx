import React from 'react'
import { Story } from '@storybook/react'
import { SmallFeatureCard, CardProps } from './SmallFeatureCard'
import theme from 'src/lib/theme'

export default {
  title: 'ui-components/Card/Feature',
  component: SmallFeatureCard,
  parameters: {
    layout: 'centered',
  },
}

const Template: Story<CardProps> = (args: CardProps) => <SmallFeatureCard {...args} />

export const algorithmic = Template.bind({})
algorithmic.args = {
  color: theme.palette.icon_colors.pink,
  icon: 'brain',
  children:
    'Our algorithms identify high quality public companies with a large margin of safety, similar to methods used by Warren Buffet',
}

export const win_ratio = Template.bind({})
win_ratio.args = {
  color: theme.palette.icon_colors.pink,
  icon: 'percentage',
  children: 'To date +93.67% of our stock buy/sell signals have been sold with a profit.',
}

export const guarantee = Template.bind({})
guarantee.args = {
  color: theme.palette.icon_colors.pink,
  icon: 'money-bill-wave',
  children:
    'If you don’t absolutely love our service after signing up. No worries, we’ll give your money back - No questions asked.',
}
