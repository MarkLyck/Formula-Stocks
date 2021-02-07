import React from 'react'

import styled from '@emotion/styled'
import { Card, Alert, Space, Typography } from 'antd'
import { RetryButton, SupportButton } from 'src/ui-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const { Title, Text } = Typography

const ErrorIcon = styled(FontAwesomeIcon)`
  color: ${(p) => p.theme.palette.danger[600]};
  font-size: 40px;
  margin-bottom: 16px;
`

const ErrorAlert = styled(Alert)`
  width: 100%;
  margin-bottom: 16px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CenterTitle = styled(Title)`
  && {
    text-align: center;
    color: ${(p) => p.theme.palette.danger[600]};
  }
`

const CenterMessage = styled(Text)`
  && {
    display: flex;
    justify-content: center;
    text-align: center;
    width: 100%;
    color: ${(p) => p.theme.palette.danger[600]};
  }
`

export const ErrorCard = ({ error, cardTitle, resetErrorBoundary }: any) => (
  <Card title={cardTitle}>
    <Container>
      <ErrorIcon icon={['fad', 'exclamation-triangle']} />
      <ErrorAlert
        message={<CenterTitle level={4}>{error.name}</CenterTitle>}
        description={<CenterMessage>{error.message}</CenterMessage>}
        type="error"
      />
      <Space>
        <RetryButton onClick={resetErrorBoundary} />
        <SupportButton />
      </Space>
    </Container>
  </Card>
)
