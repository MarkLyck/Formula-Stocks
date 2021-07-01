import React from 'react'
import { Modal, Card, Table, Divider, Space } from 'antd'
import dayjs from 'dayjs'
import { useQuery } from '@apollo/client'
import { useTheme } from '@emotion/react'
import { TRADE_HISTORY } from 'src/common/queries'
import { ScatterChart } from 'src/ui-components/Charts'
import { ActionPill, StockReturn, StatisticsCard, Tag } from 'src/ui-components/'
import { numberFormatter } from 'src/common/utils/formatters'

interface PastTradesModalProps {
  isVisible: boolean
  onClose: () => any
}

const columns = [
  {
    title: 'Trade',
    dataIndex: 'symbol',
    key: 'symbol',
    render: (value: string) => <ActionPill ticker={value} action="SELL" />,
  },
  {
    title: 'Buy date',
    dataIndex: 'startDate',
    key: 'startDate',
  },
  {
    title: 'Sell date',
    dataIndex: 'endDate',
    key: 'endDate',
  },
  {
    title: 'Bought at',
    dataIndex: 'buyPrice',
    key: 'buyPrice',
    render: (value: number) => `$${value.toFixed(2)}`,
  },
  {
    title: 'Sold at',
    dataIndex: 'sellPrice',
    key: 'sellPrice',
    render: (value: number) => `$${value.toFixed(2)}`,
  },
  {
    title: 'Return',
    dataIndex: 'percentIncrease',
    key: 'percentIncrease',
    render: (value: number) => <StockReturn percentReturn={value} />,
  },
]

const PastTradesModal = ({ isVisible, onClose }: PastTradesModalProps) => {
  const theme = useTheme()
  const { data, loading } = useQuery(TRADE_HISTORY, { variables: { planName: 'entry' } })
  const trades = data?.tradeHistoriesList?.items || []
  const finalTrades = trades
    .map((trade: any) => {
      const endDate = dayjs(trade.endDate)
      const date1YearAgo = dayjs().subtract(1, 'year')
      const isWithin1Year = endDate.isAfter(date1YearAgo)

      return { ...trade, symbol: isWithin1Year ? trade.symbol : trade.obfuscatedSymbol }
    })
    .reverse()

  const numberOfProfitableTrades = finalTrades.filter((trade: any) => trade.percentIncrease >= 0).length
  const numberOfLosingTrades = finalTrades.length - numberOfProfitableTrades

  return (
    <Modal title="Historical trades" visible={isVisible} onOk={onClose} onCancel={onClose} footer={null} width={1200}>
      <Card title="Scatter plot of all historical trades">
        <ScatterChart data={finalTrades} loading={loading} />
      </Card>
      <Divider />
      <Space style={{ width: '100%' }}>
        <StatisticsCard icon="tally" color="success">
          Total number of trades:{' '}
          <Tag color={theme.palette.text[500]} backgroundColor={theme.palette.neutral[300]}>
            {numberFormatter.format(trades.length)}
          </Tag>
        </StatisticsCard>
        <StatisticsCard icon="chart-line" color={theme.palette.success[600]}>
          Trades sold with a profit:{' '}
          <Tag color={theme.palette.success[600]} backgroundColor={theme.palette.success[100]}>
            {numberFormatter.format(numberOfProfitableTrades)}
          </Tag>
        </StatisticsCard>
        <StatisticsCard icon="chart-line-down" color={theme.palette.danger[600]}>
          Trades sold with a loss:{' '}
          <Tag color={theme.palette.danger[600]} backgroundColor={theme.palette.danger[100]}>
            {numberFormatter.format(numberOfLosingTrades)}
          </Tag>
        </StatisticsCard>
      </Space>
      <Divider />
      <Table dataSource={finalTrades} columns={columns} size="small" />
    </Modal>
  )
}

export default PastTradesModal
