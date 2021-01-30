import React from 'react'
import { maxBy } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Legends, Legend } from '~/ui-components/Charts/Legends'
import { decimalNumberFormatter } from '~/common/utils/formatters'
import theme from '~/lib/theme'
import { AreaChart } from '~/ui-components'
import { GraphContainer, ChartLoaderContainer } from './styles'

interface LaunchChartType {
  isLoading: boolean
  planPerformance: any
  marketPrices: any
  marketName: string
  name: string
  id: string
}

const createChartData = (planPerformance: any, marketPrices: any) => {
  const startValue = planPerformance[0].balance
  const marketStartValue = marketPrices.length ? Number(marketPrices[0].price) : 0

  return planPerformance.map((point: any, i: number) => {
    const balance = (((planPerformance[i].balance - startValue) / startValue) * 100).toFixed(2)
    const marketBalance = marketPrices[i]
      ? (((Number(marketPrices[i].price) - marketStartValue) / marketStartValue) * 100).toFixed(2)
      : (((Number(marketPrices[marketPrices.length - 1].price) - marketStartValue) / marketStartValue) * 100).toFixed(2)

    return {
      market: Number(marketBalance),
      fs: Number(balance),
      date: point.date,
    }
  })
}

const LaunchChart = ({ isLoading, planPerformance, marketPrices, marketName, name, id }: LaunchChartType) => {
  if (isLoading) {
    return (
      <ChartLoaderContainer>
        <FontAwesomeIcon icon="spinner-third" spin size="4x" />
        <p>Loading chart</p>
      </ChartLoaderContainer>
    )
  }

  const chartData = createChartData(planPerformance, marketPrices)

  const max = Math.ceil(maxBy(chartData, (point: any) => point.fs).fs)

  const scale = {
    market: {
      min: -50,
      max,
      alias: 'DJIA',
      formatter: (value: number) => `${value > 0 ? '+' : ''}${decimalNumberFormatter.format(value)}%`,
      range: [0, 0.96],
    },
    fs: {
      min: -50,
      max,
      alias: 'Weekly Stocktip',
      tickCount: 10,
      formatter: (value: number) => `${value > 0 ? '+' : ''}${decimalNumberFormatter.format(value)}%`,
      range: [0, 0.96],
    },
    date: {
      type: 'time',
      alias: 'date',
      mask: 'MMM YYYY',
    },
  }

  const axis = [
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
            fill: theme.palette.neutral[1100],
          },
        },
      },
    },
  ]

  return (
    <GraphContainer>
      {/* @ts-ignore */}
      <Legends horizontal left={40} top={8}>
        {/* @ts-ignore */}
        <Legend color={theme.palette.primary[600]} width={40}>
          <p>{name}</p>
        </Legend>
        <Legend color={theme.palette.neutral[1200]}>
          <p>{marketName}</p>
        </Legend>
      </Legends>
      <AreaChart id={id} data={chartData} scale={scale} axis={axis} />
    </GraphContainer>
  )
}

export default LaunchChart
