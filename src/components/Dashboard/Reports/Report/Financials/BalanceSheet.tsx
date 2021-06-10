import { Spin, Table } from 'antd'
import { useQuery } from '@apollo/client'
import { currencyRoundedFormatter } from 'src/common/utils/formatters'
import { lowerCase } from 'lodash'

import { FMP } from 'src/common/queries'

const currencyFormatters = [
  'cashAndCashEquivalents',
  'shortTermInvestments',
  'cashAndShortTermInvestments',
  'netReceivables',
  'inventory',
  'otherCurrentAssets',
  'propertyPlantEquipmentNet',
  'goodwill',
  'intangibleAssets',
  'goodwillAndIntangibleAssets',
  'longTermInvestments',
  'taxAssets',
  'otherNonCurrentAssets',
  'totalNonCurrentAssets',
  'otherAssets',
  'totalAssets',
  'accountPayables',
  'shortTermDebt',
  'taxPayables',
  'deferredRevenue',
  'otherCurrentLiabilities',
  'totalCurrentLiabilities',
  'longTermDebt',
  'deferredRevenueNonCurrent',
  'deferredTaxLiabilitiesNonCurrent',
  'otherNonCurrentLiabilities',
  'totalNonCurrentLiabilities',
  'otherLiabilities',
  'totalLiabilities',
  'commonStock',
  'retainedEarnings',
  'accumulatedOtherComprehensiveIncomeLoss',
  'othertotalStockholdersEquity',
  'totalStockholdersEquity',
  'totalLiabilitiesAndStockholdersEquity',
  'totalInvestments',
  'totalDebt',
  'netDebt',
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

const BalanceSheet = ({ symbol }: any) => {
  const { data, loading } = useQuery(FMP, {
    variables: {
      endpoint: `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${symbol}?limit=1`,
    },
  })
  if (loading) return <Spin />

  const balanceSheets = data?.FMP?.response || []

  const balanceSheetEntries = Object.entries(balanceSheets[0])
  const balanceSheetData = balanceSheetEntries.map((entry) => {
    let label = entry[0]
    let value = entry[1]

    if (currencyFormatters.includes(label)) {
      value = currencyRoundedFormatter.format(Number(value))
    }

    return { label: lowerCase(label), value }
  })

  return <Table columns={columns} dataSource={balanceSheetData} pagination={false} />
}

export default BalanceSheet
