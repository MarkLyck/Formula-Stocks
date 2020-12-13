import React from 'react'
import Navbar, { NavbarProps } from './index'

export default {
    title: 'Navbar',
    component: Navbar,
    parameters: {
        backgrounds: {
            default: 'dark',
            values: [
                { name: 'dark', value: 'gray' },
            ],
        },
    },
}

export const navbar = (args: NavbarProps) => {
    return (
        <Navbar logo="https://formulastocks.com/static/icons/logo_horizontal.svg" {...args} />
    )
}
