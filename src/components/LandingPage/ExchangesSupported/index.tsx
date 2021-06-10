import React from 'react'
import { Space } from 'antd'
import styled from '@emotion/styled'
import useBreakpoint from '@w11r/use-breakpoint'

import { LandingPageContainer } from 'src/ui-components'

const Title = styled.h2`
  text-align: center;
  color: ${(p) => p.theme.palette.text[300]};
  font-size: 1.6rem;
  margin-bottom: 16px;
`

const Exchange = styled.img`
  height: 80px;
  margin: 0 32px;
  padding: 16px;
  border-radius: 4px;
  &:hover {
    background-color: ${(p) => p.theme.palette.neutral[200]};
  }
`

const ExchangesSupported = () => {
  const { 'isMobile-': isMobileMinus } = useBreakpoint()

  return (
    <LandingPageContainer align="center">
      <Title>Exchanges supported</Title>
      <Space size="middle" direction={isMobileMinus ? 'vertical' : 'horizontal'}>
        <Exchange src="/logos/exchanges/nyse.svg" />
        <Exchange src="/logos/exchanges/nasdaq.svg" />
        <Exchange src="/logos/exchanges/tsx.svg" />
      </Space>
    </LandingPageContainer>
  )
}

export default ExchangesSupported
