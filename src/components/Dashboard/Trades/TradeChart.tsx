import { TinyStockChart } from 'src/ui-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from '@emotion/styled'

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
  top: 0;
  left: 0;
  color: ${(p) => p.theme.palette.neutral[600]};
`

const TradeChart = ({ ticker, name, data }: TradeChartProps) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <ChartUnavailableContainer>
        <Name>{name}</Name>
        <FontAwesomeIcon icon={['fad', 'exclamation-triangle']} />
        Chart unavailable {ticker?.includes('_TO') ? 'for TSX stocks' : ''}
      </ChartUnavailableContainer>
    )
  }

  return (
    <ChartContainer>
      <Name>{name}</Name>
      <TinyStockChart data={data} height={100} />
    </ChartContainer>
  )
}

export default TradeChart
