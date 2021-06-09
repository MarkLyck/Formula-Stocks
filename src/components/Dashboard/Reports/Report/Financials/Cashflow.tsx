import { Card } from 'antd'
import dynamic from 'next/dynamic'
import styled from '@emotion/styled'
import { currencyFormatter } from 'src/common/utils/formatters'
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

type CashflowProps = {
  cashflowStatements: any[]
}

const Cashflow = ({ cashflowStatements }: CashflowProps) => {
  const revenues: any[] = cashflowStatements.map((statement) => ({
    date: statement.date,
    value: statement.freeCashFlow,
  }))

  const { growthRates } = calculateGrowthRateByYear(revenues.map((item) => item.value))

  var config = {
    data: revenues,
    xField: 'date',
    yField: 'value',
    tooltip: {
      customContent: (_: string, points: [any]) => {
        const value = points[0]?.value
        return (
          <TooltipContainer>
            <ValueText>{value ? currencyFormatter.format(value) : ''}</ValueText>
          </TooltipContainer>
        )
      },
    },
    yAxis: {
      label: {
        formatter: (v: string) => `${currencyFormatter.format(Math.floor(Number(v)))}`,
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
      <Card title="Cashflow (Free Cashflow)">
        {/* @ts-ignore */}
        <Column {...config} />
      </Card>
      <GrowthRates growthRates={growthRates} />
    </>
  )
}

export default Cashflow
