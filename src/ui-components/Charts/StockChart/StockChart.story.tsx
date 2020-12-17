import React from 'react'
import styled from '@emotion/styled'
import StockChart from './index'
import { sixMonthsPricesMock } from '~/../tests/mocks'
import theme from '~/lib/theme'
import { LineAnnotationType, RegionFilterType } from '../types'

const Container = styled.div``

export default {
  title: 'Charts / stock chart',
  component: StockChart,
}

const createLineAnnotations = (belowNumber: number) => {
  const lineAnnotations: LineAnnotationType[] = [
    {
      start: ['min', belowNumber],
      end: ['max', belowNumber],
      style: {
        stroke: theme.palette.primary[500],
        lineWidth: 2,
        lineDash: [10, 5],
      },
      text: {
        position: 'start',
        style: {
          fill: theme.palette.primary[500],
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
      color: theme.palette.primary[500],
    },
  ]
  return regionFilters
}

export const stock_chart = () => {
  const showLineAnnotation = true
  const showRegionFilter = true
  const belowNumber = 3.34

  return (
    <Container>
      <StockChart
        id="stock-chart-id"
        data={sixMonthsPricesMock}
        lineAnnotations={showLineAnnotation ? createLineAnnotations(belowNumber) : undefined}
        regionFilters={showRegionFilter ? createRegionFilters(belowNumber) : undefined}
        tooltipFunction={(open: number, close: number, high: number, low: number) => {
          return {
            className: close <= belowNumber ? 'below' : 'above',
            value: `
            <ul class="stock-range-tooltip-list">
              <li><div class="label">Close:</div><span class="value">$${Number(close).toFixed(2)}</span></li>
              <li><div class="label">Open:</div><span class="value">$${Number(open).toFixed(2)}</span></li>
              <li><div class="label">High:</div><span class="value">$${Number(high).toFixed(2)}</span></li>
              <li><div class="label">Low:</div><span class="value">$${Number(low).toFixed(2)}</span></li>
            </ul>
            `,
          }
        }}
      />
    </Container>
  )
}
