import React from 'react'
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs'
import styled from '@emotion/styled'
import { StockReturn } from './index'

const Container = styled.div`
  padding: 32px;
`

export default {
  title: 'ui components / Stock',
  decorators: [withKnobs],
}

export const stock_return = () => {
  const percentReturn = number('percent return', 10.97)
  const loading = boolean('loading', false)
  const positiveColor = text('positiveColor', '')
  const negativeColor = text('negativeColor', '')

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
