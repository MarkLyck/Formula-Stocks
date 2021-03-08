import dynamic from 'next/dynamic'
import styled from '@emotion/styled'

const Radar = dynamic(() => import('@ant-design/charts').then((mod) => mod.Radar) as any, { ssr: false })

type RadarChartProps = {
  data: any[]
  color: string
}

const Value = styled.span`
  font-weight: bold;
  margin-left: 8px;
`

const TooltipContainer = styled.div`
  padding: 16px 0;

  h3 {
    margin: 0;
  }
`

const generateTooltip = (title: string, items: any[]) => {
  const realValue = Number(items[0]?.value) - 100

  return (
    <TooltipContainer>
      <h3>
        {title}:{' '}
        <Value>
          {realValue > 0 ? '+' : ''}
          {realValue.toFixed(2)}
        </Value>
      </h3>
    </TooltipContainer>
  )
}

const RadarChart = ({ data, color }: RadarChartProps) => {
  const config = {
    data: data,
    legend: false,
    padding: 32,
    xField: 'label',
    yField: 'value',
    color,
    meta: {
      value: {
        min: 0,
        minLimit: 0,
        max: 200,
        maxLimit: 200,
        nice: true,
      },
    },
    xAxis: {
      line: null,
      tickLine: null,
      label: {
        offset: 20,
      },
      grid: {
        line: {
          style: {
            lineDash: null,
          },
        },
      },
    },
    yAxis: {
      line: null,
      tickLine: null,
      label: {
        formatter: (value: string) => {
          const realValue = Number(value) - 100
          return `${realValue > 0 ? '+' : ''}${realValue}`
        },
        style: {
          opacity: 1,
        },
      },
      grid: {
        line: {
          type: 'line',
          style: {
            lineDash: null,
          },
        },
        alternateColor: 'rgba(0, 0, 0, 0.02)',
      },
    },
    tooltip: {
      customContent: generateTooltip,
    },
    point: {},
    area: {},
  }
  // @ts-ignore
  return <Radar {...config} />
}

export default RadarChart
