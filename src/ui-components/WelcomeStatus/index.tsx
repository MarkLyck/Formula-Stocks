import React from 'react'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { COMPANY_NAME } from 'src/common/constants'

const { Title, Text } = Typography

const WelcomeTitle = styled(Title)`
  && {
    margin-bottom: 4px;
  }
`

export const WelcomeStatus = () => {
  return (
    <div>
      <WelcomeTitle level={3}>Welcome to {COMPANY_NAME}</WelcomeTitle>
      <Text>The stock market is currently: Open</Text>
    </div>
  )
}
