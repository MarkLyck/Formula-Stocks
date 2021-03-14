import React from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from 'antd'
import { GenericLoading, Card, CardTitle, Empty } from 'src/ui-components'
import { currencyFormatter, numberFormatter } from 'src/common/utils/formatters'
import { STOCK_STATS_QUERY } from 'src/common/queries'
// import FSApolloClient from 'src/common/FSApolloClient'

const StatisticsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 24px;
`

export const StatBox = styled(Card)`
  flex-direction: column;
  margin-bottom: 24px;
`

const InfoBox = styled(Card)`
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  svg {
    font-size: 1.5rem;
    margin-right: 12px;
    color: ${(props: any) => props.theme.palette.primary[600]};
  }
`

const Bold = styled.span`
  font-weight: bold;
`

export const StatisticContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  border-bottom: 1px solid ${(p: any) => p.theme.palette.border};
  margin-bottom 4px;
  &:last-child {
    border-bottom: none;
    margin-bottom: none;
  }
`

export const StatisticLabel = styled.span``
export const StatisticValue = styled.span`
  color: ${(p: any) => (p.notAvailable ? p.theme.palette.border : p.theme.palette.text[500])};
  font-weight: bold;
`

interface StatisticPropsType {
  label: string
  value: string | number | null
  notAvailable?: boolean
  prefix?: string
  suffix?: string
  tooltip?: string
}

export const Statistic = ({ label, value, notAvailable, prefix = '', suffix = '', tooltip }: StatisticPropsType) => (
  <StatisticContainer>
    <Tooltip title={tooltip}>
      <StatisticLabel>{label}</StatisticLabel>
    </Tooltip>

    {/* @ts-ignore */}
    <StatisticValue notAvailable={notAvailable}>{notAvailable ? 'N/A' : `${prefix}${value}${suffix}`}</StatisticValue>
  </StatisticContainer>
)

export const NotNeededToUseService = ({
  title = "You don't need to know any of this information to use Weekly Stocktip!",
  text = "We've added this additional information for those who prefer to dig into the numbers and do their own analysis. All statistics & Financial reports for this stock have already been analyzed and taken into account for all Weekly Stocktip Signals",
}) => (
  <InfoBox>
    <FontAwesomeIcon icon={['far', 'info-circle']} />
    <div>
      <Bold>{title}</Bold>
      <p>{text}</p>
    </div>
  </InfoBox>
)

const Stats = ({ ticker }: { ticker: string }) => {
  const { loading, error, data } = useQuery(STOCK_STATS_QUERY, {
    variables: { ticker },
    // client: FSApolloClient,
  })
  if (loading)
    return (
      <>
        <NotNeededToUseService />
        <GenericLoading />
      </>
    )
  if (error || !data) {
    return <Empty label={`Statistics not available for ${ticker}`} />
  }
  let { quote = {}, advancedStats = {} } = data.stock
  if (!quote) quote = {}
  if (!advancedStats) advancedStats = {}

  return (
    <>
      <NotNeededToUseService />
      <StatisticsContainer>
        <StatBox>
          <CardTitle>Trading</CardTitle>
          <Statistic
            label="Previous Close"
            value={currencyFormatter.format(quote.previousClose)}
            notAvailable={!quote.previousClose}
            tooltip="The previous trading day closing price."
          />
          <Statistic
            label="Open"
            value={currencyFormatter.format(quote.iexOpen)}
            notAvailable={!quote.iexOpen}
            tooltip="Today's open price (only available when stock market is open)"
          />
          <Statistic
            label="Bid"
            value={`${currencyFormatter.format(quote.iexBidPrice)} x ${quote.iexAskSize}`}
            notAvailable={!quote.iexBidPrice}
            tooltip="The bid price represents the highest price a buyer is willing to pay for a share. (only available when the stock market is open)"
          />
          <Statistic
            label="Ask"
            value={`${currencyFormatter.format(quote.iexAskPrice)} x ${quote.iexAskSize}`}
            notAvailable={!quote.iexAskPrice}
            tooltip="The ask price represents the lowest price a seller is willing to part with shares. (only available when the stock market is open)"
          />
          <Statistic
            label="52 Week High"
            value={currencyFormatter.format(quote.week52High)}
            notAvailable={!quote.week52High}
            tooltip="A 52-week high is the highest price at which a stock has traded during the previous year."
          />
          <Statistic
            label="52 Week Low"
            value={currencyFormatter.format(quote.week52Low)}
            notAvailable={!quote.week52Low}
            tooltip="A 52-week low is the lowest price at which a stock has traded during the previous year."
          />
          <Statistic
            label="Volume"
            value={numberFormatter.format(quote.volume)}
            notAvailable={!quote.volume}
            tooltip="The number of shares that changed hands in a day."
          />
          <Statistic
            label="Avg. Volume"
            value={numberFormatter.format(quote.avgTotalVolume)}
            notAvailable={!quote.avgTotalVolume}
            tooltip="Refers to the 30 day average volume."
          />
          <Statistic
            label="YTD Change"
            value={(quote.ytdChange * 100).toFixed(2)}
            suffix="%"
            notAvailable={!quote.ytdChange}
            tooltip="Refers to the price change percentage from start of year to previous close."
          />
        </StatBox>

        <StatBox>
          <CardTitle>Summary</CardTitle>
          <Statistic
            label="Market Cap"
            value={currencyFormatter.format(quote.marketCap)}
            notAvailable={!quote.marketCap}
            tooltip="The total dollar market value of a company's outstanding shares of stock. It is calculated by multiplying the total number of a company's outstanding shares by the current market price of one share."
          />
          <Statistic
            label="Beta"
            value={advancedStats.beta ? advancedStats.beta.toFixed(2) : null}
            notAvailable={!advancedStats.beta}
            tooltip="Beta is a measure used in fundamental analysis to determine the volatility of a stock in relation to the overall market. Levered beta calculated with 1 year historical data and compared to SPY."
          />
          <Statistic
            label="P/E Ratio"
            value={quote.peRatio}
            notAvailable={!quote.peRatio || quote.peRatio <= 0}
            tooltip="The price to earnings ratio (PE Ratio) is the measure of the share price relative to the annual net income earned by the firm per share. PE ratio shows current investor demand for a company share. A high PE ratio generally indicates increased demand because investors anticipate earnings growth in the future. The PE ratio has units of years, which can be interpreted as the number of years of earnings to pay back purchase price."
          />
          <Statistic
            label="P/E High"
            value={advancedStats.peHigh ? advancedStats.peHigh.toFixed(2) : null}
            notAvailable={!advancedStats.peHigh}
            tooltip="52 week high of the company's PE Ratio."
          />
          <Statistic
            label="P/E Low"
            value={advancedStats.peLow ? advancedStats.peLow.toFixed(2) : null}
            notAvailable={!advancedStats.peLow}
            tooltip="52 week low of the company's PE Ratio."
          />
          <Statistic
            label="P/B Ratio"
            value={advancedStats.priceToBook ? advancedStats.priceToBook.toFixed(2) : null}
            notAvailable={!advancedStats.priceToBook}
            tooltip="The price-to-book ratio, or P/B ratio, is a financial ratio used to compare a company’s current market price to its book value"
          />
          <Statistic
            label="P/S Ratio"
            value={advancedStats.priceToSales ? advancedStats.priceToSales.toFixed(2) : null}
            notAvailable={!advancedStats.priceToSales}
            tooltip="Price–sales ratio, P/S ratio, or PSR, is a valuation metric for stocks. It is calculated by dividing the company’s market capitalization by the revenue in the most recent year; or, equivalently, divide the per-share stock price by the per-share revenue"
          />
          <Statistic
            label="Shares Outstanding"
            value={numberFormatter.format(advancedStats.sharesOutstanding)}
            notAvailable={!advancedStats.sharesOutstanding}
            tooltip="Number of shares outstanding as the difference between issued shares and treasury shares."
          />
          <Statistic
            label="Float"
            value={numberFormatter.format(advancedStats.float)}
            notAvailable={!advancedStats.float}
            tooltip="The annual shares outstanding minus closely held shares."
          />
        </StatBox>
        <StatBox>
          <CardTitle>Earnings</CardTitle>
          <Statistic
            label="EPS (TTM)"
            value={currencyFormatter.format(advancedStats.ttmEPS)}
            notAvailable={!advancedStats.ttmEPS}
            tooltip="Trailing twelve month earnings per share."
          />
          <Statistic
            label="EBITA"
            value={currencyFormatter.format(advancedStats.EBITDA)}
            notAvailable={!advancedStats.EBITDA}
            tooltip="Earnings before interest, tax, depreciation and amoritzation"
          />
          <Statistic
            label="Next Earnings Date"
            value={advancedStats.nextEarningsDate}
            notAvailable={!advancedStats.nextEarningsDate}
            tooltip="Expected next earnings report date."
          />
          <Statistic
            label="Revenue"
            value={currencyFormatter.format(advancedStats.revenue)}
            notAvailable={!advancedStats.revenue}
            tooltip="Refers to company revenue in dollars."
          />
          <Statistic
            label="Revenue per Share"
            value={currencyFormatter.format(advancedStats.revenuePerShare)}
            notAvailable={!advancedStats.revenuePerShare}
            tooltip="Amount of revenue over common shares outstanding"
          />
          <Statistic
            label="Revenue per Employee"
            value={currencyFormatter.format(advancedStats.revenuePerEmployee)}
            notAvailable={!advancedStats.revenuePerEmployee}
            tooltip="Net Income per employee (NIPE) is a company’s net income divided by the number of employees"
          />
          <Statistic
            label="Profit Margin"
            value={advancedStats.profitMargin ? (advancedStats.profitMargin * 100).toFixed(2) : null}
            notAvailable={!advancedStats.profitMargin}
            tooltip="A measure of profitability by finding the net profit as a percentage of the revenue"
            suffix="%"
          />
          <Statistic
            label="Gross Profit"
            value={currencyFormatter.format(advancedStats.grossProfit)}
            notAvailable={!advancedStats.grossProfit}
            tooltip="Gross profit is the profit a company makes after deducting the costs associated with making and selling its products, or the costs associated with providing its services"
          />
          <Statistic
            label="Total Cash"
            value={currencyFormatter.format(advancedStats.totalCash)}
            notAvailable={!advancedStats.totalCash}
            tooltip="Cash on hand"
          />
          <Statistic
            label="Current Debt"
            value={currencyFormatter.format(advancedStats.currentDebt)}
            notAvailable={!advancedStats.currentDebt}
            tooltip="Current Debt"
          />
          <Statistic
            label="Debt to Equity"
            value={advancedStats.debtToEquity}
            notAvailable={!advancedStats.debtToEquity}
            tooltip="The debt-to-equity (D/E) ratio is calculated by dividing a company’s total liabilities by its shareholder equity"
          />
          <Statistic
            label="EV"
            value={currencyFormatter.format(advancedStats.enterpriseValue)}
            notAvailable={!advancedStats.enterpriseValue}
            tooltip="Enterprise value (EV) is a measure of a company’s total value, often used as a more comprehensive alternative to equity market capitalization"
          />
          <Statistic
            label="EV/R"
            value={advancedStats.enterpriseValueToRevenue}
            notAvailable={!advancedStats.enterpriseValueToRevenue}
            tooltip="The enterprise value-to-revenue multiple (EV/R) is a measure of the value of a stock that compares a company’s enterprise value to its revenue"
          />
        </StatBox>
        <StatBox>
          <CardTitle>Dividends</CardTitle>
          <Statistic
            label="Dividend Rate (TTM)"
            value={currencyFormatter.format(advancedStats.ttmDividendRate)}
            notAvailable={!advancedStats.ttmDividendRate}
            tooltip="Trailing twelve month dividend rate per share"
          />
          <Statistic
            label="Dividend Yield"
            value={
              quote.previousClose && advancedStats.ttmDividendRate
                ? ((advancedStats.ttmDividendRate / quote.previousClose) * 100).toFixed(2)
                : null
            }
            notAvailable={!advancedStats.dividendYield}
            tooltip="The ratio of trailing twelve month dividend compared to the previous day close price. The dividend yield is represented as a percentage calculated as (ttmDividendRate) / (previous day close price)"
            suffix="%"
          />
          <Statistic
            label="Next Dividend Date"
            value={advancedStats.nextDividendDate}
            notAvailable={!advancedStats.nextDividendDate}
            tooltip="Expected date for the next dividend payout"
          />
          <Statistic
            label="Last Dividend Date"
            value={advancedStats.exDividendDate}
            notAvailable={!advancedStats.exDividendDate}
            tooltip="Last date dividends were paid out"
          />
        </StatBox>
      </StatisticsContainer>
    </>
  )
}

export default Stats
