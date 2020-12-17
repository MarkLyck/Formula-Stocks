import React from 'react'
import styled from '@emotion/styled'
import { StockReturn } from './index'

const Container = styled.div`
  padding: 32px;
`

export default {
  title: 'ui components / Stock',
}

export const stock_return = () => {
  const percentReturn = 10.97
  const loading = false
  const positiveColor = ''
  const negativeColor = ''

  return (
    <Container>
      <StockReturn
        percentReturn={percentReturn}
        loading={loading}
        positiveColor={positiveColor}
        negativeColor={negativeColor}
      />
    </Container>
  )
}
