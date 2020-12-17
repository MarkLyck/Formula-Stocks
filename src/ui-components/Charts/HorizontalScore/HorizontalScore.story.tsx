import React from 'react'
import styled from '@emotion/styled'
import HorizontalScore, { ChartPropsType } from './index'

const Container = styled.div`
  padding: 40px;
  width: 600px;
`

export default {
  title: 'Charts / horizontal score',
  decorators: [],
  component: HorizontalScore,
}

export const horizontal_score = (args: ChartPropsType) => {
  return (
    <Container>
      <HorizontalScore {...args} />
    </Container>
  )
}

horizontal_score.argTypes = {
  value: {
    control: { type: 'range', min: -1, max: 1, step: 0.01 },
  },
}

horizontal_score.args = {
  value: 0.72,
  label: 'Profitability',
  description: 'long description of what risk means in ai reports',
}
