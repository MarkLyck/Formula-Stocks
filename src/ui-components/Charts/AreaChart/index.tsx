import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { format } from 'date-fns'
import theme from '~/lib/theme'
import withCharts from '../withCharts'

const ChartContainer = styled.div`
  width: 100%;
  .g2-tooltip-title {
    display: none;
  }

  .chart-tooltip {
    font-weight: 500;
    font-size: 0.9rem;
    padding: 12px;
    display: flex;
    flex-direction: column;
  }

  .tooltip-label {
    font-weight: 500;
    font-size: 0.9rem;
  }

  .tooltip-value {
    font-weight: bold
    font-size: 1rem;
  }

  .weeklystocktip {
    color: ${(p) => p.theme.palette.primary[500]};
  }
  .market {
    color: ${(p) => p.theme.palette.basic[1100]};
  }

  .g2-tooltip-name {
    font-size: 0.9rem;
  }

  .g2-tooltip-value {
    font-weight: 500;
    font-size: 0.9rem;
  }

  .g2-tooltip-value.positive {
    color: ${(p) => p.theme.palette.scale.perfect};
  }
  .g2-tooltip-value.negative {
    color: ${(p) => p.theme.palette.scale.worst};
  }
`

export interface AreaChartType {
  id: string
  data: any[]
  height?: number
  scale: any
  axis: any[]
  chartLibraryLoaded?: boolean
  G2?: any
}

const renderChart = ({
  G2,
  chartInstance,
  id,
  data,
  height = 400,
  scale,
  axis,
}: AreaChartType & { chartInstance: any }) => {
  const chart = new G2.Chart({
    container: id,
    autoFit: true,
    padding: [0, 0, 0, 0],
    height,
  })
  chartInstance = chart

  chart.data(data)

  chart.scale(scale)

  axis.forEach((axis: any) => {
    chart.axis(axis.name, axis.config)
  })

  chart.axis('date', {
    grid: {
      line: {
        style: {
          stroke: '#000',
          strokeOpacity: 0.05,
        },
      },
    },
    label: {
      offset: -12,
      formatter: (text: string) => text.split(' ')[1],
      style: {
        fontWeight: 'bold',
        fill: 'black', // can't make white because of: https://github.com/antvis/G2/issues/2567
        fontSize: 12,
      },
    },
  })

  chart.tooltip({
    shared: false,
    showCrosshairs: true,
    showTitle: false,
    itemTpl: `
    <li class="chart-tooltip">
      <p class="tooltip-label {className}">{name}</p>
      <p class="tooltip-value">{value}</p>
    </li>`,
    crosshairs: {
      type: 'x',
      follow: true,

      // @ts-ignore
      text: (type: string, defaultText: any) => {
        if (type === 'x') {
          return {
            offset: -20,
            position: 'end',
            content: format(new Date(defaultText), 'MMM yyyy'),
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

  chart.legend(false)

  chart
    .line()
    .position('date*fs')
    .color(theme.palette.primary[500])
    .tooltip('date*fs', (_date: any, fs: any) => ({
      value: scale.fs.formatter(fs),
      className: 'weeklystocktip',
      name: scale.fs.alias,
    }))
  chart
    .area({
      startOnZero: false,
    })
    .position('date*fs')
    .color(theme.palette.primary[500])
    .style({
      fillOpacity: 0.4,
    })
    .tooltip('date*fs', (_date: any, fs: any) => ({
      value: scale.fs.formatter(fs),
      className: 'weeklystocktip',
      name: scale.fs.alias,
    }))

  chart
    .line()
    .position('date*market')
    .color(theme.palette.basic[800])
    .tooltip('date*market', (_date: any, market: any) => ({
      value: scale.fs.formatter(market),
      className: 'market',
      name: scale.market.alias,
    }))
  chart
    .area({
      startOnZero: false,
    })
    .position('date*market')
    .color(theme.palette.basic[1100])
    .style({
      fillOpacity: 0.4,
    })
    .tooltip('date*market', (_date: any, market: any) => ({
      value: scale.fs.formatter(market),
      className: 'market',
      name: scale.market.alias,
    }))

  chart.render()
}

const AreaChart = ({ G2, chartLibraryLoaded, id, data, ...rest }: AreaChartType) => {
  const [rendered, setRendered] = useState(false)
  let chartInstance: any

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy()
    }
    if (!rendered && chartLibraryLoaded) {
      renderChart({ G2, chartInstance, id, data, ...rest })
      setRendered(true)
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy()
      }
    }
  }, [data, chartLibraryLoaded])

  if (!chartLibraryLoaded) return null

  return <ChartContainer id={id} />
}

export default React.memo(withCharts(AreaChart))
