import React from 'react'
import styled from '@emotion/styled'
import StockMarketStatus from './index'

const Container = styled.div`
  padding: 32px;
`

export default {
  title: 'ui components/Stock',
  decorators: [],
  component: StockMarketStatus,
}

export const stock_market_status = () => (
  <Container>
    <StockMarketStatus />
  </Container>
)
