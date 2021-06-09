import { Row, Typography, Tooltip } from 'antd'
import styled from '@emotion/styled'
import { inRange } from 'lodash'
import { transparentize } from 'polished'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const { Text } = Typography

const chartData = [
  { bucket: '-100 to -90', score: -95, irr: -9.13, winrate: 48 },
  { bucket: '-90 to -80', score: -85, irr: -6.1, winrate: 49 },
  { bucket: '-80 to -70', score: -75, irr: -2.57, winrate: 52 },
  { bucket: '-70 to -60', score: -65, irr: -1.55, winrate: 53 },
  { bucket: '-60 to -50', score: -55, irr: 0.5, winrate: 54 },
  { bucket: '-50 to -40', score: -45, irr: 2.12, winrate: 56 },
  { bucket: '-40 to -30', score: -35, irr: 3.95, winrate: 58 },
  { bucket: '-30 to -20', score: -25, irr: 3.97, winrate: 59 },
  { bucket: '-20 to -10', score: -15, irr: 6.22, winrate: 62 },
  { bucket: '-10 to 0', score: -5, irr: 8.06, winrate: 65 },
  { bucket: '0 to 10', score: 5, irr: 9.67, winrate: 67 },
  { bucket: '10 to 20', score: 15, irr: 10.57, winrate: 70 },
  { bucket: '20 to 30', score: 25, irr: 11.57, winrate: 72 },
  { bucket: '30 to 40', score: 35, irr: 13.09, winrate: 75 },
  { bucket: '40 to 50', score: 45, irr: 15.37, winrate: 77 },
  { bucket: '50 to 60', score: 55, irr: 17.03, winrate: 80 },
  { bucket: '60 to 70', score: 65, irr: 20.31, winrate: 82 },
  { bucket: '70 to 80', score: 75, irr: 22.89, winrate: 85 },
  { bucket: '80 to 90', score: 85, irr: 26.94, winrate: 86 },
  { bucket: '90 to 100', score: 95, irr: 30.15, winrate: 90 },
]

const getAverageResult = (score: number) => {
  if (inRange(score, -100, -90)) return chartData[0]
  if (inRange(score, -90, -80)) return chartData[1]
  if (inRange(score, -80, -70)) return chartData[2]
  if (inRange(score, -70, -60)) return chartData[3]
  if (inRange(score, -60, -50)) return chartData[4]
  if (inRange(score, -50, -40)) return chartData[5]
  if (inRange(score, -40, -30)) return chartData[6]
  if (inRange(score, -30, -20)) return chartData[7]
  if (inRange(score, -20, -10)) return chartData[8]
  if (inRange(score, -10, 0)) return chartData[9]
  if (inRange(score, 0, 10)) return chartData[10]
  if (inRange(score, 10, 20)) return chartData[11]
  if (inRange(score, 20, 30)) return chartData[12]
  if (inRange(score, 30, 40)) return chartData[13]
  if (inRange(score, 40, 50)) return chartData[14]
  if (inRange(score, 50, 60)) return chartData[15]
  if (inRange(score, 60, 70)) return chartData[16]
  if (inRange(score, 70, 80)) return chartData[17]
  if (inRange(score, 80, 90)) return chartData[18]
  if (inRange(score, 90, 101)) return chartData[19]
}

const Tag = styled.span`
  color: white;
  background: ${(p: any) => transparentize(0.2, p.theme.palette[p.color][600])};
  border: 1px solid ${(p: any) => p.theme.palette[p.color][600]};
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
  margin-left: 8px;
  text-align: right;
  font-weight: 400;
`

const Value = styled(Text)`
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
    font-size: 16px;
  }
`

const WideTooltip = styled(Tooltip)`
  .ant-tooltip-inner {
    width: 600px;
  }
`

type AIScoreReturnProps = {
  score: number
}

const PredictedTooltip = ({ result }: any) => (
  <Text style={{ color: 'white', width: 800 }}>
    The predicted annual return are based on average returns investing in a large bucket of stocks with an AI Score from{' '}
    <span style={{ fontWeight: 'bold' }}>{result.bucket.split(' to ')[0]}</span> to{' '}
    <span style={{ fontWeight: 'bold' }}>{result.bucket.split(' to ')[1]}</span>.
    <br />
    <br />
    This is an average annual return measured investing in a large basket of stocks with a similar AI Score over a long
    time period, and selling the stock if the AI Score drops significantly, or after 3.5 years, whichever comes first.
    <br />
    <br />
    <sup>*</sup>Past results does not guarantee future performance.
  </Text>
)

const AIScoreReturn = ({ score }: AIScoreReturnProps) => {
  const result: any = getAverageResult(score * 100)

  return (
    <Row justify="space-between" align="middle" style={{ padding: '6px 0' }}>
      <WideTooltip title={() => <PredictedTooltip result={result} />} getPopupContainer={(trigger) => trigger}>
        <Text>
          Avg. Estimated annual {result.irr >= 0 ? 'return' : 'loss'}
          <FontAwesomeIcon icon={['fad', 'question-circle']} style={{ marginLeft: 6 }} />
        </Text>
      </WideTooltip>
      <Tag color={result.irr >= 0 ? 'success' : 'danger'}>
        <Value>
          <FontAwesomeIcon icon={['fad', result.irr >= 0 ? 'chart-line' : 'chart-line-down']} />
          {result.irr > 0 ? '+' : ''}
          {result.irr}%
        </Value>
      </Tag>
    </Row>
  )
}

export default AIScoreReturn
