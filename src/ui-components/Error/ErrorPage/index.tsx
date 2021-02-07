import React from 'react'
import { useToggle } from 'ahooks'

import styled from '@emotion/styled'
import { Result, Button, Alert } from 'antd'
import { RetryButton, SupportButton } from 'src/ui-components'

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ErrorPage = ({ error, resetErrorBoundary }: any) => {
  const [stackTraceVisible, { toggle }] = useToggle()

  return (
    <Container>
      <Result
        status="error"
        title="Something went wrong"
        subTitle="Whoops, looks like you encountered an unexpected error!"
        extra={[
          <RetryButton type="primary" key="retry" onClick={resetErrorBoundary}>
            Refresh page
          </RetryButton>,
          <SupportButton key="support" />,
        ]}
      >
        <Alert
          message={error.name}
          description={error.message}
          showIcon
          type="error"
          action={
            <Button size="small" danger onClick={() => toggle()}>
              Details
            </Button>
          }
        />
        {stackTraceVisible && <Alert message="" description={error.stack} type="error" />}
      </Result>
    </Container>
  )
}
