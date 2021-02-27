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
  dateMask?: string
  yTickSpace?: number
  log?: boolean
  labelFormatter: (value: number) => string
  tooltipValueFormatter: (value: number) => string
}

const AreaChart = ({
  data,
  height = 600,
  max,
  min,
  dateMask = 'MMM YYYY',
  yTickSpace,
  log,
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
    meta: log
      ? {
          value: {
            type: 'log',
          },
        }
      : undefined,
    yField: 'value',
    yAxis: {
      max: max,
      maxLimit: max,
      min,
      minLimit: min,
      tickMethod: yTickSpace
        ? () => {
            let ticks = []
            for (var i = 0; i <= max; i += yTickSpace) {
              ticks.push(i)
            }

            ticks.push(ticks[ticks.length - 1] + yTickSpace)

            return ticks
          }
        : undefined,
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
    seriesField: 'type',
    color: [theme.palette.primary[600], theme.palette.neutral[1000]],
  }

  return (
    // @ts-ignore
    <Area {...config} />
  )
}

export default AreaChart
