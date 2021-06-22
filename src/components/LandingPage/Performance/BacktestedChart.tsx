import React from 'react'

import dayjs from 'dayjs'
import { maxBy } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Legends, Legend } from 'src/ui-components/Charts/Legends'
import { currencyRoundedFormatter } from 'src/common/utils/formatters'
import theme from 'src/lib/theme'
import { AreaChart } from 'src/ui-components'
import { GraphContainer, ChartLoaderContainer } from './styles'

interface BacktestedChartType {
  isLoading: boolean
  error: any
  planPerformance: any
  marketPrices: any
  marketName: string
  name: string
  log: boolean
}

let lastPlanDate = new Date()
const createPlanData = (data: any[]) => {
  // @ts-ignore
  lastPlanDate = dayjs(data[data.length - 1].date).endOf('day')

  return data.map((point: any, i: number) => {
    const balance = data[i].balance
    const dayjsDate = dayjs(point.date).startOf('day')

    return {
      value: Number(balance),
      backtested: dayjsDate.isAfter(dayjs('2009-01-01')) ? false : true,
      type: `Formula Stocks`,
      date: dayjsDate.toDate(),
    }
  })
}
const createMarketData = (data: any[]) => {
  const marketStartValue = data[0]?.price || 1
  const startValue = 25000

  return data.map((point: any, i: number) => {
    const percentIncrease = (data[i].price - marketStartValue) / marketStartValue

    return {
      value: Number(startValue + Math.floor(percentIncrease * startValue)),
      type: 'S&P500',
      date: dayjs(new Date(point.date)).startOf('day').toDate(),
    }
  })
}

const dollarFormatterRounded = (value: number) => currencyRoundedFormatter.format(value)

const MARKET_CRASHES = [
  {
    label: '1973-1974 Crash',
    date: '09-31-1974',
    offsetY: -7,
    lineHeight: 15,
  },
  {
    label: 'Black Monday',
    date: '10-31-1987',
    offsetY: -2,
    lineHeight: 10,
  },
  {
    label: '1990s Recession',
    date: '10-31-1990',
  },
  {
    label: 'Dot-Com Bubble',
    date: '06-30-2000',
    offsetY: 12,
  },
  {
    label: 'Financial Crisis',
    date: '02-28-2009',
  },
  {
    label: 'Stock market sell-off',
    date: '01-31-2016',
  },
  {
    label: 'Covid-19',
    date: '03-31-2020',
  },
]

const BacktestedHistoryChart = ({
  isLoading,
  error,
  planPerformance,
  marketPrices,
  marketName,
  name,
  log,
}: BacktestedChartType) => {
  if (error) {
    return (
      <ChartLoaderContainer>
        <FontAwesomeIcon icon={['fad', 'exclamation-triangle']} size="4x" />
        <p>Error loading chart</p>
      </ChartLoaderContainer>
    )
  }
  if (isLoading) {
    return (
      <ChartLoaderContainer>
        <FontAwesomeIcon icon="spinner-third" spin size="4x" />
        <p>Loading chart</p>
      </ChartLoaderContainer>
    )
  }

  const planData: any[] = createPlanData(planPerformance)
  const marketData: any[] = createMarketData(marketPrices).filter((point) => dayjs(point.date).isBefore(lastPlanDate))
  const chartData = [...planData, ...marketData]

  const max = Math.ceil(maxBy(chartData, (point: any) => point.value).value)

  const annotations = MARKET_CRASHES.map((crash) => ({
    type: 'dataMarker',
    position: (xScale: any, yScale: any) => {
      const dates = xScale.values
      const values = yScale.value.values
      let valueIndex = 0

      dates.forEach((date: any, i: number) => {
        if (dayjs(date).format('MM-DD-YYYY') === crash.date) {
          valueIndex = i
        }
      })

      const valueAtDate = values[valueIndex]
      return [crash.date, valueAtDate]
    },
    offsetY: crash.offsetY || 15,
    text: {
      content: crash.label,
      style: { textAlign: 'right' },
    },
    point: false,
    line: { length: crash.lineHeight || 40 },
  }))

  const observedRegion = {
    type: 'region',
    // @ts-ignore
    start: () => ['01-31-2009', 'min'],
    end: () => ['2050', 'max'],
  }
  // @ts-ignore
  annotations.push(observedRegion)

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
      <AreaChart
        data={chartData}
        max={max}
        min={15000}
        dateMask="YYYY"
        labelFormatter={dollarFormatterRounded}
        tooltipValueFormatter={dollarFormatterRounded}
        annotations={log ? annotations : [observedRegion]}
        log={log}
      />
    </GraphContainer>
  )
}

export default BacktestedHistoryChart
