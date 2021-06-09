import { Spin, Space } from 'antd'
import { useQuery } from '@apollo/client'

import { FMP } from 'src/common/queries'

import ROIC from './ROIC'
import Equity from './Equity'
import Earnings from './Earnings'
import Sales from './Sales'
import Cashflow from './Cashflow'

const Financials = ({ symbol }: any) => {
  const { data: incomeStatementsData, loading: incomeStatementsLoading } = useQuery(FMP, {
    variables: {
      endpoint: `https://financialmodelingprep.com/api/v3/income-statement/${symbol}?limit=10`,
    },
  })
  // const { data: balanceSheetsData, loading: balanceSheetsLoading } = useQuery(FMP, {
  //   variables: {
  //     endpoint: `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${symbol}?limit=10`,
  //   },
  // })
  const { data: cashflowsData, loading: cashflowsLoading } = useQuery(FMP, {
    variables: {
      endpoint: `https://financialmodelingprep.com/api/v3/cash-flow-statement/${symbol}?limit=10`,
    },
  })
  const { data: keyMetricsData, loading: keyMetricsLoading } = useQuery(FMP, {
    variables: {
      endpoint: `https://financialmodelingprep.com/api/v3/key-metrics/${symbol}?limit=10`,
    },
  })

  if (incomeStatementsLoading || cashflowsLoading || keyMetricsLoading) return <Spin />

  const incomeStatements = (incomeStatementsData?.FMP?.response || []).slice().reverse()
  // const balanceSheets = (balanceSheetsData?.FMP?.response || []).slice().reverse()
  const cashflowStatements = (cashflowsData?.FMP?.response || []).slice().reverse()
  const keyMetrics = (keyMetricsData?.FMP?.response || []).slice().reverse()

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <ROIC keyMetrics={keyMetrics} />
      <Equity keyMetrics={keyMetrics} />
      <Earnings incomeStatements={incomeStatements} />
      <Sales incomeStatements={incomeStatements} />
      <Cashflow cashflowStatements={cashflowStatements} />
    </Space>
  )
}

export default Financials
