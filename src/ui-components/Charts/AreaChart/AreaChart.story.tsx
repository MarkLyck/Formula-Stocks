import React from 'react'
import styled from '@emotion/styled'
import AreaChart, { AreaChartType } from './index'
import { launchPerformanceMock, backtestedPerformanceMock } from '~/../tests/mocks'
import { Card } from '~/ui-components'
import { currencyRoundedFormatter, decimalNumberFormatter } from '~/common/utils/formatters'
import theme from '~/lib/theme'

const Container = styled(Card)`
  max-width: 800px;
  width: 100%;
  padding: 0;
  overflow: hidden;

  > div {
    width: 100%;
  }
`

export default {
  title: 'Charts / area chart',
  component: AreaChart,
}

export const area_chart = (args: AreaChartType) => {
  return (
    <Container>
      <AreaChart {...args} />
    </Container>
  )
}

area_chart.args = {
  id: 'chart-id',
  data: launchPerformanceMock,
  scale: {
    market: {
      min: -50,
      max: 1600,
      alias: 'DJIA',
      formatter: (value: number) => `${value > 0 ? '+' : ''}${decimalNumberFormatter.format(value)}%`,
    },
    fs: {
      min: -50,
      max: 1600,
      alias: 'Weekly Stocktip',
      tickCount: 10,
      formatter: (value: number) => `${value > 0 ? '+' : ''}${decimalNumberFormatter.format(value)}%`,
      range: [0, 1.02],
    },
    date: {
      type: 'time',
      alias: 'date',
      mask: 'MMM YYYY',
    },
  },
  axis: [
    { name: 'market', config: false },
    {
      name: 'fs',
      config: {
        grid: {
          line: {
            style: {
              stroke: '#000',
              strokeOpacity: 0.05,
            },
          },
        },
        label: {
          offset: -8,
          formatter: (text: string) => text.replace('+', '').split('.')[0] + '%',
          style: {
            fontSize: 14,
            fontWeight: 'normal',
            fill: theme.palette.basic[1100],
          },
        },
      },
    },
  ],
}

export const log_chart = (args: AreaChartType) => {
  return (
    <Container>
      <AreaChart {...args} />
    </Container>
  )
}

log_chart.args = {
  id: 'log-chart-id',
  data: backtestedPerformanceMock,
  scale: {
    market: {
      type: 'log',
      min: 10000,
      max: 20000000000,
      alias: 'S&P 500',
      formatter: (value: number) => currencyRoundedFormatter.format(value),
    },
    fs: {
      type: 'log',
      min: 10000,
      max: 20000000000,
      alias: 'Weekly Stocktip (Backtested)',
      tickCount: 5,
      formatter: (value: number) => currencyRoundedFormatter.format(value),
      range: [0, 1.1],
    },
    date: {
      type: 'time',
      alias: 'date',
      mask: 'MMM YYYY',
    },
  },
  axis: [
    { name: 'market', config: false },
    {
      name: 'fs',
      config: {
        grid: {
          line: {
            style: {
              stroke: '#000',
              strokeOpacity: 0.05,
            },
          },
        },
        label: {
          offset: -8,
          style: {
            fontSize: 14,
            fontWeight: 500,
          },
        },
      },
    },
  ],
}
