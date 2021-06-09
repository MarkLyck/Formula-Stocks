import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { Card } from 'antd'
import dynamic from 'next/dynamic'
import { cloneDeep } from 'lodash'
import { useTheme } from '@emotion/react'

import { FMP } from 'src/common/queries'
import { currencyFormatter } from 'src/common/utils/formatters'
import IntervalSelector from './IntervalSelector'
import chartTooltip from './Tooltip'

const Stock = dynamic(() => import('@ant-design/charts').then((mod) => mod.Stock) as any, { ssr: false })

type StockChartProps = {
  symbol: string
}

const StockChart = ({ symbol }: StockChartProps) => {
  const [interval, setInterval] = useState('daily')
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
    priceHistory = data.FMP.response
  } else if (Array.isArray(data?.FMP?.response?.historical)) {
    priceHistory = data.FMP.response.historical
  }

  const chartData = cloneDeep(priceHistory)

  var config = {
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
      customContent: (title: string, items: any[]) => chartTooltip(title, items, theme),
    },
    scrollbar: { type: 'horizontal' },
  }

  return (
    <Card style={{ height: 560 }}>
      <IntervalSelector interval={interval} setInterval={setInterval} />
      {/* @ts-ignore */}
      <Stock {...config} />
    </Card>
  )
}

export default StockChart
