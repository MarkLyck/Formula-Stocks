import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useQuery } from '@apollo/client'
import { Select, Space, Typography } from 'antd'
import { subYears, subMonths, isAfter } from 'date-fns'
import { LAUNCH_PERFORMANCE_HISTORY } from 'src/common/queries'
import { ErrorBoundary } from 'react-error-boundary'
import ReturnsChart from './ReturnsChart'
import BarChart from './Histogram'
import { Card as DashboardCard, ErrorFallback } from 'src/ui-components'
const { Option } = Select

const { Title } = Typography

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  .g2-tooltip {
    border-radius: 8px !important;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important;
  }
`

const StyledSelect = styled(Select)`
  min-width: 140px;
`

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
`

const TypeSelect = styled(Select)`
  && {
    .ant-select-selector {
      background-color: ${(p) => p.theme.palette.neutral[200]};
      position: relative;
      padding-left: 32px;
      border: none;

      &::before {
        position: absolute;
        top: 50%;
        left: 8px;
        transform: translateY(-50%);
        content: '';
        width: 16px;
        height: 16px;
        border-radius: 4px;
        background: ${(p) => p.theme.palette.success[600]};
      }
    }
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
        startValue: data[0].balance + data[0].cash,
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
      if (acc[year]?.endValue < acc[Number(year) - 1]?.endValue) {
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
  const [startDate, setStartDate] = useState('all_time')
  const { data, loading, error } = useQuery(LAUNCH_PERFORMANCE_HISTORY, {
    // client: FSApolloClient,
  })

  const dateMap = {
    all_time: new Date(2008, 11, 31),
    since_signup: new Date(),
    last_10_years: subMonths(subYears(new Date(), 10), 0),
    last_5_years: subMonths(subYears(new Date(), 5), 0),
    last_3_years: subMonths(subYears(new Date(), 3), 0),
    last_2_years: subMonths(subYears(new Date(), 2), 0),
    last_12_months: subMonths(subYears(new Date(), 1), 0),
  }

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

    totalReturnsData = totalReturnsData.filter((point) => {
      // @ts-ignore
      if (isAfter(new Date(point.date), dateMap[startDate])) {
        return true
      }
      return false
    })
  }

  const monthlyReturnsData = generateMonthlyReturns(totalReturnsData)
  const annualReturnsData = generateAnnualReturns(totalReturnsData)

  return (
    <DashboardCard>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // reset the state of your app so the error doesn't happen again
          location.reload(true)
        }}
      >
        <Space direction="vertical">
          <Flex>
            <Title level={4}>Portfolio returns</Title>
            <Space>
              {/* @ts-ignore */}
              <TypeSelect defaultValue="total_return" onChange={(val: string) => setChartType(val)}>
                <Option value="total_return">Total return</Option>
                <Option value="monthly_returns">Monthly returns</Option>
                <Option value="annual_returns">Annual returns</Option>
              </TypeSelect>
              {/* @ts-ignore */}
              <StyledSelect defaultValue="all_time" onChange={(val: string) => setStartDate(val)}>
                <Option value="all_time">All time</Option>
                <Option value="since_signup" disabled>
                  Since I signed up
                </Option>
                <Option value="last_10_years">Last 10 years</Option>
                <Option value="last_5_years">Last 5 years</Option>
                <Option value="last_3_years">Last 3 years</Option>
                <Option value="last_2_years">Last 2 years</Option>
                <Option value="last_12_months">Last 12 months</Option>
              </StyledSelect>
            </Space>
          </Flex>
          <ChartContainer>
            {/* @ts-ignore */}
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
      </ErrorBoundary>
    </DashboardCard>
  )
}

export default PortfolioChart
