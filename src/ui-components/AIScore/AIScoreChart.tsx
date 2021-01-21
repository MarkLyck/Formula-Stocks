import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import debounce from 'src/common/utils/debounce'
import { useAtom, themeAtom } from 'src/atoms'
import withCharts from 'src/ui-components/Charts/withCharts'

const ChartContainer = styled.div`
  .g2-tooltip-title {
    font-weight: 500;
    font-size: 0.9rem;
  }

  .g2-tooltip-name {
    font-size: 0.9rem;
  }

  .g2-tooltip-value {
    font-weight: 500;
    font-size: 0.9rem;
  }

  .g2-tooltip-value.positive {
    color: ${(props: any) => props.theme.palette.scale.perfect};
  }
  .g2-tooltip-value.negative {
    color: ${(props: any) => props.theme.palette.scale.worst};
  }
`

const chartData = [
    { bucket: '-100 to -90', score: -95, irr: -9.13, winrate: 48 },
    { bucket: '-90 to -80', score: -85, irr: -6.1, winrate: 49 },
    { bucket: '-80 to -70', score: -75, irr: -2.57, winrate: 52 },
    { bucket: '-70 to -60', score: -65, irr: -1.55, winrate: 53 },
    { bucket: '-60 to -50', score: -55, irr: 0.5, winrate: 54 },
    { bucket: '-50 to -40', score: -45, irr: 2.12, winrate: 56 },
    { bucket: '-40 to -30', score: -35, irr: 3.95, winrate: 58 },
    { bucket: '-30 to -20', score: -25, irr: 3.97, winrate: 59 },
    { bucket: '-20 to -10', score: -15, irr: 6.22, winrate: 62 },
    { bucket: '-10 to 0', score: -5, irr: 8.06, winrate: 65 },
    { bucket: '0 to 10', score: 5, irr: 9.67, winrate: 67 },
    { bucket: '10 to 20', score: 15, irr: 10.57, winrate: 70 },
    { bucket: '20 to 30', score: 25, irr: 11.57, winrate: 72 },
    { bucket: '30 to 40', score: 35, irr: 13.09, winrate: 75 },
    { bucket: '40 to 50', score: 45, irr: 15.37, winrate: 77 },
    { bucket: '50 to 60', score: 55, irr: 17.03, winrate: 80 },
    { bucket: '60 to 70', score: 65, irr: 20.31, winrate: 82 },
    { bucket: '70 to 80', score: 75, irr: 22.89, winrate: 85 },
    { bucket: '80 to 90', score: 85, irr: 26.94, winrate: 86 },
    { bucket: '90 to 100', score: 95, irr: 30.15, winrate: 90 },
]

const renderChart = ({ G2, chartInstance, id, height = 360, theme }: any) => {
    if (!document.querySelector(`#${id}`)) {
        if (chartInstance) {
            chartInstance.destroy()
            chartInstance = undefined
        }
        return null
    }

    const chart = new G2.Chart({
        container: id,
        autoFit: true,
        padding: [0, 20, 24, 40],
        height,
    })
    chartInstance = chart

    chart.data(chartData)
    chart.scale({
        irr: {
            alias: 'Avg. irr return',
            range: [0, 0.98],
        },
        bucket: {
            range: [0, 0.98],
        },
        winrate: {
            alias: 'Win ratio',
            range: [0, 0.98],
        },
    })

    chart.axis('winrate', false)
    chart.axis('bucket', {
        label: {
            autoRotate: false,
        },
    })
    chart.axis('irr', {
        label: {
            formatter: (text: string) => `${Number(text) > 0 ? '+' : ''}${text}%`,
            offset: 16,
        },
    })

    chart.tooltip({
        shared: true,
        showMarkers: false,
        itemTpl: `
    <li class="g2-tooltip-list-item">
        <span class="g2-tooltip-name">{label}</span>:<span class="g2-tooltip-value {className}">{value}</span>
    </li>
    `,
    })

    chart.legend(false)
    chart
        .interval()
        .position('bucket*irr')
        .color('score', (score: any) => (score <= -10 ? theme.palette.scale.worst : theme.palette.scale.perfect))
        .tooltip('irr*score', (irr: any, score: any) => ({
            label: 'Annual return',
            value: `${irr > 0 ? '+' : ''}${irr.toFixed(2)}%`,
            className: score > -10 ? 'positive' : 'negative',
        }))

    chart
        .line()
        .position('bucket*winrate')
        .shape('smooth')
        .tooltip('winrate', (winrate: any) => ({
            label: 'Win ratio',
            value: `${winrate}%`,
        }))
    chart.point().position('bucket*winrate').shape('circle')

    chart.interaction('active-region')

    chart.render()
}

const AIScoreChart = ({ G2, chartLibraryLoaded, style, ...rest }: any) => {
    const id = 'ai-score-chart'
    // Nasty hack to handle window resizing
    // https://github.com/antvis/G2/issues/2491
    const [isResizing, setIsResizing] = useState(false)
    const [theme] = useAtom(themeAtom)
    let chartInstance: any

    const resize = () => {
        setIsResizing(true)
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

        if (!isResizing && !chartInstance) {
            renderChart({ G2, chartInstance, id, theme, ...rest })
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
    return <ChartContainer id={id} style={style} />
}

export default React.memo(withCharts(AIScoreChart))
