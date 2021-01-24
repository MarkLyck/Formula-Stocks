import React from 'react'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { COMPANY_NAME } from 'src/common/constants'

const { Title, Text } = Typography

const Container = styled.div`
  margin-bottom: 24px;
`

export const WelcomeStatus = () => {
  return (
    <Container>
      <Title level={3}>Welcome to {COMPANY_NAME}</Title>
      <Text>Exchanges status: Open</Text>
    </Container>
  )
}
