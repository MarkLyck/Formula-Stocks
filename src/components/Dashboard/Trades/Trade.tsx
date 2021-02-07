import React from 'react'
import { List, Card, Typography, Space } from 'antd'
import { Ticker } from 'src/ui-components'

const { Text } = Typography

const Trade = (trade: any) => {
  const Title = (
    <Space>
      <Text>{trade.action}</Text>
      <Ticker ticker={trade.ticker} />
      <Text>{trade.name}</Text>
    </Space>
  )

  return (
    <List.Item>
      <Card title={Title}>
        <Text>card content</Text>
      </Card>
    </List.Item>
  )
}

export default Trade
