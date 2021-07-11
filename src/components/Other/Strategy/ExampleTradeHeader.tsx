import { Row, Typography } from 'antd'
import styled from '@emotion/styled'
import { ActionPill } from 'src/ui-components'

const { Text } = Typography

const Label = styled(Text)`
  color: ${(p) => p.theme.palette.neutral[600]};
`

const Value = styled(Text)`
  color: ${(p) => p.theme.palette.neutral[1000]};
  font-weight: bold;
`

type TradeHeaderProps = { action: 'BUY' | 'SELL'; ticker: string; price: number }

const ExampleTradeHeader = ({ action, ticker, price }: TradeHeaderProps) => (
  <Row justify="space-between" align="middle">
    <ActionPill action={action} ticker={ticker} />
    <Text>
      <Label>{action === 'BUY' ? 'Buy near' : 'Sold at'}</Label> {price && <Value>${price.toFixed(2)}</Value>}
    </Text>
  </Row>
)

export default ExampleTradeHeader
