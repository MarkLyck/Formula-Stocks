import { Card } from 'antd'
import dynamic from 'next/dynamic'
import styled from '@emotion/styled'
import { numberFormatter } from 'src/common/utils/formatters'
import { calculateGrowthRateByYear } from './utils/growthRates'

import GrowthRates from './GrowthRates'

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
  incomeStatements: any[]
}

const Earnings = ({ incomeStatements }: ROICProps) => {
  const EPSPerYear: any[] = incomeStatements.map((statement) => ({ date: statement.date, value: statement.eps }))
  const { growthRates } = calculateGrowthRateByYear(EPSPerYear.map((item) => item.value))

  var config = {
    data: EPSPerYear,
    xField: 'date',
    yField: 'value',
    tooltip: {
      customContent: (_: string, points: [any]) => {
        const value = points[0]?.value
        return (
          <TooltipContainer>
            <ValueText>${value ? Number(value).toFixed(2) : ''}</ValueText>
          </TooltipContainer>
        )
      },
    },
    yAxis: {
      label: {
        formatter: (v: string) => `$${numberFormatter.format(Math.floor(Number(v)))}`,
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
    legend: false,
  }

  return (
    <>
      <Card title="Earnings (Earnings Per Share)">
        {/* @ts-ignore */}
        <Column {...config} />
      </Card>
      <GrowthRates growthRates={growthRates} />
    </>
  )
}

export default Earnings
