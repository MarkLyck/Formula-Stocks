import { useQuery } from '@apollo/client'
import dayjs from 'dayjs'
import { numberFormatter } from 'src/common/utils/formatters'

import { FMP } from 'src/common/queries'
import { CheckCard, LoadingCard } from './CheckCard'

type CheckProps = {
  symbol: string
}

export const InsiderTradesCheck = ({ symbol }: CheckProps) => {
  const { data, loading } = useQuery(FMP, {
    variables: {
      endpoint: `https://financialmodelingprep.com/api/v4/insider-trading?symbol=${symbol}&limit=25`,
    },
  })

  if (loading) return <LoadingCard />
  if (!data?.FMP.response || data?.FMP.response.length === 0) return null

  const date31DaysAgo = dayjs().subtract(31, 'day')

  const trades = data?.FMP.response
  const tradesInLastMonth = trades.filter((trade: any) => {
    const date = dayjs(trade.transactionDate)
    const isWithin30Days = dayjs(date).isAfter(date31DaysAgo)
    if (!isWithin30Days) return false
    return true
  })

  if (tradesInLastMonth.length === 0) return null

  // Securities Sold
  const sellingTrades = tradesInLastMonth.filter((trade: any) => trade.transactionType === 'S-Sale')
  const numberOfSharesSold = sellingTrades.reduce((acc: number, curr: any) => {
    acc += curr.securitiesTransacted
    return acc
  }, 0)

  // Securities Bought
  const buyingTrades = tradesInLastMonth.filter((trade: any) => trade.transactionType === 'P-Purchas')
  const numberOfSharesBought = buyingTrades.reduce((acc: number, curr: any) => {
    acc += curr.securitiesTransacted
    return acc
  }, 0)

  let description = ''
  let sentiment = 'neutral'

  if (numberOfSharesSold > 0 && numberOfSharesBought === 0) {
    description = `Insiders sold ${numberFormatter.format(numberOfSharesSold)} securities in the last 30 days.`
    sentiment = 'danger'
  }
  if (numberOfSharesBought > 0 && numberOfSharesSold === 0) {
    description = `Insiders bought ${numberFormatter.format(numberOfSharesBought)} securities in the last 30 days.`
    sentiment = 'success'
  }
  if (numberOfSharesSold !== 0 && numberOfSharesBought !== 0) {
    if (numberOfSharesSold > numberOfSharesBought) {
      description = `Insiders sold ${numberFormatter.format(
        numberOfSharesSold - numberOfSharesBought
      )} more securities than were purchased in the last 30 days.`
      sentiment = 'warning'
    } else {
      description = `Insiders bought ${numberFormatter.format(
        numberOfSharesBought - numberOfSharesSold
      )} more securities than were sold in the last 30 days.`
      sentiment = 'success'
    }
  }

  return (
    <CheckCard
      icon={['fad', 'handshake']}
      title="Insider trades"
      description={description}
      // @ts-ignore
      sentiment={sentiment}
    ></CheckCard>
  )
}
