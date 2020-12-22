import React from 'react'
import maxBy from 'lodash.maxby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Legends, Legend } from '~/ui-components/Charts/Legends'
import { currencyRoundedFormatter } from '~/common/utils/formatters'
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
  const startingValue = 25000
  let lastMarketBalance = startingValue
  return planPerformance.map((point: any, i: number) => {
    let balance = startingValue
    let marketBalance = startingValue

    let marketPercentIncrease = 0
    if (marketPrices[i]) {
      marketPercentIncrease = (marketPrices[i].price - marketPrices[0].price) / marketPrices[0].price
    }

    if (planPerformance[i] && i !== 0) {
      balance = planPerformance[i].balance
    }
    if (marketPrices[i] && marketPrices[i].price) {
      marketBalance = startingValue + Math.floor(marketPercentIncrease * startingValue)
      lastMarketBalance = marketBalance
    } else if (i !== 0 && planPerformance[i - 1] !== startingValue) {
      marketBalance = lastMarketBalance
    }

    return {
      market: Number(marketBalance) || 0,
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
      type: 'log',
      min: 10000,
      max,
      alias: 'S&P 500',
      formatter: (value: number) => currencyRoundedFormatter.format(value),
      range: [0, 1.1],
    },
    fs: {
      type: 'log',
      min: 10000,
      max,
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
          style: {
            fontSize: 14,
            fontWeight: 500,
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
        <Legend color={theme.palette.primary[500]} width={40}>
          <p>{name}</p>
        </Legend>
        <Legend color={theme.colors.black}>
          <p>{marketName}</p>
        </Legend>
      </Legends>
      <AreaChart id={id} data={chartData} scale={scale} axis={axis} />
    </GraphContainer>
  )
}

export default LaunchChart
