import React from 'react'
import Layout, { LayoutProps } from './Layout'
import SideMenu from './SideMenu'

export default {
  title: 'dashboard/Layout',
  component: Layout,
}

export const layout = (args: LayoutProps) => <Layout {...args} />

layout.args = {
  children: <div>dashboard content2</div>,
}

export const side_menu = () => <SideMenu />
