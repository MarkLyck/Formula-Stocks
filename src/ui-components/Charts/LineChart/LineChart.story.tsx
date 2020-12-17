import React from 'react'
import { withKnobs, text, number } from '@storybook/addon-knobs'
import styled from '@emotion/styled'
import LineChart, { ChartPropsType } from './index'
import { sixMonthsPricesMock } from '~/../tests/mocks'
import theme from '~/lib/theme'
import { BreathPointType } from './breathPoint'
import { LineAnnotationType, RegionFilterType } from '../types'

const Container = styled.div``

export default {
  title: 'Charts / line chart',
  decorators: [withKnobs],
  component: LineChart,
}
const scales = [
  {
    name: 'close',
    config: {
      type: 'linear',
      nice: true,
      formatter: (val: string) => `$${Number(val).toFixed(2)}`,
    },
  },
]

const createDataMarkers = (belowNumber: number) => [
  {
    date: new Date('2020.05.06'),
    value: belowNumber,
    color: 'red',
    label: 'BUY',
  },
]

const createLineAnnotations = (belowNumber: number) => {
  const lineAnnotations: LineAnnotationType[] = [
    {
      start: ['min', belowNumber],
      end: ['max', belowNumber],
      style: {
        stroke: theme.colors.primary,
        lineWidth: 2,
        lineDash: [10, 5],
      },
      text: {
        position: 'start',
        style: {
          fill: theme.colors.primary,
          fontSize: 15,
          fontWeight: '500',
        },
        content: `Buy near $${belowNumber}`,
        offsetY: -5,
        offsetX: 20,
      },
    },
  ]
  return lineAnnotations
}

const createRegionFilters = (belowNumber: number) => {
  const regionFilters: RegionFilterType[] = [
    {
      top: true,
      start: ['min', 0],
      end: ['max', belowNumber],
      color: theme.colors.primary,
    },
  ]
  return regionFilters
}

const breathPoints: BreathPointType[] = [
  {
    id: 'buy-price',
    date: '2020-05-06',
    color: theme.colors.primary,
  },
]

interface StoryChartType {
  showLineAnnotation: boolean
  showRegionFilter: boolean
  showBreathPoint: boolean
  showDataMarker: boolean
  belowNumber?: number
}

export const line_chart = ({
  showLineAnnotation,
  showRegionFilter,
  showBreathPoint,
  showDataMarker,
  belowNumber,
  ...args
}: StoryChartType & ChartPropsType) => {
  return (
    <Container>
      <LineChart
        lineAnnotations={showLineAnnotation ? createLineAnnotations(belowNumber) : undefined}
        regionFilters={showRegionFilter ? createRegionFilters(belowNumber) : undefined}
        breathPoints={showBreathPoint ? breathPoints : undefined}
        dataMarkers={showDataMarker ? createDataMarkers(belowNumber) : undefined}
        tooltipFunction={(_date: any, close: number) => {
          return {
            className: close <= belowNumber ? 'below' : 'above',
            value: `$${close}`,
          }
        }}
        {...args}
      />
    </Container>
  )
}

line_chart.args = {
  id: 'chart-id',
  data: sixMonthsPricesMock,
  scales,
  showLineAnnotation: true,
  showRegionFilter: true,
  showBreathPoint: false,
  showDataMarker: true,
  lineColor: theme.colors.text,
  belowColor: theme.colors.primary,
  belowNumber: 3.32,
  splitDate: new Date('2020.05.10'),
  splitColor: theme.colors.gray,
}

export const split_line_chart = () => {
  const lineColor = text('line Color', theme.colors.text)
  const belowColor = text('below Color', theme.colors.primary)
  const belowNumber = number('buy near', 2.98)

  return (
    <Container>
      <LineChart
        id="chart-id"
        data={sixMonthsPricesMock}
        scales={scales}
        lineColor={lineColor}
        splitDate={new Date('2020.03.10')}
        splitColor="red"
        belowColor={belowColor}
        tooltipFunction={(_date: any, close: number) => {
          return {
            className: close <= belowNumber ? 'below' : 'above',
            value: `$${close}`,
          }
        }}
      />
    </Container>
  )
}
