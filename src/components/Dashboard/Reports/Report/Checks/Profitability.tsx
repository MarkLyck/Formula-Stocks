import { useQuery } from '@apollo/client'

import { FMP } from 'src/common/queries'
import { CheckCard, LoadingCard } from './CheckCard'

type CheckProps = {
  symbol: string
}

export const ProfitabilityCheck = ({ symbol }: CheckProps) => {
  const { data, loading } = useQuery(FMP, {
    variables: {
      endpoint: `https://financialmodelingprep.com/api/v3/cash-flow-statement/${symbol}?limit=10`,
    },
  })

  if (loading) return <LoadingCard />
  if (!data?.FMP?.response || data.FMP.response.length === 0) return null

  const cashflowStatements = data?.FMP?.response.slice().reverse()
  let losingYears = 0

  cashflowStatements.forEach((statement: any) => {
    if (statement.freeCashFlow < 0) {
      losingYears += 1
    }
  })

  let description = ''
  let sentiment = 'neutral'

  if (losingYears === 0) {
    description = 'Consistently profitable over the last 10 years '
    sentiment = 'success'
  } else if (losingYears < 3) {
    description = `Reported losses in ${losingYears} out of the last ${cashflowStatements.length} years.`
    sentiment = 'success'
  } else if (losingYears < 5) {
    description = `Reported losses in ${losingYears} out of the last ${cashflowStatements.length} years.`
    sentiment = 'warning'
  } else {
    description = `Reported losses in ${losingYears} out of the last ${cashflowStatements.length} years.`
    sentiment = 'danger'
  }

  return (
    <CheckCard
      icon={['fad', 'dollar-sign']}
      title="Profitability"
      description={description}
      // @ts-ignore
      sentiment={sentiment}
    ></CheckCard>
  )
}
