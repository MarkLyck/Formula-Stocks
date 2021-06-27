import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { Card, Space } from 'antd'
import dynamic from 'next/dynamic'
import { cloneDeep } from 'lodash'
import { useTheme } from '@emotion/react'
import { minBy } from 'lodash'

import { FMP } from 'src/common/queries'
import { currencyFormatter } from 'src/common/utils/formatters'
import IntervalSelector from './IntervalSelector'
import ChartSelector from './ChartSelector'
import { stockChartTooltip, lineChartTooltip } from './Tooltip'

const Stock = dynamic(() => import('@ant-design/charts').then((mod) => mod.Stock) as any, { ssr: false })
const Area = dynamic(() => import('@ant-design/charts').then((mod) => mod.Area) as any, { ssr: false })

type StockChartProps = {
  symbol: string
}

const StockChart = ({ symbol }: StockChartProps) => {
  const [interval, setInterval] = useState('daily')
  const [chartType, setChartType] = useState('line')
  const theme = useTheme()

  const { loading, data } = useQuery(FMP, {
    variables: {
      endpoint:
        interval === 'daily'
          ? `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}`
          : `https://financialmodelingprep.com/api/v3/historical-chart/${interval}/${symbol}`,
    },
  })

  let priceHistory = []
  if (Array.isArray(data?.FMP?.response)) {
    priceHistory = data.FMP.response.slice().reverse()
  } else if (Array.isArray(data?.FMP?.response?.historical)) {
    priceHistory = data.FMP.response.historical.slice().reverse()
  }

  const min: any = minBy(priceHistory, 'close')
  const chartData = cloneDeep(priceHistory)

  const stockConfig = {
    loading,
    width: 400,
    height: 500,
    data: chartData,
    legend: false,
    xField: 'date',
    yField: ['close', 'open', 'high', 'low'],
    yAxis: {
      label: {
        labelLine: null,
        formatter: (v: number) => `${currencyFormatter.format(v)}`,
        style: {
          fill: '#A0A5B2',
        },
      },
      grid: {
        line: {
          style: {
            stroke: '#EFF4F7',
            lineWidth: 1,
          },
        },
      },
    },
    tooltip: {
      customContent: (title: string, items: any[]) => stockChartTooltip(title, items, theme),
    },
    slider: {
      start: 0.8,
      end: 1,
    },
  }

  const lineConfig = {
    loading,
    width: 400,
    height: 500,
    data: chartData,
    legend: false,
    xField: 'date',
    yField: 'close',
    yAxis: {
      min: min?.close,
      minLimit: min?.close,
      label: {
        labelLine: null,
        formatter: (v: number) => `${currencyFormatter.format(v)}`,
        style: {
          fill: '#A0A5B2',
        },
      },
      grid: {
        line: {
          style: {
            stroke: '#EFF4F7',
            lineWidth: 1,
          },
        },
      },
    },
    tooltip: {
      customContent: (title: string, items: any[]) => lineChartTooltip(title, items),
    },
    slider: {
      start: 0.8,
      end: 1,
    },
  }

  return (
    <Card
      title="Price chart"
      extra={
        <Space>
          <IntervalSelector interval={interval} setInterval={setInterval} />
          <ChartSelector interval={interval} chartType={chartType} setChartType={setChartType} />
        </Space>
      }
    >
      {/* @ts-ignore */}
      {chartType === 'line' ? <Area {...lineConfig} /> : <Stock {...stockConfig} />}
    </Card>
  )
}

export default StockChart
