import React from 'react'
import dynamic from 'next/dynamic';
import styled from '@emotion/styled'
import { format } from 'date-fns'
import { numberFormatter, decimalNumberFormatter } from 'src/common/utils/formatters'
import { useTheme } from '@emotion/react'

const Line = dynamic(
    () => import("@ant-design/charts").then((mod) => mod.Line) as any,
    { ssr: false }
)

const TooltipContent = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

// tooltip components do not respect our ThemeProvider

const TooltipDateLabel = styled.p`
    margin: 0;
    color: ${(p: any) => p.themeProp.palette.text[200]};
    font-weight: 400;
`
const ReturnValue = styled.h2`
    color: ${(p: any) => p.value < 0 ? p.themeProp.palette.danger[500] : p.themeProp.palette.success[500]};
    font-weight: 900;
    margin-bottom: 8px;
`

type PortfolioChartProps = {
    data: any[];
    loading: boolean;
    error: any
}

type DataPoint = {
    balance: number;
    cash: number;
    date: string
}

const createChartData = (planPerformance: DataPoint[]) => {
    if (!planPerformance.length) return []
    const startValue = planPerformance[0].balance + planPerformance[0].cash

    return planPerformance.map((point: any, i: number) => {
        const balance = ((((planPerformance[i].balance + planPerformance[i].cash) - startValue) / startValue) * 100).toFixed(2)

        return {
            value: Number(balance),
            date: point.date,
        }
    })
}

const chartTooltip = (title: string, items: any[], theme: any) => {
    if (!items[0]) return null

    const value = decimalNumberFormatter.format(items[0].data.value)

    return (
        <TooltipContent>
            <ReturnValue value={items[0].data.value} themeProp={theme}>{items[0].data.value > 0 ? '+' : ''}{value}%</ReturnValue>
            <TooltipDateLabel themeProp={theme}>{format(new Date(title), 'MMM yyyy')}</TooltipDateLabel>
        </TooltipContent>
    )
}

const ReturnsChart = ({ data, loading, error }: PortfolioChartProps) => {
    const theme = useTheme()
    let ref;

    const chartData = createChartData(data)
    const lastPoint = chartData[chartData.length - 1]

    const config = {
        data: chartData,
        loading: loading,
        padding: 'auto',
        xField: 'date',
        yField: 'value',
        yAxis: {
            minLimit: -100,
            maxLimit: Math.ceil(lastPoint?.value / 100) * 100,
            tickCount: 6,
            label: {
                labelLine: null,
                formatter: (v: string) => `${numberFormatter.format(Math.floor(Number(v)))}%`,
                style: {
                    fill: '#A0A5B2',
                },
            },
            grid: {
                line: {
                    style: {
                        stroke: '#EFF4F7',
                        lineWidth: 1,
                    }
                }
            },
        },
        xAxis: {
            type: 'timeCat',
            tickCount: 5,
            grid: null,
            tickLine: { style: { stroke: '#EFF4F7' } },
            label: {
                labelLine: null,
                formatter: (v: string) => v.split('-')[0],
                style: {
                    fill: '#A0A5B2',
                },
            },
        },
        color: lastPoint?.value > 0 ? theme.palette.success[500] : theme.palette.danger[500],
        lineStyle: {
            lineWidth: 4,
            shadowColor: lastPoint?.value > 0 ? theme.palette.success[200] : theme.palette.danger[200],
            shadowBlur: 10,
            shadowOffsetX: 5,
            shadowOffsetY: 6
        },
        tooltip: {
            customContent: (title: string, items: any[]) => chartTooltip(title, items, theme)
        },
        animation: {
            appear: {
                animation: 'path-in',
                duration: 2000,
            },
        },
    };

    return (
        <Line {...config} chartRef={(chartRef: any) => (ref = chartRef)} />
    )
}

export default ReturnsChart