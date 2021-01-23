import React from 'react'
import LoginItems from './index'

export default {
  title: 'Navbar/login_items',
  component: LoginItems,
  parameters: {
    layout: 'centered',
  },
}

export const login_items = (args: any) => {
  return <LoginItems {...args} />
}
