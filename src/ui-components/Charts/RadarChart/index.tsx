import React, { FC, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import DataSet from '@antv/data-set' // TODO REMOVE!
import styled from '@emotion/styled'
import { getAIScoreColor } from '~/common/utils/reportUtils'
import theme from '~/lib/theme'
import withCharts from '../withCharts'

const ChartContainer = styled(motion.div)`
  .tooltip-container {
    padding: 12px 16px !important;
    display: flex;
    .label {
      font-weight: 500;
      font-size: 0.9rem;
      margin-right: 8px;
    }
    .value {
      font-weight: bold;
      font-size: 1rem;
    }
    .below {
      color: ${(props: any) => (props.belowColor ? props.belowColor : 'inherit')};
    }
  }
  .g2-tooltip-title {
    margin: 0 !important;
  }
`

interface ChartPropsType {
  G2: any
  chartLibraryLoaded?: boolean
  id: string
  data: any[]
  aiScore: number
}

const renderChart = ({ G2, id, data, aiScore }: ChartPropsType & { chartInstance: any }) => {
  const { DataView } = DataSet

  const dv = new DataView().source(data)
  dv.transform({
    type: 'fold',
    fields: ['value'],
    key: 'type',
    value: 'value',
  })

  const chart = new G2.Chart({
    container: id,
    autoFit: true,
    height: 500,
  })
  chart.data(dv.rows)

  chart.scale('value', {
    min: -100,
    max: 100,
  })

  chart.coordinate('polar', {
    radius: 0.8,
  })

  chart.tooltip({
    shared: true,
    showCrosshairs: true,
    showTitle: false,
    itemTpl: '<div className="g2-tooltip">{html}</div>',
    crosshairs: {
      line: {
        style: {
          lineDash: [16, 8],
          lineWidth: 2,
          stroke: theme.palette.text[300],
        },
      },
    },
  })

  chart.axis('label', {
    line: null,
    tickLine: null,
    label: {
      offset: 20,
      style: {
        fontWeight: 'bold',
        fontSize: 16,
      },
    },
    grid: {
      line: {
        style: {
          lineDash: null,
        },
      },
    },
  })

  chart.axis('value', {
    line: null,
    tickLine: null,
    grid: {
      line: {
        type: 'line',
        style: {
          lineDash: null,
        },
      },
    },
    label: {
      style: {
        opacity: 1,
      },
    },
  })

  const tooltipFunction = (label: any, value: any) => {
    return {
      html: `
        <div class="tooltip-container">
          <div class="label">${label}:</div>
          <span class="value" style="color: ${getAIScoreColor(value)}">
            ${value > 0 ? '+' : ''}${Number(value).toFixed(0)}
          </span>
        </div>
      `,
    }
  }

  chart.line().position('label*value').color(getAIScoreColor(aiScore)).size(2)
  chart.point().position('label*value').color(getAIScoreColor(aiScore)).shape('circle').size(6)

  chart
    .area({
      startOnZero: false,
    })
    .position('label*value')
    .color(getAIScoreColor(aiScore))
    .tooltip('label*value', tooltipFunction)

  chart.render()
}

const RadarChart: FC<ChartPropsType> = ({ G2, chartLibraryLoaded, id, ...rest }: ChartPropsType) => {
  const [rendered, setRendered] = useState(false)
  let chartInstance: any

  useEffect(() => {
    if (!chartInstance && !rendered && chartLibraryLoaded) {
      setRendered(true)
      renderChart({ G2, chartInstance, id, ...rest })
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy()
      }
    }
  })

  if (!chartLibraryLoaded) return null

  return (
    <ChartContainer
      id={id}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      data-chromatic="ignore"
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    />
  )
}

export default withCharts(RadarChart)
