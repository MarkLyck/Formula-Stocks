import { Row, Typography } from 'antd'
import styled from '@emotion/styled'
import { ActionPill } from 'src/ui-components'

type TradeHeaderProps = { trade: any }

const { Text } = Typography

const Label = styled(Text)`
  color: ${(p) => p.theme.palette.neutral[600]};
`

const Value = styled(Text)`
  color: ${(p) => p.theme.palette.neutral[1000]};
  font-weight: bold;
`

const TradeHeader = ({ trade }: TradeHeaderProps) => (
  <Row justify="space-between" align="middle">
    <ActionPill action={trade.action} ticker={trade.ticker} />
    <Text>
      <Label>{trade.action === 'BUY' ? 'Buy near' : 'Sold at'}</Label> <Value>${trade.price.toFixed(2)}</Value>
    </Text>
  </Row>
)

export default TradeHeader
