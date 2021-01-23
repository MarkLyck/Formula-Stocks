import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useQuery } from '@apollo/client'
import { Select, Space } from 'antd'
import { LAUNCH_PERFORMANCE_HISTORY } from 'src/common/queries'
import ReturnsChart from './ReturnsChart'
import BarChart from './Histogram'
import { Card as DashboardCard } from 'src/ui-components'
const { Option } = Select

const ChartContainer = styled.div`
  width: 800px;
  .g2-tooltip {
    border-radius: 8px !important;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important;
  }
`

const START_VALUE = 200000000

const generateMonthlyReturns = (data: returnsDataPointType[] = []) => {
  const returns = data.map((point, i) => {
    if (i === 0) {
      return {
        value: 0,
        date: point.date,
      }
    }

    const newValue = data[i].balance + data[i].cash
    const originalValue = data[i - 1].balance + data[i - 1].cash
    const increase = newValue - originalValue
    const percentIncrease = (increase / originalValue) * 100

    return {
      value: percentIncrease,
      date: point.date,
    }
  })

  return returns
}

const generateAnnualReturns = (data: returnsDataPointType[] = []) => {
  const yearByYearBalances = data.reduce((acc: any, point: any, i: number) => {
    const year = Number(point.date.split('-')[0])
    const balance = point.balance + point.cash

    if (i === 0) {
      acc[year] = {
        startValue: START_VALUE,
      }
    } else if (!acc[year]) {
      acc[year] = {
        startValue: acc[year - 1].endValue,
        endValue: balance,
      }
    } else {
      acc[year].endValue = balance
    }

    if (i === data.length - 1) {
      if (acc[year].endValue < acc[Number(year) - 1].endValue) {
        delete acc[year]
      }
    }

    return acc
  }, {})

  const yearlyReturns = Object.keys(yearByYearBalances).map((key) => {
    const newValue = yearByYearBalances[key].endValue
    const originalValue = yearByYearBalances[key].startValue
    const increase = newValue - originalValue
    const percentIncrease = (increase / originalValue) * 100

    return {
      date: key,
      value: percentIncrease,
    }
  })

  return yearlyReturns
}

type returnsDataPointType = {
  balance: number
  cash: number
  date: string
}

const PortfolioChart = () => {
  const [chartType, setChartType] = useState('total_return')
  const { data, loading, error } = useQuery(LAUNCH_PERFORMANCE_HISTORY, {
    // client: FSApolloClient,
  })

  let totalReturnsData: returnsDataPointType[] = []

  if (data?.plan?.launchHistory) {
    totalReturnsData = [
      {
        balance: 0,
        cash: START_VALUE,
        date: '2009-01-01T00:00:00.000Z',
      },
      ...data.plan.launchHistory,
    ]
  }

  const monthlyReturnsData = generateMonthlyReturns(totalReturnsData)
  const annualReturnsData = generateAnnualReturns(totalReturnsData)

  return (
    <DashboardCard>
      <Space direction="vertical">
        <Space>
          <Select defaultValue="total_return" onChange={(val: string) => setChartType(val)}>
            <Option value="total_return">Total return</Option>
            <Option value="monthly_returns">Monthly returns</Option>
            <Option value="annual_returns">Annual returns</Option>
          </Select>
        </Space>
        <ChartContainer>
          {chartType === 'total_return' && <ReturnsChart data={totalReturnsData} loading={loading} error={error} />}
          {(chartType === 'annual_returns' || chartType === 'monthly_returns') && (
            <BarChart
              data={chartType === 'monthly_returns' ? monthlyReturnsData : annualReturnsData}
              chartType={chartType}
              loading={loading}
              error={error}
            />
          )}
        </ChartContainer>
      </Space>
    </DashboardCard>
  )
}

export default PortfolioChart
