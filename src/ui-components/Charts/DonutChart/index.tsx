import dynamic from 'next/dynamic'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
const Pie = dynamic(() => import('@ant-design/charts').then((mod) => mod.Pie) as any, { ssr: false })

type DataValueType = {
  title: string
  value: number
}

type DonutChartProps = {
  data: DataValueType[]
  isLoading?: boolean
}

let colorIndex = 0
const generateColor = (item: DataValueType, numberOfItems: number, theme: any) => {
  let color = transparentize((numberOfItems - colorIndex) / numberOfItems, theme.palette.primary[700])
  if (item.title === 'CASH') color = theme.palette.success[600]
  colorIndex -= 1

  return color
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
const generateTooltip = (title: string, items: any[]) => (
  <TooltipContainer>
    <h3>
      {title}: <Value>{Number(items[0]?.value).toFixed(2)}%</Value>
    </h3>
  </TooltipContainer>
)

const DonutChart = ({ data }: DonutChartProps) => {
  const theme = useTheme()
  colorIndex = data.length

  var config = {
    data: data,
    angleField: 'value',
    colorField: 'title',
    color: (item: any) => generateColor(item, data.length, theme),
    radius: 1,
    innerRadius: 0.75,
    legend: false,
    label: false,
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    tooltip: {
      customContent: generateTooltip,
    },
    statistic: {
      title: false,
      content: {
        style: {
          fontSize: '16px',
          fontWeight: '500',
        },
        formatter: function formatter() {
          return 'Allocation'
        },
      },
    },
  }

  // @ts-ignore
  return <Pie {...config} />
}

export default DonutChart
