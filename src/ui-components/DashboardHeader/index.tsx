import React from 'react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { Typography } from 'antd'

import ExchangeStatuses from './ExchangeStatuses'

const { Title } = Typography

const Container = styled.div`
  width: 100%;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin-bottom: 0;
  }
`

type DashboardHeaderProps = {
  title?: string
  showExchangeStatuses?: boolean
}

export const DashboardHeader = ({ title, showExchangeStatuses = true }: DashboardHeaderProps) => {
  const router = useRouter()

  let pageTitle = title || router.pathname.split('/dashboard/')[1]
  if (!pageTitle) pageTitle = 'Portfolio'

  return (
    <Container>
      <Title level={3} style={{ textTransform: 'capitalize' }}>
        {pageTitle}
      </Title>
      {showExchangeStatuses && <ExchangeStatuses />}
    </Container>
  )
}
