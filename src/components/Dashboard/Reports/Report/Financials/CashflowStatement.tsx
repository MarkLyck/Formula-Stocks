import { Spin, Table } from 'antd'
import { useQuery } from '@apollo/client'
import { currencyRoundedFormatter } from 'src/common/utils/formatters'
import { lowerCase } from 'lodash'

import { FMP } from 'src/common/queries'

const currencyFormatters = [
  'netIncome',
  'depreciationAndAmortization',
  'deferredIncomeTax',
  'stockBasedCompensation',
  'changeInWorkingCapital',
  'accountsReceivables',
  'inventory',
  'accountsPayables',
  'otherWorkingCapital',
  'otherNonCashItems',
  'netCashProvidedByOperatingActivities',
  'investmentsInPropertyPlantAndEquipment',
  'acquisitionsNet',
  'purchasesOfInvestments',
  'salesMaturitiesOfInvestments',
  'otherInvestingActivites',
  'netCashUsedForInvestingActivites',
  'debtRepayment',
  'commonStockIssued',
  'commonStockRepurchased',
  'dividendsPaid',
  'otherFinancingActivites',
  'netCashUsedProvidedByFinancingActivities',
  'effectOfForexChangesOnCash',
  'netChangeInCash',
  'cashAtEndOfPeriod',
  'cashAtBeginningOfPeriod',
  'operatingCashFlow',
  'capitalExpenditure',
  'freeCashFlow',
]

const columns = [
  {
    title: 'Label',
    dataIndex: 'label',
    key: 'label',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  },
]

const CashflowStatement = ({ symbol }: any) => {
  const { data, loading } = useQuery(FMP, {
    variables: {
      endpoint: `https://financialmodelingprep.com/api/v3/cash-flow-statement/${symbol}?limit=1`,
    },
  })

  if (loading) return <Spin />

  const cashflowStatements = data?.FMP?.response || []

  const cashflowEntries = Object.entries(cashflowStatements[0])
  const cashflowData = cashflowEntries.map((entry) => {
    let label = entry[0]
    let value = entry[1]

    if (currencyFormatters.includes(label)) {
      value = currencyRoundedFormatter.format(Number(value))
    }

    return { label: lowerCase(label), value }
  })

  return <Table columns={columns} dataSource={cashflowData} pagination={false} />
}

export default CashflowStatement
