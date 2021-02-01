import React from 'react'
import { Typography } from 'antd'

const { Title } = Typography

type DashboardHeader = {
  title: string
}

export const DashboardHeader = ({ title }: DashboardHeader) => <Title level={2}>{title}</Title>
