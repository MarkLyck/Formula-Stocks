import { TinyStockChart } from 'src/ui-components'
import { useQuery } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from '@emotion/styled'

import { STOCK_PRICE_HISTORY_SIMPLE } from 'src/common/queries'

type TradeChartProps = {
  ticker: string
  name: string
  data: any[]
}

const ChartContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
`

const ChartUnavailableContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  background: ${(p) => p.theme.palette.neutral[200]};
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.palette.neutral[600]};

  svg {
    margin-bottom: 4px;
    font-size: 20px;
  }
`

const Name = styled.div`
  position: absolute;
  top: ${(p: { unavailable?: boolean }) => (p.unavailable ? '8px' : '0')};
  left: ${(p: { unavailable?: boolean }) => (p.unavailable ? '8px' : '0')};
  color: ${(p) => p.theme.palette.neutral[600]};
`

const TradeChart = ({ ticker, name }: TradeChartProps) => {
  const { data, loading } = useQuery(STOCK_PRICE_HISTORY_SIMPLE, {
    variables: {
      symbol: ticker,
    },
  })

  const historicalData = data?.stockPrice?.historicalSimple || []
  const sixMonthsdata = historicalData.slice(0, 180)

  if (!loading && (!Array.isArray(sixMonthsdata) || sixMonthsdata.length === 0)) {
    return (
      <ChartUnavailableContainer>
        <Name unavailable>{name}</Name>
        <FontAwesomeIcon icon={['fad', 'exclamation-triangle']} />
        Chart unavailable {ticker?.includes('_TO') ? 'for TSX stocks' : ''}
      </ChartUnavailableContainer>
    )
  }

  return (
    <ChartContainer>
      <Name>{name}</Name>
      <TinyStockChart data={sixMonthsdata} height={100} loading={loading} />
    </ChartContainer>
  )
}

export default TradeChart
