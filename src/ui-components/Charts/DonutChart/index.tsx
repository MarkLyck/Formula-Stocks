import dynamic from 'next/dynamic'
import { useTheme } from '@emotion/react'
import { transparentize } from 'polished'
const Pie = dynamic(() => import('@ant-design/charts').then((mod) => mod.Pie) as any, { ssr: false })

type DataValueType = {
  title: string
  value: number
}

type DonutChartProps = {
  data: DataValueType[]
}

let colorIndex = 0
const generateColor = (item: DataValueType, numberOfItems: number, theme: any) => {
  let color = transparentize((numberOfItems - colorIndex) / numberOfItems, theme.palette.primary[700])
  if (item.title === 'CASH') color = theme.palette.success[600]
  colorIndex -= 1

  return color
}

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
    statistic: {
      title: false,
      content: {
        style: {
          fontSize: '14px',
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
