import { Spin, Table } from 'antd'
import { useQuery } from '@apollo/client'
import { currencyRoundedFormatter, numberFormatter } from 'src/common/utils/formatters'
import { lowerCase } from 'lodash'

import { FMP } from 'src/common/queries'

const currencyFormatters = [
  'revenue',
  'costOfRevenue',
  'grossProfit',
  'researchAndDevelopmentExpenses',
  'generalAndAdministrativeExpenses',
  'sellingAndMarketingExpenses',
  'otherExpenses',
  'operatingExpenses',
  'costAndExpenses',
  'interestExpense',
  'depreciationAndAmortization',
  'ebitda',
  'operatingIncome',
  'totalOtherIncomeExpensesNet',
  'incomeBeforeTax',
  'incomeTaxExpense',
  'netIncome',
  'eps',
  'epsdiluted',
  'incomeTaxExpense',
]

const numberFormatters = ['weightedAverageShsOut', 'weightedAverageShsOutDil']

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

const IncomeStatement = ({ symbol }: any) => {
  const { data, loading } = useQuery(FMP, {
    variables: {
      endpoint: `https://financialmodelingprep.com/api/v3/income-statement/${symbol}?limit=1`,
    },
  })
  if (loading) return <Spin />

  const incomeStatements = data?.FMP?.response || []

  const incomeStatementEntries = Object.entries(incomeStatements[0])
  const incomeStatementData = incomeStatementEntries.map((entry) => {
    let label = entry[0]
    let value = entry[1]

    if (currencyFormatters.includes(label)) {
      value = currencyRoundedFormatter.format(Number(value))
    } else if (numberFormatters.includes(label)) {
      value = numberFormatter.format(Number(value))
    }

    return { label: lowerCase(label), value }
  })

  return <Table columns={columns} dataSource={incomeStatementData} pagination={false} />
}

export default IncomeStatement
