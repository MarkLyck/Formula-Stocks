import React from 'react'
import styled from '@emotion/styled'
import { Card, Typography, Space, Row, Col, Tooltip, Divider, Progress } from 'antd'
import { ErrorBoundary } from 'react-error-boundary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { resetApplication } from 'src/common/utils'
import { ActionPill, ErrorCard, AIScorePreview } from 'src/ui-components'
import TradeChart from './TradeChart'

const { Text } = Typography

const Label = styled(Text)`
  color: ${(p) => p.theme.palette.neutral[600]};
`
const Value = styled(Text)`
  color: ${(p) => p.theme.palette.neutral[1000]};
  font-weight: bold;
`
const NotAvailableText = styled.span`
  color: ${(p) => p.theme.palette.neutral[600]};
`

const SmallDivider = styled(Divider)`
  margin: 8px 0;
`

const AllocationContainer = styled.div`
  .ant-progress-line {
    display: flex;
    align-items: center;
  }
  .ant-progress-text {
    width: 46px;
    font-weight: bold;
  }
`

const ArrowIcon = styled(FontAwesomeIcon)`
  color: ${(p: any) => p.theme.palette[p.higher ? 'success' : 'neutral'][600]};
  font-size: 14px;
  margin-right: 6px;
`

const QuestionIcon = styled(FontAwesomeIcon)`
  color: ${(p) => p.theme.palette.neutral[500]};
  font-size: 12px;
  margin-left: 6px;
`

const NotAvailable = () => <NotAvailableText>--</NotAvailableText>

type TradeProps = {
  trade: any
}

const Trade = ({ trade }: TradeProps) => {
  console.log('🔈 ~ trade', trade)
  let latestPrice = trade.stock?.latestPrice

  return (
    <Col span={8} style={{ marginBottom: 16 }}>
      <Card style={{ height: '100%' }}>
        <Space direction="vertical" style={{ width: '100%' }} size="small">
          <Row justify="space-between" align="middle">
            <ActionPill action={trade.action} ticker={trade.ticker} />
            <Text>
              <Label>{trade.action === 'BUY' ? 'Buy near' : 'Sold at'}</Label> <Value>${trade.price.toFixed(2)}</Value>
            </Text>
          </Row>
          <SmallDivider />
          <Row justify="space-between" align="middle">
            <TradeChart ticker={trade.ticker} name={trade.name} data={trade.stock.sixMonthsPrices} />
          </Row>
          <SmallDivider />
          <Row justify="space-between" align="middle">
            <Label>Latest price</Label>
            <Value>
              {latestPrice ? (
                <ArrowIcon
                  // @ts-ignore
                  icon={['fas', `arrow-${latestPrice > trade.price ? 'up' : 'down'}`]}
                  higher={latestPrice > trade.price}
                />
              ) : (
                ''
              )}
              {latestPrice ? `$${latestPrice.toFixed(2)}` : <NotAvailable />}
            </Value>
          </Row>
          <SmallDivider />
          {trade.action === 'SELL' && (
            <>
              <Row justify="space-between" align="middle">
                <Label>Bought at</Label>
                <Value>{trade.boughtAt ? `$${trade.boughtAt.toFixed(2)}` : <NotAvailable />}</Value>
              </Row>
              <SmallDivider />
            </>
          )}
          {trade.action === 'SELL' && (
            <>
              <Row justify="space-between" align="middle">
                <Label>Total return</Label>
                <Value>{trade.boughtAt ? `WIP` : <NotAvailable />}</Value>
              </Row>
              <SmallDivider />
            </>
          )}
          <Row justify="space-between" align="middle">
            {/* <Label>
              AI Score <FontAwesomeIcon icon={['fad', 'brain']} />
            </Label> */}
            <AIScorePreview
              score={trade.report.aIScore}
              label={
                <Label>
                  AI Score <FontAwesomeIcon icon={['fad', 'brain']} />
                </Label>
              }
            />
            {/* <Value>{(trade.report.aIScore * 100).toFixed(2)}</Value> */}
          </Row>

          {trade.action === 'BUY' && (
            <>
              <SmallDivider />
              <AllocationContainer>
                <Tooltip
                  title={`Formula Stocks increased its position in this stock by ${trade.portfolioWeight.toFixed(
                    2
                  )}% percent.`}
                >
                  <Label>
                    Allocation increase
                    <QuestionIcon icon={['fad', 'question-circle']} />
                  </Label>
                </Tooltip>
                <Progress percent={trade.portfolioWeight.toFixed(2)} />
              </AllocationContainer>
            </>
          )}
          {trade.action === 'BUY' && (
            <>
              <SmallDivider />
              <AllocationContainer>
                <Tooltip title="Total allocation percentage of this stock in the portfolio after this trade.">
                  <Label>
                    Total portfolio Allocation
                    <QuestionIcon icon={['fad', 'question-circle']} />
                  </Label>
                </Tooltip>
                <Progress percent={trade.totalPortfolioWeight.toFixed(2)} />
              </AllocationContainer>
            </>
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
