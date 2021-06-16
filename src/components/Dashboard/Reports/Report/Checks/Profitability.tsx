import { useQuery } from '@apollo/client'

import { FMP } from 'src/common/queries'
import { currencyRoundedFormatter } from 'src/common/utils/formatters'
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
  const latestFreeCashflow = cashflowStatements[cashflowStatements.length - 1].freeCashFlow
  let losingYears = 0

  const hasPositiveGrowth =
    cashflowStatements[0].freeCashFlow < cashflowStatements[cashflowStatements.length - 1].freeCashFlow

  cashflowStatements.forEach((statement: any) => {
    if (statement.freeCashFlow < 0) {
      losingYears += 1
    }
  })

  let description = ''
  let sentiment = 'neutral'

  if (latestFreeCashflow < 0) {
    if (losingYears === 1) {
      description = `Reported a loss of ${currencyRoundedFormatter.format(latestFreeCashflow)} last year.`
      sentiment = 'danger'
    } else if (losingYears > 1) {
      description = `Reported losses in ${losingYears} out of the last ${cashflowStatements.length} years.`
      sentiment = 'danger'
    }
  } else {
    if (hasPositiveGrowth) {
      if (losingYears === 0) {
        description = 'Consistently profitable over the last 10 years '
        sentiment = 'success'
      } else {
        description = `Reported losses in ${losingYears} out of the last ${cashflowStatements.length} years.`
        sentiment = 'warning'
      }
    } else {
      if (losingYears === 0) {
        description = 'Consistently Profitable, but free cashflow is declining.'
        sentiment = 'warning'
      } else {
        description = `Reported losses in ${losingYears} out of the last ${cashflowStatements.length} years.`
        sentiment = losingYears >= 5 ? 'danger' : 'warning'
      }
    }
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
