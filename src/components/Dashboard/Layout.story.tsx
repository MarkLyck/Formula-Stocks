import React from 'react'
import Layout, { LayoutProps } from './Layout'

export default {
  title: 'dashboard/layout',
  component: Layout,
}

export const layout = (args: LayoutProps) => <Layout {...args} />
layout.arguments = {
  children: () => <div>content</div>,
}
