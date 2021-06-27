import React from 'react'
import styled from '@emotion/styled'
import { Typography, Card } from 'antd'

import Navbar from '../Navbar'

const { Title, Paragraph } = Typography

const RiskContainer = styled.div`
  background: ${(props) => props.theme.palette.neutral[200]};
  box-sizing: border-box;
  padding-bottom: 32px;
`

const Content = styled(Card)`
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  padding: 0 32px;
  padding-top: 100px;
  margin-bottom: 32px;

  background: white;
`

const Strategy = () => {
  return (
    <>
      {/* @ts-ignore */}
      <Navbar />
      <RiskContainer>
        <Content>
          <Title>Strategy</Title>
          <Paragraph>...</Paragraph>
        </Content>
      </RiskContainer>
    </>
  )
}

export default Strategy
