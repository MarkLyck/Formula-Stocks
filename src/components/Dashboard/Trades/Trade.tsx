import React from 'react'
import styled from '@emotion/styled'
import { List, Card, Typography, Space, Row, Col } from 'antd'
import { ActionPill, TinyStockChart, ErrorCard } from 'src/ui-components'
import { resetApplication } from 'src/common/utils'
import { ErrorBoundary } from 'react-error-boundary'
const { Text } = Typography

const Container = styled(Card)`
  overflow: hidden;
  > .ant-card-body {
    padding: 0;
  }
`

const Trade = (trade: any) => {
  let latestPrice = trade.stock?.latestPrice

  return (
    <List.Item>
      <Container>
        <Row style={{ width: '100%' }}>
          <Col span={6}>
            <Card style={{ height: '100%' }}>
              <Space direction="vertical">
                <ActionPill action={trade.action} ticker={trade.ticker} />
                <Text style={{ fontWeight: 500 }}>{trade.name}</Text>
              </Space>
            </Card>
          </Col>
          <Col span={6}>
            <Card style={{ height: '100%' }}>AI Score</Card>
          </Col>
          <Col span={6}>
            <Card style={{ height: '100%' }}>
              <Space direction="vertical">
                <Text>Buy near</Text>
                <Text style={{ fontWeight: 500 }}>${trade.price.toFixed(2)}</Text>
              </Space>
            </Card>
          </Col>
          <Col span={6}>
            <Container style={{ height: '100%' }}>
              <Row justify="space-between" style={{ padding: 24, paddingBottom: 8 }}>
                <Text>Latest price</Text>
                {latestPrice ? <Text style={{ fontWeight: 500 }}>${latestPrice.toFixed(2)}</Text> : <Text>n/a</Text>}
              </Row>
              <TinyStockChart data={trade.stock.sixMonthsPrices} />
            </Container>
          </Col>
        </Row>
      </Container>
    </List.Item>
  )
}

const TradeWrapper = (props: any) => (
  <ErrorBoundary FallbackComponent={ErrorCard} onReset={resetApplication}>
    {Trade(props)}
  </ErrorBoundary>
)

export default TradeWrapper
