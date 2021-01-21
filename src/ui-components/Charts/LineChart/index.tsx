import React, { FC, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import createBreathPointShape, { BreathPointType } from './breathPoint'
import createSplitLine from './splitLine'
import { format } from 'date-fns'
import { useAtom, themeAtom } from 'src/atoms'
import { LineAnnotationType, RegionFilterType } from '../types'
import debounce from 'src/common/utils/debounce'
import withCharts from '../withCharts'

interface DataMarkerType {
  date: Date
  value: number
  label: string
  color: string
}

export interface ChartPropsType {
  id: string
  data: any[]
  scales: any[]
  lineAnnotations?: LineAnnotationType[]
  regionFilters?: RegionFilterType[]
  breathPoints?: BreathPointType[]
  dataMarkers?: DataMarkerType[]
  lineColor: string
  belowColor?: string
  tooltipFunction?: any
  height?: number
  isResizing?: boolean
  splitDate?: Date
  splitEndDate?: Date
  splitColor?: string
  chartLibraryLoaded?: boolean
  G2: any
  theme: any
}

let chartInstance: any

const ChartContainer = styled.div`
  .g2-tooltip {
    padding: 12px 16px !important;
    .chart-tooltip {
      font-weight: 500;
      font-size: 0.9rem;
    }
    .below {
      color: ${(props: any) => (props.belowColor ? props.belowColor : 'inherit')};
    }
  }
  .g2-tooltip-title {
    margin: 0 !important;
  }
`

const renderChart = ({
  G2,
  id,
  data,
  scales,
  lineAnnotations = [],
  regionFilters = [],
  breathPoints = [],
  dataMarkers = [],
  lineColor,
  tooltipFunction,
  height = 400,
  splitDate,
  splitEndDate,
  splitColor,
  theme,
}: ChartPropsType) => {
  const chartData = data.map((point) => ({
    ...point,
    date: new Date(point.date),
  }))

  const chart = new G2.Chart({
    container: id,
    autoFit: true,
    height,
  })
  chartInstance = chart

  chart.animate(true)
  chart.data(chartData)

  chart.axis('close', {
    grid: {
      line: {
        style: {
          stroke: '#000',
          strokeOpacity: 0.08,
        },
      },
    },
    label: {
      offset: -20,
    },
  })

  chart.scale({
    date: {
      type: 'time',
      alias: 'date',
      mask: 'DD MMM',
      range: [0, 0.98],
    },
  })

  scales.forEach((scale: any) => chart.scale(scale.name, scale.config))

  // @ts-ignore
  chart.tooltip({
    showCrosshairs: true,
    showTitle: false,
    follow: true,
    itemTpl: '<li class="chart-tooltip {className}">{value}</li>',
    crosshairs: {
      type: 'x',

      // @ts-ignore
      text: (type: string, defaultText: any) => {
        if (type === 'x') {
          return {
            offset: 5,
            position: 'end',
            content: format(new Date(defaultText), 'dd MMM yyyy'),
            style: {
              textAlign: 'center',
              textBaseline: 'top',
              fontSize: 12,
              fontWeight: '400',
              fill: theme.colors.white,
            },
          }
        }
      },
      textBackground: {
        padding: [2, 4],
        style: {
          padding: 8,
          fill: theme.colors.black,
          opacity: 1,
          lineJoin: 'round',
          stroke: '#000',
          lineWidth: 4,
        },
      },
    },
  })

  regionFilters.forEach((regionFilter) => {
    chart.annotation().regionFilter(regionFilter)
  })

  lineAnnotations.forEach((annotation) => {
    chart.annotation().line(annotation)
  })

  if (splitDate) {
    createSplitLine({ G2, id: 'split-line', color: lineColor, splitDate, splitEndDate, splitColor })
    chart.line().position('date*close').shape('split-line')
  } else {
    chart.line().position(`date*close`).tooltip('date*close', tooltipFunction).color(lineColor)
  }

  dataMarkers.forEach((marker: DataMarkerType) => {
    chart.annotation().dataMarker({
      position: [format(new Date(marker.date), 'yyyy-MM-dd hh:MM'), marker.value],
      line: {
        length: 36,
      },
      // @ts-ignore no point
      point: false,
      text: {
        content: marker.label,
        style: {
          textAlign: 'center',
          fill: marker.color,
        },
      },
    })
  })

  breathPoints.forEach((point) => {
    createBreathPointShape(G2, point)

    chart.point().position('date*close').shape(point.id)
  })

  chart.removeInteraction('legend-filter')
  chart.removeInteraction('legend-active')
  chart.render()
}

const LineChart: FC<ChartPropsType> = ({ G2, chartLibraryLoaded, id, belowColor, ...rest }: ChartPropsType) => {
  // Nasty hack to handle window resizing
  // https://github.com/antvis/G2/issues/2491
  const [isResizing, setIsResizing] = useState(false)
  const [theme] = useAtom(themeAtom)

  const resize = () => {
    setIsResizing(true)
    // Force destroy and re-render chart on resize because of: https://github.com/antvis/G2/issues/2491
    if (chartInstance) {
      chartInstance.destroy()
      chartInstance = undefined
    }
  }

  const debouncedReset = debounce(
    () => {
      setIsResizing(false)
    },
    200,
    false
  )

  useEffect(() => {
    window.addEventListener('resize', resize)
    window.addEventListener('resize', debouncedReset)

    if (!isResizing && !chartInstance && chartLibraryLoaded) {
      renderChart({ G2, id, theme, ...rest })
    }

    return () => {
      window.removeEventListener('resize', debouncedReset)
      window.removeEventListener('resize', resize)
      if (chartInstance) {
        chartInstance.destroy()
        chartInstance = undefined
      }
    }
  })

  if (isResizing || !chartLibraryLoaded) return null
  // @ts-ignore
  return <ChartContainer id={id} belowColor={belowColor} />
}

export default withCharts(LineChart)
