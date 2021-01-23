import React from 'react'
// import { Column } from '@ant-design/charts';
import dynamic from 'next/dynamic'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { currencyRoundedFormatter } from '~/common/utils/formatters'

const Value = styled.span`
  font-weight: bold;
`

const Container = styled.div`
  canvas {
    min-height: 400px;
  }
`

const Column = dynamic(() => import('@ant-design/charts').then((mod) => mod.Column) as any, { ssr: false })

const generateTooltip = (title: string, items: any[]) => {
  let balance = 0
  if (items.length) {
    balance = Number(items[0].value) + Number(items[1].value)
  }

  return (
    <>
      <h3 style={{ marginTop: 16 }}>Year {title}</h3>
      <ul style={{ paddingLeft: 0 }}>
        {items?.map((item, i) => {
          const { name, value, color } = item
          const renderValue = currencyRoundedFormatter.format(Math.floor(i === 1 ? Number(value) : balance))
          return (
            <li
              key={item.year}
              className="g2-tooltip-list-item"
              data-index={i}
              style={{ marginBottom: 4, display: 'flex', alignItems: 'center' }}
            >
              <span className="g2-tooltip-marker" style={{ backgroundColor: color }}></span>
              <span style={{ display: 'inline-flex', flex: 1, justifyContent: 'space-between' }}>
                <span style={{ marginRight: 16 }}>{name}:</span>
                <Value className="g2-tooltip-list-item-value">{renderValue}</Value>
              </span>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export type CompoundInterestChartType = {
  data: any[]
}

const CompoundInterestChart = ({ data }: CompoundInterestChartType) => {
  const theme = useTheme()
  const chartData: any = []

  data.forEach((point: any) => {
    chartData.push({
      year: point.year,
      value: point.value - point.totalContribution,
      type: 'Future balance',
    })
    chartData.push({
      year: point.year,
      value: point.totalContribution,
      type: 'Total contribution',
    })
  })

  const getColor = (ref: any) =>
    ref.type === 'Future balance' ? theme.palette.success[500] : theme.palette.primary[500]

  const config = {
    id: 'compound-interest-chart',
    data: chartData,
    autoFit: true,
    height: 300,
    legend: false,
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    color: getColor,
    tooltip: {
      customContent: generateTooltip,
    },
    yAxis: {
      label: {
        formatter: (v: string) => currencyRoundedFormatter.format(Math.floor(Number(v))),
      },
    },
  }

  // @ts-ignore
  return (
    <Container>
      {/* @ts-ignore */}
      <Column style={{ height: '100%' }} {...config} />
    </Container>
  )
}

export default CompoundInterestChart
