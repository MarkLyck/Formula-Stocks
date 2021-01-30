import React from 'react'
import { useQuery } from '@apollo/client'
import { PORTFOLIO_HOLDINGS } from '~/common/queries'
import { Table, Progress, Typography } from 'antd'
import { calculatePercentIncrease } from 'src/common/utils'
import { StockReturn } from 'src/ui-components'

const { Text, Title } = Typography

type HoldingType = {
  date: string
  daysOwned: number
  dividends: number
  name: string
  numberHeld: number
  percentageWeight: number
  price: number
  purchasePrice: number
  stock: {
    date: string
    latestPrice: number
  }
  ticker: string
}

const columns = [
  {
    title: 'Company',
    dataIndex: 'name',
    key: 'name',
    render: (text: any, item: any) => {
      if (item.ticker === 'CASH') {
        return <Text>Cash</Text>
      }

      return (
        <Text>
          {text} - {item.ticker}
        </Text>
      )
    },
    sorter: (a: any, b: any) => (a.name < b.name ? -1 : 1),
  },
  {
    title: 'Allocation',
    key: 'percentageWeight',
    dataIndex: 'percentageWeight',
    render: (value: number) => <Progress percent={Number(value.toFixed(2))} />,
    sorter: (a: HoldingType, b: HoldingType) => a.percentageWeight - b.percentageWeight,
  },
  {
    title: 'Basis price',
    key: 'purchasePrice',
    dataIndex: 'purchasePrice',
    render: (value: number) => {
      if (!value) return null

      return <Text>${value.toFixed(2)}</Text>
    },
    sorter: (a: HoldingType, b: HoldingType) => a.purchasePrice - b.purchasePrice,
  },
  {
    title: 'Latest price',
    key: 'latestPrice',
    render: (_value: number, item: any) => {
      const price = item.stock?.latestPrice || item.price
      if (!price) return null

      return <Text>${price.toFixed(2)}</Text>
    },
    sorter: (a: HoldingType, b: HoldingType) => (a.stock?.latestPrice || a.price) - b.purchasePrice,
  },
  {
    title: 'Unrealized Return',
    key: 'unrealized_return',
    render: (_value: any, item: any) => {
      if (item.ticker === 'CASH') return null
      const increase = calculatePercentIncrease(item.purchasePrice, item.stock?.latestPrice || item.price)
      return <StockReturn percentReturn={increase} />
    },
    sorter: (a: HoldingType, b: HoldingType) => {
      const aIncrease = calculatePercentIncrease(a.purchasePrice, a.stock?.latestPrice || a.price)
      const bIncrease = calculatePercentIncrease(b.purchasePrice, b.stock?.latestPrice || b.price)
      return aIncrease - bIncrease
    },
  },
  {
    title: 'Days held',
    key: 'daysOwned',
    dataIndex: 'daysOwned',
    sorter: (a: HoldingType, b: HoldingType) => a.daysOwned - b.daysOwned,
  },
]

const Holdings = () => {
  const { data, loading } = useQuery(PORTFOLIO_HOLDINGS, {
    variables: { planName: 'entry' },
  })

  const holdings: HoldingType[] = data?.portfolioHoldingsList?.items || []

  return (
    <div>
      <Title level={4}>Portfolio</Title>
      <Table loading={loading} columns={columns} dataSource={holdings} pagination={false} />
    </div>
  )
}

export default Holdings
