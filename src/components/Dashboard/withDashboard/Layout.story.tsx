import React from 'react'
import Layout, { LayoutProps } from './Layout'
import SideMenu, { SideMenuProps } from './SideMenu'

export default {
  title: 'dashboard/Layout',
  component: Layout,
}

export const layout = (args: LayoutProps) => <Layout {...args} />

layout.args = {
  children: <div>dashboard content</div>,
}

export const side_menu = (args: SideMenuProps) => <SideMenu {...args} />
side_menu.args = {
  collapsed: false,
  setCollapsed: () => {},
}
