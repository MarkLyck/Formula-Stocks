import React from 'react'
import { Story } from '@storybook/react'
import { SocialMediaLink, SocialMediaLinkProps } from './index'

export default {
  title: 'ui components/social_media_link',
  component: SocialMediaLink,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: 'gray' }],
    },
  },
}

const Template: Story<SocialMediaLinkProps> = (args) => <SocialMediaLink {...args} />

export const Facebook = Template.bind({})
Facebook.args = {
  href: '/',
  icon: 'facebook-f',
}

export const Twitter = Template.bind({})
Twitter.args = {
  href: '/',
  icon: 'twitter',
}

export const LinkedIn = Template.bind({})
LinkedIn.args = {
  href: '/',
  icon: 'linkedin',
}
