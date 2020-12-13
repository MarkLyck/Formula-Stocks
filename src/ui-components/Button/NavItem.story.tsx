import React from 'react'
import { NavItem, NavItemProps } from './NavItem'

export default {
    title: 'NavItem',
    component: NavItem,
    parameters: {
        layout: 'centered'
    }
}

export const nav_item = (args: NavItemProps) => (
    <NavItem {...args}>NAV ITEM</NavItem>
)

