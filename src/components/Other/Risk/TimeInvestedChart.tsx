import React from 'react'
import { Card } from 'antd'
import dynamic from 'next/dynamic'
import { useTheme } from '@emotion/react'

const Column = dynamic(() => import('@ant-design/charts').then((mod) => mod.Column) as any, { ssr: false })

const getPositivePeriods = (data: any[], interval: number) => {
  let positivePeriods = 0
  let negativePeriods = 0
  const priceKey = data[0]?.balance ? 'balance' : 'price'

  data.forEach((point: any, i: number) => {
    if (!data[i + interval]) return
    const currentBalance = point[priceKey]
    const balanceNextInterval = data[i + interval][priceKey]

    if (balanceNextInterval >= currentBalance) {
      positivePeriods++
    } else {
      negativePeriods++
    }
  })
  return { positivePeriods, negativePeriods }
}

const TimeInvestedChart: React.FC = ({ data, title }: any) => {
  const theme = useTheme()

  const periods1Month = getPositivePeriods(data, 1)
  const periods2Months = getPositivePeriods(data, 2)
  const periods3Months = getPositivePeriods(data, 3)
  const periods6Months = getPositivePeriods(data, 6)
  const periods1Year = getPositivePeriods(data, 12)
  const periods2Years = getPositivePeriods(data, 12 * 2)
  const periods3Years = getPositivePeriods(data, 12 * 3)
  const periods4Years = getPositivePeriods(data, 12 * 4)
  const periods5Years = getPositivePeriods(data, 12 * 5)

  const chartData = [
    { period: '1 month', type: 'losing periods', value: periods1Month.negativePeriods },
    { period: '1 month', type: 'profitable periods', value: periods1Month.positivePeriods },
    { period: '2 months', type: 'profitable periods', value: periods2Months.positivePeriods },
    { period: '2 months', type: 'losing periods', value: periods2Months.negativePeriods },
    { period: '3 months', type: 'profitable periods', value: periods3Months.positivePeriods },
    { period: '3 months', type: 'losing periods', value: periods3Months.negativePeriods },
    { period: '6 months', type: 'profitable periods', value: periods6Months.positivePeriods },
    { period: '6 months', type: 'losing periods', value: periods6Months.negativePeriods },
    { period: '1 year', type: 'profitable periods', value: periods1Year.positivePeriods },
    { period: '1 year', type: 'losing periods', value: periods1Year.negativePeriods },
    { period: '2 years', type: 'profitable periods', value: periods2Years.positivePeriods },
    { period: '2 years', type: 'losing periods', value: periods2Years.negativePeriods },
    { period: '3 years', type: 'profitable periods', value: periods3Years.positivePeriods },
    { period: '3 years', type: 'losing periods', value: periods3Years.negativePeriods },
    { period: '4 years', type: 'profitable periods', value: periods4Years.positivePeriods },
    { period: '4 years', type: 'losing periods', value: periods4Years.negativePeriods },
    { period: '5 years', type: 'profitable periods', value: periods5Years.positivePeriods },
    { period: '5 years', type: 'losing periods', value: periods5Years.negativePeriods },
  ]

  const config = {
    data: chartData,
    xField: 'period',
    yField: 'value',
    color: ({ type }: { type: string }) => {
      if (type === 'profitable periods') {
        return theme.palette.success[600]
      }
      return theme.palette.danger[600]
    },
    seriesField: 'type',
    isPercent: true,
    isStack: true,
    label: {
      position: 'middle',
      content: (item: any) => {
        return `${(item.value * 100).toFixed(2)}%`
      },
      style: { fill: '#fff' },
    },
  }

  return (
    <Card title={title}>
      {/* @ts-ignore */}
      <Column {...config} />
    </Card>
  )
}

export default TimeInvestedChart
