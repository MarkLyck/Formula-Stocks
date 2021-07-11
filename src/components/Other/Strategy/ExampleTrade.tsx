import React from 'react'
import styled from '@emotion/styled'
import { Card, Typography, Space, Row, Col, Divider } from 'antd'

import { ErrorBoundary } from 'react-error-boundary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { resetApplication } from 'src/common/utils'
import { ErrorCard, AIScorePreview } from 'src/ui-components'

import ExampleTradeHeader from './ExampleTradeHeader'

const { Text } = Typography

const Label = styled(Text)`
  color: ${(p) => p.theme.palette.neutral[600]};
`
const Value = styled(Text)`
  color: ${(p) => p.theme.palette.neutral[1000]};
  font-weight: bold;
`

const ReturnValue = styled(Text)`
  color: ${(p: any) => p.theme.palette[p.positive ? 'success' : 'danger'][600]};
  font-weight: bold;
`

const SmallDivider = styled(Divider)`
  margin: 8px 0;
`

type TradeProps = {
  action: 'BUY' | 'SELL'
  ticker: string
  date: string
  price: number
  percentReturn: number
  aiScore: number
}

const colSpan = 8

const Trade = ({ action, ticker, date, price, percentReturn, aiScore }: TradeProps) => {
  return (
    <Col span={colSpan} style={{ marginBottom: 16 }}>
      <Card style={{ height: '100%' }}>
        <Space direction="vertical" style={{ width: '100%' }} size="small">
          <ExampleTradeHeader action={action} ticker={ticker} price={price} />
          <SmallDivider />
          <Row justify="space-between" align="middle">
            <Label>Date: </Label>
            <Value>{date}</Value>
          </Row>
          <SmallDivider />
          {action === 'SELL' && (
            <>
              <Row justify="space-between" align="middle">
                <Label>Total return</Label>
                {/* @ts-ignore */}
                <ReturnValue positive={percentReturn >= 0}>
                  {`${percentReturn >= 0 ? '+' : ''}${percentReturn.toFixed(2)}%`}
                </ReturnValue>
              </Row>
            </>
          )}
          {action === 'BUY' && (
            <Row justify="space-between" align="middle">
              <AIScorePreview
                score={aiScore}
                label={
                  <Label>
                    AI Score <FontAwesomeIcon icon={['fad', 'brain']} />
                  </Label>
                }
              />
            </Row>
          )}
        </Space>
      </Card>
    </Col>
  )
}

const TradeWrapper = (props: any) => (
  <ErrorBoundary FallbackComponent={ErrorCard} onReset={resetApplication}>
    <Trade {...props} />
  </ErrorBoundary>
)

export default TradeWrapper
