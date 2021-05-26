import React from 'react'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { COMPANY_NAME } from 'src/common/constants'
import ExchangeStatuses from './ExchangeStatuses'

const { Title } = Typography

const Container = styled.div`
  margin-bottom: 24px;
`

export const WelcomeStatus = () => {
  return (
    <Container>
      <Title level={3}>{COMPANY_NAME} Portfolio</Title>
      <ExchangeStatuses />
    </Container>
  )
}
