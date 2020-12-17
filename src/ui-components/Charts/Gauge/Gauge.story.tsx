import React from 'react'
import styled from '@emotion/styled'
import Gauge, { ChartPropsType } from './index'

const Container = styled.div`
  padding: 40px;
`

export default {
  title: 'Charts / Gauge',
  decorators: [],
  component: Gauge,
}

export const gauge = (args: ChartPropsType) => {
  return (
    <Container>
      <Gauge {...args} />
    </Container>
  )
}

gauge.argTypes = {
  value: {
    control: { type: 'range', min: -100, max: 100 },
    defaultValue: 72,
  },
}
