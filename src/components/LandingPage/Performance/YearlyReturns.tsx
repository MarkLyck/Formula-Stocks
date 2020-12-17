import React from 'react'
import styled from '@emotion/styled'
import { StockReturn } from '~/ui-components/Stock'

const YearByYearReturnsContainer = styled.ul`
  height: 100%;
  max-height: 500px;
  overflow-y: auto;
  padding: 0 24px;
`

const YearReturnItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid ${(props: any) => props.theme.palette.border};
  color: ${(props: any) => props.theme.palette.text[500]};
  font-weight: 500;
  font-size: 0.9rem;

  &:hover {
    background: ${(props: any) => props.theme.palette.basic[200]};
  }

  &:last-of-type {
    border-bottom: none;
  }
`

const Year = styled.span``

const YearlyReturns = ({ monthlyPerformance, chartType }: { monthlyPerformance: any[]; chartType: string }) => {
  const yearByYearBalances = monthlyPerformance.reduce((acc: any, point: any, i: number) => {
    const year = Number(point.date.split('-')[0])
    const balance = point.balance

    if (i === 0) {
      acc[year] = {
        startValue: chartType === 'launch' ? 200000000 : 25000,
      }
    } else if (!acc[year]) {
      acc[year] = {
        startValue: acc[year - 1].endValue,
        endValue: balance,
      }
    } else {
      acc[year].endValue = balance
    }

    if (i === monthlyPerformance.length - 1) {
      if (acc[year].endValue < acc[Number(year) - 1].endValue) {
        delete acc[year]
      }
    }

    return acc
  }, {})

  return (
    <YearByYearReturnsContainer>
      {Object.keys(yearByYearBalances).map((key: string) => {
        const year = yearByYearBalances[key]
        const increase = year.endValue - year.startValue
        const percentReturn = Number(((increase / year.startValue) * 100).toFixed(2))

        return (
          <YearReturnItem key={key}>
            <Year>
              {key}
              {Number(key) === new Date().getFullYear() ? ' (Year to Date)' : ''}
            </Year>
            <StockReturn percentReturn={percentReturn} />
          </YearReturnItem>
        )
      })}
    </YearByYearReturnsContainer>
  )
}

export default YearlyReturns
