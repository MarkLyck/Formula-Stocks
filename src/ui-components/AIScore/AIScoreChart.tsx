import dynamic from 'next/dynamic'
import styled from '@emotion/styled'
import { Card, Typography } from 'antd'
import { useTheme } from '@emotion/react'

const StyledCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0px 4px 14px 0px rgba(111, 120, 156, 0.08);

  .ant-card-body {
    display: flex;
    align-items: center;

    > div {
      width: 100%;
    }
  }
`

const DualAxes = dynamic(() => import('@ant-design/charts').then((mod) => mod.DualAxes) as any, { ssr: false })

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

const Value = styled.span`
  font-weight: bold;
  font-size: 14px;
`

const chartTooltip = (title: string, items: any[]) => (
  <>
    <h5 style={{ marginTop: 16, fontSize: 14 }}>{title}</h5>
    <ul style={{ paddingLeft: 0 }}>
      {items?.map((item, index) => {
        const { value, color } = item
        return (
          <li
            key={item.bucket}
            className="g2-tooltip-list-item"
            data-index={index}
            style={{ marginBottom: 4, display: 'flex', alignItems: 'center' }}
          >
            <span className="g2-tooltip-marker" style={{ backgroundColor: color }}></span>
            <span style={{ display: 'inline-flex', flex: 1, justifyContent: 'space-between' }}>
              <span style={{ marginRight: 16 }}>{index === 0 ? 'Annual return' : 'Win ratio'}:</span>
              <Value className="g2-tooltip-list-item-value">
                {index === 0 && value > 0 ? '+' : ''}
                {index === 0 ? Number(value).toFixed(2) : value}%
              </Value>
            </span>
          </li>
        )
      })}
    </ul>
  </>
)

const AIScoreChart = () => {
  const theme = useTheme()
  const config = {
    legend: false,
    data: [chartData, chartData],
    xField: 'bucket',
    yField: ['irr', 'winrate'],
    yAxis: {
      irr: {
        label: {
          formatter: (value: number) => `${value}%`,
        },
      },
      winrate: {
        label: {
          formatter: (value: number) => `${value}%`,
        },
      },
    },
    tooltip: {
      customContent: chartTooltip,
    },
    geometryOptions: [
      {
        geometry: 'column',
        color: (value: { bucket: string }) => {
          if (Number(value?.bucket.split(' ')[0]) < -60) return theme.palette.danger[500]
          return theme.palette.success[500]
        },
      },
      {
        geometry: 'line',
        lineStyle: { lineWidth: 2 },
        color: theme.palette.primary[600],
        point: {},
      },
    ],
  }

  return (
    <StyledCard title="AI Score performance & Win ratio chart">
      {/* @ts-ignore */}
      <DualAxes {...config} />
    </StyledCard>
  )
}

export default AIScoreChart
