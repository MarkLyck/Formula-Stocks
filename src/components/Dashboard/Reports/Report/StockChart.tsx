import { useQuery } from '@apollo/client'
import { Card, Typography, Space } from 'antd'
import dynamic from 'next/dynamic'
import { cloneDeep } from 'lodash'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'

import { STOCK_PRICE_HISTORY } from 'src/common/queries'
import { currencyFormatter } from 'src/common/utils/formatters'

const { Text, Title } = Typography

const Stock = dynamic(() => import('@ant-design/charts').then((mod) => mod.Stock) as any, { ssr: false })

type StockChartProps = {
  symbol: string
}

const TooltipContent = styled.div`
  padding: 24px 0;
  display: flex;
  flex-direction: column;
`

const TooltipItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 120px;
`

const chartTooltip = (title: string, items: any[], theme: any) => {
  if (!items[0]) return null
  const point = items[0].data
  console.log('🔈 ~ point', point)

  //   const value = currencyFormatter.format(items[0].data.value)

  return (
    <TooltipContent>
      <Space direction="vertical" size="middle">
        <Text>
          <b>{point.date}</b>
        </Text>
        <TooltipItem>
          <Text style={{ width: 60 }}>Open:</Text>
          <Text>
            <b>{currencyFormatter.format(point.open)}</b>
          </Text>
        </TooltipItem>
        <TooltipItem>
          <Text style={{ width: 60 }}>High:</Text>
          <Text>
            <b>{currencyFormatter.format(point.high)}</b>
          </Text>
        </TooltipItem>
        <TooltipItem>
          <Text style={{ width: 60 }}>Low:</Text>
          <Text>
            <b>{currencyFormatter.format(point.low)}</b>
          </Text>
        </TooltipItem>
        <TooltipItem>
          <Text style={{ width: 60 }}>Close:</Text>
          <Text>
            <b>{currencyFormatter.format(point.close)}</b>
          </Text>
        </TooltipItem>
        <TooltipItem>
          <Text style={{ width: 60 }}>Volume:</Text>
          <Text>
            <b>{point.volume}</b>
          </Text>
        </TooltipItem>
        <TooltipItem>
          <Text style={{ width: 60 }}>% Change:</Text>
          <Text style={{ color: point.changePercent >= 0 ? theme.palette.success[600] : theme.palette.danger[600] }}>
            <b>{point.changePercent}%</b>
          </Text>
        </TooltipItem>
      </Space>
    </TooltipContent>
  )
}

const StockChart = ({ symbol }: StockChartProps) => {
  const theme = useTheme()
  const { loading, error, data } = useQuery(STOCK_PRICE_HISTORY, {
    variables: {
      symbol,
    },
  })

  const priceHistory = data?.stockPrice?.historical || []
  const chartData = cloneDeep(priceHistory)

  var config = {
    loading,
    width: 400,
    height: 500,
    data: chartData,
    legends: false,
    xField: 'date',
    yField: ['open', 'close', 'high', 'low'],
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
  }

  return (
    <Card>
      {/* @ts-ignore */}
      <Stock {...config} />
    </Card>
  )
}

export default StockChart
