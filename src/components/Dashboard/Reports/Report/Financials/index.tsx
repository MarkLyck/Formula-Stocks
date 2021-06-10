import { Tabs } from 'antd'

import IncomeStatement from './IncomeStatement'
import BalanceSheet from './BalanceSheet'
import CashflowStatement from './CashflowStatement'

const { TabPane } = Tabs

const Financials = ({ symbol }: any) => {
  return (
    <Tabs defaultActiveKey="income-statement">
      <TabPane tab="Income Statement" key="income-statement">
        <IncomeStatement symbol={symbol} />
      </TabPane>
      <TabPane tab="Balance Sheet" key="balance-sheet">
        <BalanceSheet symbol={symbol} />
      </TabPane>
      <TabPane tab="Cashflow Statement" key="cashflow-statement">
        <CashflowStatement symbol={symbol} />
      </TabPane>
    </Tabs>
  )
}

export default Financials
