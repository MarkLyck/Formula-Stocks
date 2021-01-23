import React from 'react'
import Navbar, { NavbarProps } from './index'

export default {
  title: 'landing_page/navbar',
  component: Navbar,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#3D3FA3' },
        { name: 'light', value: '#fff' },
      ],
    },
  },
}

export const navbar = (args: NavbarProps) => {
  return <Navbar logo="https://formulastocks.com/static/icons/logo_horizontal.svg" {...args} />
}
