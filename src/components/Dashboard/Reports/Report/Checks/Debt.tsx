import { Card } from 'antd'
import { useQuery } from '@apollo/client'

import { FMP } from 'src/common/queries'
import { CheckCard, LoadingCard } from './CheckCard'

type CheckProps = {
  symbol: string
}

export const DebtCheck = ({ symbol }: CheckProps) => {
  const { data: balanceSheetData, loading: balanceSheetLoading } = useQuery(FMP, {
    variables: {
      endpoint: `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${symbol}?limit=1`,
    },
  })
  const { data: cashflowData, loading: cashflowLoading } = useQuery(FMP, {
    variables: {
      endpoint: `https://financialmodelingprep.com/api/v3/cash-flow-statement/${symbol}?limit=1`,
    },
  })

  if (balanceSheetLoading || cashflowLoading) return <LoadingCard />
  if (!balanceSheetData?.FMP?.response[0] || !cashflowData?.FMP?.response[0]) return null

  const balanceSheet = balanceSheetData?.FMP?.response[0]
  const cashflowStatement = cashflowData?.FMP?.response[0]
  const { netDebt, totalDebt, cashAndCashEquivalents } = balanceSheet
  const { freeCashFlow } = cashflowStatement

  const canPayOffDebtWithCashOnHand = totalDebt <= cashAndCashEquivalents
  const yearsToPayOffDebt = Math.ceil(netDebt / freeCashFlow)

  const yearsText = `year${yearsToPayOffDebt === 1 ? '' : 's'}`

  if (freeCashFlow <= 0) return null

  let description = ''
  let sentiment = 'neutral'
  if (canPayOffDebtWithCashOnHand) {
    description = 'Total debt can be paid off with cash on hand.'
    sentiment = 'success'
  } else if (yearsToPayOffDebt <= 3) {
    description = `Net debt can be paid off in ${yearsToPayOffDebt} ${yearsText} with free cashflow.`
    sentiment = 'success'
  } else if (yearsToPayOffDebt <= 5) {
    description = `Net debt can be paid off in ${yearsToPayOffDebt} ${yearsText} with free cashflow.`
    sentiment = 'neutral'
  } else {
    description = `It would take ${yearsToPayOffDebt} ${yearsText} to pay off the debt with free cashflow.`
    sentiment = 'danger'
  }

  return (
    <CheckCard
      icon={['fad', 'balance-scale-right']}
      title="Debt"
      description={description}
      sentiment={sentiment}
    ></CheckCard>
  )
}
