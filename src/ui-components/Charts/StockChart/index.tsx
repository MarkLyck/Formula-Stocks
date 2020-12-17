// @ts-nocheck
import React, { FC, useEffect } from 'react'
import styled from '@emotion/styled'
import { format } from 'date-fns'
import { DataView } from '@antv/data-set'
import debounce from '~/common/utils/debounce'
import withCharts from '../withCharts'
import theme from '~/common/theme'

const ChartContainer = styled.div`
  .g2-tooltip {
    padding: 12px 16px !important;
    .chart-tooltip {
      font-weight: 500;
      font-size: 0.9rem;
    }
  }
  .g2-tooltip-title {
    margin: 0 !important;
  }

  .stock-range-tooltip-list {
    li {
      margin-top: 8px;
      font-weight: 400;
      display: flex;
      .label {
        width: 60px;
      }
      .value {
        font-weight: bold;
      }
    }
  }
`

export interface LineAnnotationType {
  start: [string, number]
  end: [string, number]
  style: {
    stroke: string
    lineWidth: number
    lineDash: [number, number]
  }
  text: {
    position: string
    style: {
      fill: string
      fontSize: number
      fontWeight: string
    }
    content: string
    offsetY: number
  }
}

export interface RegionFilterType {
  top: boolean
  start: [string, number]
  end: [string, number]
  color: string
}

interface ChartPropsType {
  id: string
  data: any[]
  lineAnnotations?: LineAnnotationType[]
  regionFilters?: RegionFilterType[]
  tooltipFunction?: any
  height?: number
}

const renderChart = ({
  G2,
  chartInstance,
  id,
  data,
  lineAnnotations = [],
  height = 400,
  tooltipFunction,
}: ChartPropsType) => {
  const chartData = data.map((point) => ({ ...point, date: new Date(point.date) }))

  const dv = new DataView()
  dv.source(chartData).transform({
    type: 'map',
    callback: (obj: any) => {
      obj.trend = obj.open <= obj.close ? 'up' : 'down'
      obj.stockRange = [obj.open, obj.close, obj.high, obj.low]
      return obj
    },
  })

  const chart = new G2.Chart({
    container: id,
    autoFit: true,
    height,
  })
  chartInstance = chart

  chart.axis('stockRange', {
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

  chart.data(dv.rows)
  chart.legend(false)
  chart.scale({
    date: {
      type: 'time',
      mask: 'DD MMM',
      tickCount: 10,
    },
    stockRange: {
      nice: true,
      type: 'linear',
      nice: true,
      formatter: (val: string) => `$${Number(val).toFixed(2)}`,
    },
  })

  chart.tooltip({
    showCrosshairs: true,
    showMarkers: false,
    itemTpl: '<li class="chart-tooltip {className}">{value}</li>',
    crosshairs: {
      type: 'x',

      // @ts-ignore
      text: (type: string, defaultText: any) => {
        if (type === 'x') {
          return {
            offset: 5,
            position: 'end',
            content: format(defaultText, 'dd MMM yyyy'),
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

  chart
    .schema()
    .position('date*stockRange')
    .color('trend', (val) => (val === 'down' ? '#f04864' : '#2fc25b'))
    .shape('candle')
    .tooltip('open*close*high*low', tooltipFunction)

  lineAnnotations.forEach((annotation) => {
    chart.annotation().line(annotation)
  })

  chart.interaction('brush-x')
  chart.removeInteraction('legend-filter')
  chart.removeInteraction('legend-active')
  chart.interaction('element-active')
  chart.render()
}

const StockChart: FC<ChartPropsType> = ({ G2, chartLibraryLoaded, id, ...rest }: ChartPropsType) => {
  let chartInstance: any

  useEffect(() => {
    if (!chartInstance && chartLibraryLoaded) {
      renderChart({ G2, chartInstance, id, ...rest })
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy()
        chartInstance = undefined
      }
    }
  })

  if (!chartLibraryLoaded) return null

  return <ChartContainer id={id} />
}

export default withCharts(StockChart)
