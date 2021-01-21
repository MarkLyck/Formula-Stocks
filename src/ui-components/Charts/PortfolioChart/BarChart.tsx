import React from 'react'
import dynamic from 'next/dynamic';
import styled from '@emotion/styled'
import { numberFormatter, decimalNumberFormatter } from 'src/common/utils/formatters'
import { format } from 'date-fns'
import { useAtom, themeAtom } from 'src/atoms'

const Column = dynamic(
    () => import("@ant-design/charts").then((mod) => mod.Column) as any,
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
    color: ${p => p.theme.palette.text[200]};
    font-weight: 400;
`
const ReturnValue = styled.h2`
    color: ${(p: any) => p.value < 0 ? p.theme.palette.danger[500] : p.theme.palette.success[500]};
    font-weight: 900;
    margin-bottom: 8px;
`

const chartTooltip = (chartType: string, title: string, items: any[]) => {
    if (!items[0]) return null

    const value = decimalNumberFormatter.format(items[0].data.value.toFixed(2))
    const date = chartType === 'annual_returns'
        ? Number(format(new Date(title), 'yyyy')) + 1
        : format(new Date(title), 'MMM yyyy')

    return (
        <TooltipContent>
            <ReturnValue value={items[0].data.value}>{items[0].data.value > 0 ? '+' : ''}{value}%</ReturnValue>
            <TooltipDateLabel>{date}</TooltipDateLabel>
        </TooltipContent>
    )
}

const BarChart = ({ data, chartType }: any) => {
    const [theme] = useAtom(themeAtom)
    const config = {
        data,
        xField: 'date',
        yField: 'value',
        yAxis: {
            // minLimit: -40,
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
        columnWidthRatio: 0.8,
        color: theme.palette.success[500],
        tooltip: {
            customContent: (title: string, items: any[]) => chartTooltip(chartType, title, items)
        },
        annotations: [
            {
                type: 'regionFilter',
                start: ['min', '-0.1'],
                end: ['max', '-100'],
                color: theme.palette.danger[500],
            },
        ],
    };

    return (
        <Column {...config} />
    )
}

export default BarChart
