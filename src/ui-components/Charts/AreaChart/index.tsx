import dynamic from 'next/dynamic'
import { useTheme } from '@emotion/react'
import Tooltip from './Tooltip'

const Area = dynamic(() => import('@ant-design/charts').then((mod) => mod.Area) as any, { ssr: false })

type DataType = {
  value: number
  type: string
  date: Date
}
type AreaChartProps = {
  data: DataType[]
  height?: number
  max: number
  min: number
}

const AreaChart = ({ data, height = 600, max, min }: AreaChartProps) => {
  const theme = useTheme()

  const config = {
    data,
    nice: false,
    padding: [8, 0, 0, 0],
    style: {
      width: '100%',
      height,
    },
    isStack: false,
    legend: false,
    areaStyle: { fillOpacity: 0.5 },
    tooltip: {
      customContent: Tooltip,
    },
    xField: 'date',
    xAxis: {
      nice: false,
      type: 'time',
      mask: 'MMM YYYY',
      label: {
        style: {
          fontWeight: 'bold',
          fill: 'black',
        },
        offset: -8,
      },
    },
    yField: 'value',
    yAxis: {
      max: max,
      maxLimit: max,
      min,
      minLimit: min,
      tickMethod: () => {
        let ticks = []
        for (var i = 0; i <= max; i += 100) {
          ticks.push(i)
        }

        ticks.push(ticks[ticks.length - 1] + 100)

        return ticks
      },
      grid: {
        line: {
          style: {
            stroke: 'black',
            strokeOpacity: 0.05,
          },
        },
      },
      label: {
        formatter: (text: string) => `${text}%`,
        offset: -8,
      },
    },
    seriesField: 'type',
    color: [theme.palette.primary[600], theme.palette.neutral[1000]],
  }

  return (
    // @ts-ignore
    <Area {...config} />
  )
}

export default AreaChart
