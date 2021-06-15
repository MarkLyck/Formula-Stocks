import { Spin, Space, Card, Typography, Empty } from 'antd'
import styled from '@emotion/styled'
import { useQuery } from '@apollo/client'
import { numberFormatter } from 'src/common/utils/formatters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { FMP } from 'src/common/queries'

const { Text, Title } = Typography

const TransactionIcon = styled(FontAwesomeIcon)`
  margin-right: 8px;
  color: ${(p: any) => (p.acquired ? p.theme.palette.success[600] : p.theme.palette.danger[600])};
`

const InsiderTrading = ({ symbol }: any) => {
  const { data, loading } = useQuery(FMP, {
    variables: {
      endpoint: `https://financialmodelingprep.com/api/v4/insider-trading?symbol=${symbol}&limit=100`,
    },
  })

  if (loading) {
    return (
      <Card>
        <Spin />
      </Card>
    )
  }

  const insiderTrades = data?.FMP.response || []

  if (insiderTrades.length === 0) {
    return (
      <Card>
        <Empty description="No insider trades found" />
      </Card>
    )
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {insiderTrades.map((trade: any) => {
        const numberOfShares = numberFormatter.format(trade.securitiesTransacted)
        const acquired = trade.acquistionOrDisposition === 'A'
        let title = ''

        if (trade.transactionType === 'S-Sale') {
          title = `Sold ${numberOfShares} ${trade.securityName} (S)`
        } else if (trade.transactionType === 'M-Exempt') {
          title = `Excercised options for ${numberOfShares} ${trade.securityName} (M)`
        } else if (trade.transactionType === 'F-InKind') {
          title = `Payment using ${numberOfShares} ${trade.securityName} (F)`
        } else if (trade.transactionType === 'A-Award') {
          title = `Awarded ${numberOfShares} ${trade.securityName} (A)`
        } else if (trade.transactionType === 'G-Gift') {
          title = `Gift of ${numberOfShares} ${trade.securityName} (G)`
        } else if (trade.transactionType === 'C-Conversion') {
          title = `Converted ${numberOfShares} ${trade.securityName} (C)`
        } else if (trade.transactionType === 'D-Return') {
          title = `Returned ${numberOfShares} ${trade.securityName} back to company (D)`
        } else if (trade.transactionType === 'P-Purchase') {
          title = `Purchased ${numberOfShares} ${trade.securityName} (P)`
        } else if (trade.transactionType === 'W-Will') {
          title = `${numberOfShares} ${trade.securityName} transacted by will (W-Will)`
        } else if (trade.transactionType === 'J-Other') {
          title = `${numberOfShares} ${trade.securityName} transacted (J-Other)`
        }

        return (
          <Card
            title={
              <Title level={5}>
                {/* @ts-ignore */}
                <TransactionIcon icon={['fad', `${acquired ? 'plus' : 'minus'}-circle`]} acquired={acquired} />
                {title}
              </Title>
            }
            extra={<Text>{trade.transactionDate}</Text>}
          >
            <Space direction="vertical">
              <Text>
                <b>{trade.reportingName}</b> ({trade.typeOfOwner})
              </Text>
              <Text>
                {trade.securityName} owned: <b>{numberFormatter.format(trade.securitiesOwned)}</b>
              </Text>
            </Space>
          </Card>
        )
      })}
    </Space>
  )
}

export default InsiderTrading
