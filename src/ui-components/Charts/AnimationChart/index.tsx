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
  min: number
  dateMask?: string
  yTickSpace?: number
  annotations?: any[]
  labelFormatter: (value: number) => string
  tooltipValueFormatter: (value: number) => string
}

const AnimationChart = ({
  data,
  height = 600,
  min,
  dateMask = 'MMM YYYY',
  // yTickSpace,
  annotations,
  labelFormatter,
  tooltipValueFormatter,
}: AreaChartProps) => {
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
      customContent: (title: string, items: any[]) => Tooltip(title, items, tooltipValueFormatter),
    },
    xField: 'date',
    xAxis: {
      nice: false,
      type: 'time',
      mask: dateMask,
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
      min,
      minLimit: min,
      // tickMethod: yTickSpace
      //   ? () => {
      //       let ticks = []
      //       for (var i = 0; i <= max; i += yTickSpace) {
      //         ticks.push(i)
      //       }

      //       ticks.push(ticks[ticks.length - 1] + yTickSpace)

      //       return ticks
      //     }
      //   : undefined,
      grid: {
        line: {
          style: {
            stroke: 'black',
            strokeOpacity: 0.05,
          },
        },
      },
      label: {
        formatter: labelFormatter,
        offset: -8,
      },
    },
    annotations,
    seriesField: 'type',
    animation: false,
    color: [theme.palette.primary[600], theme.palette.neutral[1000]],
  }

  return (
    // @ts-ignore
    <Area {...config} />
  )
}

export default AnimationChart
