import React from 'react'
import Navbar from './index'

export default {
    title: 'dashboard/navbar',
    component: Navbar,
}

export const navbar = (args: any) => (
    <Navbar {...args} />
)

