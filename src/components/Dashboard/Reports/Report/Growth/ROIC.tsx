import { Card } from 'antd'
import dynamic from 'next/dynamic'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { numberFormatter } from 'src/common/utils/formatters'

const TooltipContainer = styled.div`
  padding: 16px;
`

const ValueText = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 1rem;
`

const Column = dynamic(() => import('@ant-design/charts').then((mod) => mod.Column) as any, { ssr: false })

type ROICProps = {
  keyMetrics: any[]
}

const ROIC = ({ keyMetrics }: ROICProps) => {
  const theme = useTheme()
  const roicData = keyMetrics.map((metrics) => ({ date: metrics.date, value: metrics.roic * 100 }))
  const dateMap = roicData.reduce((acc: any, curr: any) => {
    acc[curr.date] = curr.value
    return acc
  }, {})

  var config = {
    data: roicData,
    xField: 'date',
    yField: 'value',
    tooltip: {
      customContent: (_: string, points: [any]) => {
        const value = points[0]?.value
        return (
          <TooltipContainer>
            <ValueText>{value ? Number(value).toFixed(2) : ''}%</ValueText>
          </TooltipContainer>
        )
      },
    },
    yAxis: {
      label: {
        formatter: (v: string) => `${numberFormatter.format(Math.floor(Number(v)))}%`,
        style: {
          fill: '#A0A5B2',
        },
      },
      grid: {
        line: {
          style: {
            stroke: '#EFF4F7',
            lineWidth: 1,
          },
        },
      },
    },
    color: (item: any) => {
      if (dateMap[item.date] < 0) {
        return theme.palette.danger[600]
      }
      return theme.palette.primary[500]
    },
    legend: false,
  }

  return (
    <Card title="ROIC (Return on invested capital)">
      {/* @ts-ignore */}
      <Column {...config} />
    </Card>
  )
}

export default ROIC
