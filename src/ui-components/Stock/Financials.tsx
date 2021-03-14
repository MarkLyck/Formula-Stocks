import React from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { CardTitle, GenericLoading, Empty } from 'src/ui-components'
import { currencyFormatter } from 'src/common/utils/formatters'
import { STOCK_FINANCIALS_QUERY } from 'src/common/queries'
// import FSApolloClient from 'src/common/FSApolloClient'
import { Statistic, StatBox, NotNeededToUseService } from './Stats'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 24px;
`

const Financials = ({ ticker }: { ticker: string }) => {
  const { loading, error, data } = useQuery(STOCK_FINANCIALS_QUERY, {
    variables: { ticker },
    // client: FSApolloClient,
  })
  if (loading) {
    return (
      <>
        <NotNeededToUseService />
        <GenericLoading />
      </>
    )
  }

  if (error || !data) {
    return <Empty label={`Financials not available for ${ticker}`} />
  }

  let { cashFlow, balanceSheet } = data.stock
  if (!cashFlow) cashFlow = {}
  if (!balanceSheet) balanceSheet = {}

  return (
    <>
      <NotNeededToUseService />
      <Container>
        <StatBox>
          <CardTitle>Cash Flow</CardTitle>
          <Statistic
            label="Report Date"
            value={cashFlow.reportDate}
            notAvailable={!cashFlow.reportDate}
            tooltip="Date financials were reported."
          />
          <Statistic
            label="Fiscal Date"
            value={cashFlow.fiscalDate}
            notAvailable={!cashFlow.fiscalDate}
            tooltip="The last day of the relevant fiscal period."
          />
          <Statistic
            label="Currency"
            value={cashFlow.currency}
            notAvailable={!cashFlow.currency}
            tooltip="Currency used for reported financials."
          />
          <Statistic
            label="Net Income"
            value={currencyFormatter.format(cashFlow.netIncome)}
            notAvailable={!cashFlow.netIncome}
            tooltip="Represents income before extraordinary items and preferred and common dividends, but after operating and non-operating income and expenses, minority interest and equity in earnings."
          />
          <Statistic
            label="Depreciation"
            value={currencyFormatter.format(cashFlow.depreciation)}
            notAvailable={!cashFlow.depreciation}
            tooltip="Depreciation represents the process of allocating the cost of a depreciable asset to the accounting periods covered during its expected useful life to a business. Depletion refers to cost allocation for natural resources such as oil and mineral deposits. Amortization relates to cost allocation for intangible assets such as patents and leasehold improvements, trademarks, book plates, tools & film costs. This item includes dry-hole expense, abandonments and oil and gas property valuation provision for extractive companies. This item excludes amortization of discounts or premiums on financial instruments owned or outstanding and depreciation on discontinued operations."
          />
          <Statistic
            label="Changes in receivables"
            value={currencyFormatter.format(cashFlow.changesInReceivables)}
            notAvailable={!cashFlow.changesInReceivables}
            tooltip="Represents the change in the amount of receivables from one year to the next as reported in the cash flow statement."
          />
          <Statistic
            label="Changes in Inventories"
            value={currencyFormatter.format(cashFlow.changesInInventories)}
            notAvailable={!cashFlow.changesInInventories}
            tooltip="Represents the change in the amount of inventories from one year to the next as reported in the cash flow statement."
          />
          <Statistic
            label="Cash Change"
            value={currencyFormatter.format(cashFlow.cashChange)}
            notAvailable={!cashFlow.cashChange}
            tooltip="Represents the change in cash and short term investments from one year to the next. This item is available only when the Statement of Changes in Financial Position is based on cash and short term investments."
          />
          <Statistic
            label="Cash Flow"
            value={currencyFormatter.format(cashFlow.cashFlow)}
            notAvailable={!cashFlow.cashFlow}
            tooltip="Net cash from operating activities for the period calculated as the sum of funds from operations, extraordinary items, and funds from other operating activities."
          />
          <Statistic
            label="Capital Expenditures"
            value={currencyFormatter.format(cashFlow.capitalExpenditures)}
            notAvailable={!cashFlow.capitalExpenditures}
            tooltip="Total capital expenditures for the period calculated as the sum of capital expenditures additions to fixed assets, and additions to other assets."
          />
          <Statistic
            label="Investments"
            value={currencyFormatter.format(cashFlow.investments)}
            notAvailable={!cashFlow.investments}
            tooltip="Purchase/sale of investments for the period calculated as the sum of the negative of increase in investments, and decrease in investments."
          />
          <Statistic
            label="Other Investment Activity"
            value={currencyFormatter.format(cashFlow.investingActivityOther)}
            notAvailable={!cashFlow.investingActivityOther}
            tooltip="Represents any other funds employed in investing activities and not included in capital expenditures, net assets from acquisitions, increase in investments, decrease in investments or additions to property."
          />
          <Statistic
            label="Total Investing Cash Flows"
            value={currencyFormatter.format(cashFlow.totalInvestingCashFlows)}
            notAvailable={!cashFlow.totalInvestingCashFlows}
            tooltip="Net cash from investing activities for the period calculated as (Cash Flow from Investing Activity) - Net. If this is not available, then it is calculated as (Other Uses/(Sources) Investing) + (Disposal of fixed assets) + (decrease in investments) - (net assets from acquisitions) - (capital expenditures other assets) - (increase in investments) - (capital expenditures additions to fixed assets)"
          />
          <Statistic
            label="Dividends Paid"
            value={currencyFormatter.format(cashFlow.dividendsPaid)}
            notAvailable={!cashFlow.dividendsPaid}
            tooltip="Represents the total common and preferred dividends paid to shareholders of the company. Excludes dividends paid to minority shareholders."
          />
          <Statistic
            label="Net Borrowings"
            value={currencyFormatter.format(cashFlow.netBorrowings)}
            notAvailable={!cashFlow.netBorrowings}
            tooltip="Net issuance/reduction of debt for the period calculated as (increase/decrease in short term borrowings) + (long term borrowings - reduction in long term debt)"
          />
          <Statistic
            label="Other Financial Cash Flows"
            value={currencyFormatter.format(cashFlow.otherFinancingCashFlows)}
            notAvailable={!cashFlow.otherFinancingCashFlows}
            tooltip="Other financing activities for the period."
          />
          <Statistic
            label="Cash Flow Financing"
            value={currencyFormatter.format(cashFlow.cashFlowFinancing)}
            notAvailable={!cashFlow.cashFlowFinancing}
            tooltip="Net cash from financing activities for the period."
          />
          <Statistic
            label="Exchange Rate Effect"
            value={currencyFormatter.format(cashFlow.exchangeRateEffect)}
            notAvailable={!cashFlow.exchangeRateEffect}
            tooltip="Represents the effect of translating from one currency to another on the cash flow of the company."
          />
        </StatBox>
        <StatBox>
          <CardTitle>Balance Sheet</CardTitle>
          <Statistic
            label="Report Date"
            value={balanceSheet.reportDate}
            notAvailable={!balanceSheet.reportDate}
            tooltip="Date financials were reported."
          />
          <Statistic
            label="Fiscal Date"
            value={balanceSheet.fiscalDate}
            notAvailable={!balanceSheet.fiscalDate}
            tooltip="The last day of the relevant fiscal period."
          />
          <Statistic
            label="Currency"
            value={balanceSheet.currency}
            notAvailable={!balanceSheet.currency}
            tooltip="Currency for reported financials."
          />
          <Statistic
            label="Current Cash"
            value={currencyFormatter.format(balanceSheet.currentCash)}
            notAvailable={!balanceSheet.currentCash}
            tooltip="Represents current cash excluding short-term investments. Current cash excludes commercial paper issued by unconsolidated subsidiaries to the parent company, amount due from sale of debentures, checks written by the company but not yet deposited and charged to the company’s bank account, and promissory notes."
          />
          <Statistic
            label="Short-term Investments"
            value={currencyFormatter.format(balanceSheet.shortTermInvestments)}
            notAvailable={!balanceSheet.shortTermInvestments}
            tooltip="Total short-term investments."
          />
          <Statistic
            label="Receivables"
            value={currencyFormatter.format(balanceSheet.receivables)}
            notAvailable={!balanceSheet.receivables}
            tooltip="Represents net claims against customers for merchandise sold or services performed in the ordinary course of business."
          />
          <Statistic
            label="Inventory"
            value={currencyFormatter.format(balanceSheet.inventory)}
            notAvailable={!balanceSheet.inventory}
            tooltip="Represents tangible items or merchandise net of advances and obsolescence acquired for either resale directly or included in the production of finished goods manufactured for sale in the normal course of operation. Excludes tools that are listed in current assets, supplies and prepaid expenses for companies that lump these items together, advances from customers, and contract billings. For non-U.S. companies, if negative inventories arise from advances from customers greater than costs on long-term contracts, it is reclassified to current liabilities."
          />
          <Statistic
            label="Current Assets"
            value={currencyFormatter.format(balanceSheet.currentAssets)}
            notAvailable={!balanceSheet.currentAssets}
            tooltip="Represents cash and other assets that are reasonably expected to be realized in cash, sold or consumed within one year or one operating cycle. Generally, the sum of cash and equivalents, receivables, inventories, prepaid expenses, and other current assets. For non-U.S. companies, long term receivables are excluded from current assets even though included in net receivables."
          />
          <Statistic
            label="Other current Assets"
            value={currencyFormatter.format(balanceSheet.otherCurrentAssets)}
            notAvailable={!balanceSheet.otherCurrentAssets}
            tooltip="Represents other current assets for the period."
          />
          <Statistic
            label="Long-term Investments"
            value={currencyFormatter.format(balanceSheet.longTermInvestments)}
            notAvailable={!balanceSheet.longTermInvestments}
            tooltip="Represents total investments and advances for the period. Calculated as long term investment minus affiliate companies and other long term investments."
          />
          <Statistic
            label="Property Plant Equipment"
            value={currencyFormatter.format(balanceSheet.propertyPlantEquipment)}
            notAvailable={!balanceSheet.propertyPlantEquipment}
            tooltip="Represents gross property, plant, and equipment less accumulated reserves for depreciation, depletion, and amortization."
          />
          <Statistic
            label="Goodwill"
            value={currencyFormatter.format(balanceSheet.goodwill)}
            notAvailable={!balanceSheet.goodwill}
            tooltip="Represents the excess cost over the fair market value of the net assets purchased. Is excluded from other intangible assets."
          />
          <Statistic
            label="Other Assets"
            value={currencyFormatter.format(balanceSheet.otherAssets)}
            notAvailable={!balanceSheet.otherAssets}
            tooltip="Other assets for the period calculated as other assets including intangibles minus intangible other assets."
          />
          <Statistic
            label="Total Assets"
            value={currencyFormatter.format(balanceSheet.totalAssets)}
            notAvailable={!balanceSheet.totalAssets}
            tooltip="Represents the sum of total current assets, long-term receivables, investment in unconsolidated subsidiaries, other investments, net property plant and equipment, deferred tax assets, and other assets."
          />
          <Statistic
            label="Accounts Payable"
            value={currencyFormatter.format(balanceSheet.accountsPayable)}
            notAvailable={!balanceSheet.accountsPayable}
            tooltip="Represents the claims of trade creditors for unpaid goods and services that are due within the normal operating cycle of the company."
          />
          <Statistic
            label="Current Long-term Debt"
            value={currencyFormatter.format(balanceSheet.currentLongTermDebt)}
            notAvailable={!balanceSheet.currentLongTermDebt}
            tooltip="Represents the amount of long term debt due within the next twelve months. Excludes notes payable arising from short term borrowings, current maturities of participation and entertainment obligation, contracts payable for broadcast rights, current portion of advances and production payments Bank overdrafts, advances from subsidiaries/associated companies, and current portion of preferred stock of a subsidiary."
          />
          <Statistic
            label="Other Current Liabilities"
            value={currencyFormatter.format(balanceSheet.otherCurrentLiabilities)}
            notAvailable={!balanceSheet.otherCurrentLiabilities}
            tooltip="Represents other current liabilities and calculated as the sum of misc current liabilities, dividends payable, and accrued payroll."
          />
          <Statistic
            label="Total Current Liabilities"
            value={currencyFormatter.format(balanceSheet.totalCurrentLiabilities)}
            notAvailable={!balanceSheet.totalCurrentLiabilities}
            tooltip="Represents debt or other obligations that the company expects to satisfy within one year."
          />
          <Statistic
            label="Long-term Debt"
            value={currencyFormatter.format(balanceSheet.longTermDebt)}
            notAvailable={!balanceSheet.longTermDebt}
            tooltip="Represents all interest-bearing financial obligations, excluding amounts due within one year, net of premium or discount. Excludes current portion of long-term debt, pensions, deferred taxes, and minority interest."
          />
          <Statistic
            label="Other Liabilities"
            value={currencyFormatter.format(balanceSheet.otherLiabilities)}
            notAvailable={!balanceSheet.otherLiabilities}
            tooltip="Other liabilities for the period calculated as the sum of other liabilities excluding deferred revenue, deferred income, and deferred tax liability in untaxed reserves."
          />
          <Statistic
            label="Minority Interest"
            value={currencyFormatter.format(balanceSheet.minorityInterest)}
            notAvailable={!balanceSheet.minorityInterest}
            tooltip="Represents the portion of earnings/losses of a subsidiary pertaining to common stock not owned by the controlling company or other members of the consolidated group. Minority Interest is subtracted from consolidated net income to arrive at the company’s net income."
          />
          <Statistic
            label="Total Liabilities"
            value={currencyFormatter.format(balanceSheet.totalLiabilities)}
            notAvailable={!balanceSheet.totalLiabilities}
            tooltip="Represents all short and long term obligations expected to be satisfied by the company. Excludes minority interest preferred stock equity, preferred stock equity, common stock equity, and non-equity reserves."
          />
          <Statistic
            label="Common Stock"
            value={currencyFormatter.format(balanceSheet.commonStock)}
            notAvailable={!balanceSheet.commonStock}
            tooltip="Number of shares outstanding as the difference between issued shares and treasury shares."
          />
          <Statistic
            label="Retained Earnings"
            value={currencyFormatter.format(balanceSheet.retainedEarnings)}
            notAvailable={!balanceSheet.retainedEarnings}
            tooltip="Represents the accumulated after tax earnings of the company which have not been distributed as dividends to shareholders or allocated to a reserve amount. Excess involuntary liquidation value over stated value of preferred stock is deducted if there is an insufficient amount in the capital surplus account."
          />
          <Statistic
            label="Treasury Stock"
            value={currencyFormatter.format(balanceSheet.treasuryStock)}
            notAvailable={!balanceSheet.treasuryStock}
            tooltip="Represents the acquisition cost of shares held by the company. For non-U.S. companies treasury stock may be carried at par value. This stock is not entitled to dividends, has no voting rights, and does not share in the profits in the event of liquidation."
          />
          <Statistic
            label="Capital Surplus"
            value={currencyFormatter.format(balanceSheet.capitalSurplus)}
            notAvailable={!balanceSheet.capitalSurplus}
            tooltip="Represents the amount received in excess of par value from the sale of common stock. Along with common stock it is the equity capital received from parties outside the company."
          />
          <Statistic
            label="Shareholder Equity"
            value={currencyFormatter.format(balanceSheet.shareholderEquity)}
            notAvailable={!balanceSheet.shareholderEquity}
            tooltip="Total shareholders’ equity for the period calculated as the sum of total common equity and preferred stock carrying value."
          />
          <Statistic
            label="Net Tangible Assets"
            value={currencyFormatter.format(balanceSheet.netTangibleAssets)}
            notAvailable={!balanceSheet.netTangibleAssets}
            tooltip="Calculated as shareholder equity less goodwill and less"
          />
        </StatBox>
      </Container>
    </>
  )
}

export default Financials
