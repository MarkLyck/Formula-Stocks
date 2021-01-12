import React from 'react'
import { useQuery } from '@apollo/client'
import { Line } from '@ant-design/charts';
import styled from '@emotion/styled'
import { format } from 'date-fns'
import { numberFormatter, decimalNumberFormatter } from '~/common/utils/formatters'
import { LAUNCH_PERFORMANCE_HISTORY } from '~/common/queries'
import { Card as DashboardCard } from '~/ui-components'
import theme from '~/lib/theme'

const ChartContainer = styled.div`
    width: 800px;

    .g2-tooltip {
        border-radius: 8px !important;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important;
    }
`

const TooltipContent = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

// tooltip components do not respect our ThemeProvider

const TooltipDateLabel = styled.p`
    margin: 0;
    color: ${theme.palette.text[200]};
    font-weight: 400;
`
const ReturnValue = styled.h2`
    color: ${(p: any) => p.value < 0 ? theme.palette.danger[500] : theme.palette.success[500]};
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
    date: string
}

const createChartData = (planPerformance: DataPoint[]) => {
    if (!planPerformance.length) return []
    const startValue = planPerformance[0].balance

    return planPerformance.map((point: any, i: number) => {
        const balance = (((planPerformance[i].balance - startValue) / startValue) * 100).toFixed(2)

        return {
            value: Number(balance),
            date: point.date,
        }
    })
}

const chartTooltip = (title: string, items: any[]) => {
    if (!items[0]) return null

    const value = decimalNumberFormatter.format(items[0].data.value)

    return (
        <TooltipContent>
            <ReturnValue value={items[0].data.value}>{items[0].data.value > 0 ? '+' : ''}{value}%</ReturnValue>
            <TooltipDateLabel>{format(new Date(title), 'MMM yyyy')}</TooltipDateLabel>
        </TooltipContent>
    )
}

const PortfolioChart = ({ data, loading, error }: PortfolioChartProps) => {
    let ref;

    const chartData = createChartData(data)
    const lastPoint = chartData[chartData.length - 1]
    console.log("🚀 ~ file: index.tsx ~ line 77 ~ PortfolioChart ~ lastPoint", lastPoint)

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
            customContent: chartTooltip
        },
        animation: {
            appear: {
                animation: 'path-in',
                duration: 2000,
            },
        },
    };

    return (
        <DashboardCard>
            <ChartContainer>
                <Line {...config} chartRef={(chartRef: any) => (ref = chartRef)} />
            </ChartContainer>
        </DashboardCard>
    )
}

const PortfolioChartProvider = () => {
    const { data, loading, error } = useQuery(LAUNCH_PERFORMANCE_HISTORY, {
        // client: FSApolloClient,
    })

    const chartData = data?.plan?.launchHistory || []

    return <PortfolioChart data={chartData} loading={loading} error={error} />
}

export default PortfolioChartProvider
