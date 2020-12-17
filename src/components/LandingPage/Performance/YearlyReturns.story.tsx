import React from 'react'
import styled from '@emotion/styled'
import YearlyReturns from '~/components/LandingPage/Performance/YearlyReturns'

const Container = styled.div`
  padding: 32px;
`

export default {
  title: 'Landing page/performance/yearly returns',
}

const monthlyPerformance = [
  {
    date: '2009-01-30',
    balance: 200000000,
  },
  {
    date: '2009-12-30',
    balance: 482379234,
  },
  {
    date: '2010-01-30',
    balance: 482379234,
  },
  {
    date: '2010-12-30',
    balance: 613355044,
  },
  {
    date: '2011-01-30',
    balance: 613355044,
  },
  {
    date: '2011-12-30',
    balance: 715346116,
  },
]

export const year_returns = () => {
  return (
    <Container>
      <YearlyReturns monthlyPerformance={monthlyPerformance} chartType="launch" />
    </Container>
  )
}
