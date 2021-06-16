import { useQuery } from '@apollo/client'
// import dayjs from 'dayjs'
import { currencyFormatter } from 'src/common/utils/formatters'

import { FMP } from 'src/common/queries'
import { CheckCard, LoadingCard } from './CheckCard'

type CheckProps = {
  symbol: string
}

export const DividendsCheck = ({ symbol }: CheckProps) => {
  const { data, loading } = useQuery(FMP, {
    variables: {
      endpoint: `https://financialmodelingprep.com/api/v3/ratios-ttm/${symbol}`,
    },
  })

  if (loading) return <LoadingCard />
  if (!data?.FMP.response || data?.FMP.response.length === 0) return null
  const ratiosTTM = data?.FMP.response[0]

  const dividendYield = ratiosTTM.dividendYieldTTM * 100
  const dividendPerShare = ratiosTTM.dividendPerShareTTM

  let description = '$0'
  let sentiment = 'neutral'

  if (dividendYield) {
    description = `${dividendYield.toFixed(2)}% - ${currencyFormatter.format(dividendPerShare)} per share`
  }

  return (
    <CheckCard
      icon={['fad', 'dollar-sign']}
      title="Dividends"
      description={description}
      // @ts-ignore
      sentiment={sentiment}
    ></CheckCard>
  )
}
