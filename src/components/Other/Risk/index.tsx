import React from 'react'
import styled from '@emotion/styled'
import { Typography, Card, Spin, Tabs } from 'antd'
import { useQuery } from '@apollo/client'

import Navbar from '../Navbar'
import { StockReturn } from '~/ui-components/Stock'
import {
  STATISTICS,
  STATISTICS_SINCE_LAUNCH,
  BACKTESTED_PERFORMANCE_HISTORY,
  MARKET_PRICE_HISTORY,
} from 'src/common/queries'
import { Disclaimer } from 'src/ui-components'
import BacktestedChart from 'src/components/LandingPage/Performance/BacktestedChart'
import { COMPANY_NAME } from '~/common/constants'
import Recessions from './Recessions'
import TimeInvestedChart from './TimeInvestedChart'

const { Title, Paragraph } = Typography
const { TabPane } = Tabs

const RiskContainer = styled.div`
  background: ${(props) => props.theme.palette.neutral[200]};
  box-sizing: border-box;
  padding-bottom: 32px;
`

const Content = styled(Card)`
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  padding: 0 32px;
  padding-top: 100px;
  margin-bottom: 32px;

  background: white;
`
const StyledCard = styled(Card)`
  border-radius: 8px;
  margin: 16px 0;

  .ant-card-body {
    padding: 0;
    display: flex;
    flex-direction: column;
  }
`
const ListItem = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${(props) => props.theme.palette.neutral[200]};
  font-size: 16px;
  span:first-of-type {
    font-weight: 500;
    color: ${(props) => props.theme.palette.neutral[700]};
  }

  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Risk = () => {
  const { data, loading } = useQuery(STATISTICS)
  const { data: launchData, loading: launchLoading } = useQuery(STATISTICS_SINCE_LAUNCH)
  const { data: planData, loading: planLoading, error: planError } = useQuery(BACKTESTED_PERFORMANCE_HISTORY, {
    variables: {
      plan: 'entry',
    },
  })
  const { data: marketData } = useQuery(MARKET_PRICE_HISTORY, {
    variables: {
      marketType: 'SP500',
      fromDate: '1970-01-30',
    },
  })

  const now = new Date()

  if (loading || launchLoading) return <Spin />

  const statistics = data?.statisticsList?.items[0]
  const launchStatistics = launchData?.statisticsSinceLaunchesList?.items[0]
  const { winLossRatio, averageGainPerPosition, averageLossPerPosition } = statistics
  const { winLossRatio: launchWinLossRatio } = launchStatistics

  const winRatio = winLossRatio.toFixed(2)
  const lossRatio = (100 - winLossRatio).toFixed(2)

  const backtestedHistory = planData?.plan?.backtestedHistory || []
  const marketHistory = marketData?.marketPricingHistoriesList?.items || []

  return (
    <>
      {/* @ts-ignore */}
      <Navbar />
      <RiskContainer>
        <Content>
          <Title>Risk</Title>
          <Paragraph>
            All investments carry some degree of risk. This page attempts to explain the risks associated with using{' '}
            {COMPANY_NAME} both short-term and long-term.
          </Paragraph>
          <Title level={4}>Investments sold with a loss.</Title>
          <Paragraph>
            Since 1970 about {winRatio}% of the signals provided has been sold with a profit. That of course also means
            that {lossRatio}% sold with a loss. To better understand the risk associated with this, it's important to
            look at the average return, v.s. the average loss.
          </Paragraph>
          <StyledCard>
            <ListItem>
              <span>Average return of the {winRatio}% winning trades:</span>{' '}
              <StockReturn percentReturn={Number(averageGainPerPosition.toFixed(2))} />
            </ListItem>
            <ListItem>
              <span>Average loss of the {lossRatio}% losing trades:</span>{' '}
              <StockReturn percentReturn={Number(-averageLossPerPosition.toFixed(2))} />
            </ListItem>
          </StyledCard>
          <Paragraph>
            This shows an assymetrical gain to pain ratio. The average return of the winning trades, are much higher
            than the average loss of the losing trades. The win ratio, and average returns are calculated from our
            backtests since 1970 to {now.getFullYear()}. We have observed statistically similar results in realtime
            since our launch in 2009 with a slighly higher win ratio of +{launchWinLossRatio.toFixed(2)}%.
          </Paragraph>
          <Paragraph>
            While any single investment could have resulted in a loss. Having invested in a large bucket of our signals
            over a long period of time would have resulted in a very safe and very rewarding portfolio.<sup>*</sup>
          </Paragraph>
          <Disclaimer style={{ marginBottom: 32 }}>
            <sup>*</sup>Past returns does not guarantee future results
          </Disclaimer>
          <Title level={4}>How does Formula Stocks handle a stock market crash?</Title>
          <Paragraph>
            Below is a table of stock market crashes {COMPANY_NAME} has been tested on. It shows how big each loss was
            in every major crash/recession since 1970 for both {COMPANY_NAME} and the S&P500. You can also see how many
            months it took to {COMPANY_NAME} and the S&P500 to fully recover from the recessions (reach previous high).
          </Paragraph>
          <Recessions />
          <Paragraph style={{ marginTop: 32 }}>
            You can see that while {COMPANY_NAME} is not immune to stock market crashes (like any trading system). It
            has managed to recover from the crashes faster than the general market.
          </Paragraph>
          <Paragraph>
            You will also notice that {COMPANY_NAME} almost doubled in value during the Dot-com bubble. This is
            attributed to our investing strategy. Since most of the over-hyped internet companies that crashed in the
            early 2000s, did not have a long and good track-record, they weren't profitable, and they were over-valued.{' '}
            {COMPANY_NAME} simply wouldn't have bought any of these risky & volatile businesses.
          </Paragraph>
          <Paragraph>
            While {COMPANY_NAME} will likely drop in value in the short term in the face of another financial crisis.
            This does not mean they should be avoided. In fact, Formula Stocks benefits from market crashes in the long
            term. During a market crash or "reset". Formula Stocks will be able to find much better buying
            opportunities. In fact many of the stocks bought during such a market crash ended up being the biggest
            winners in the year following a cash. The investments made during these times is largely why Formula Stocks
            is able to recover so quickly as the market undervalues wonderful businesses.
          </Paragraph>

          <Title level={4}>Investing based on emotions instead of facts</Title>
          <Paragraph>The biggest risk factor is always the human investor.</Paragraph>
          <Paragraph>
            {COMPANY_NAME} is the sum of over 2 decades of work to build automated unbiased algorithms that attempts to
            find wonderful growing businesses to invest in every month.
          </Paragraph>
          <Paragraph>Unlike algorithms, humans have to deal with emotions like fear, greed, and impatience.</Paragraph>
          <Paragraph>
            If you cannot control your emotions of fear, greed and impatience. You are likely to lose money or miss out.
            For example if you invested $25,000 using Formula Stocks in December 1972 just before the crash, and would
            sell in fear when Formula Stocks hits -10%, -20%, or -40%% in value. You would have ended up with a loss in
            your portfolio. Whereas if you let the system do it's thing, it would have turned $25,000 into millions over
            a long period of time.
          </Paragraph>
          <Paragraph>
            Likewise if you cannot control your greed, you would also have missed out. Many of the businesses Formula
            Stocks have invested in over time, have had tremendous returns. If you get too greedy and sell too fast, or
            too fearful that it will drop soon and sell because of fear, you are likely to underperform. Imagine an
            investor that sells to early when it goes well to coup in small returns due to greed, and sells too early
            when it goes badly due to fear. This investor does not beat the market.
          </Paragraph>
          <Paragraph>
            Formula Stocks have had down years in the past, and it's likely to have more down years in the future,
            especially during a market crash. If you cannot control your fear, greed and impatience. You are likely to
            lose money.
          </Paragraph>
          <Paragraph>
            The genius of Formula Stocks is that it is entirely unbiased, and simply evaluates finances, business models
            and management teams as well as 200 other factors without having to worry about emotions. It's an investment
            strategy designed to outperform the market in the long-term.
          </Paragraph>
          <Paragraph style={{ marginBottom: 32 }}>
            Please carefully examine the performance charts below, and imagine if this was your portfolio account. If
            you are not able to hold and stick with it through a period of negative years, you would likely have sold
            your stocks and given up in 1973 on this chart.
          </Paragraph>
          <BacktestedChart
            name={COMPANY_NAME}
            marketName="S&P 500"
            isLoading={planLoading}
            error={planError}
            planPerformance={backtestedHistory}
            marketPrices={marketHistory}
            log={true}
          />
          <Title level={4}>Not using {COMPANY_NAME} as intended</Title>
          <Paragraph>{COMPANY_NAME} will not make you rich in a week!</Paragraph>
          <Paragraph>
            We often see people join {COMPANY_NAME} for a single week or a month, and then quit if they didn't see
            immediate results. What happens in the span of a single week or a month is meaningless compared to the
            bigger picture. If you sign up to {COMPANY_NAME} with the intention of just trying it out for a week to see
            if the first signal is profitable. There's probably about a 50% chance it will be profitable. We do not
            attempt to predict what the stock market does tomorrow.
          </Paragraph>
          <Paragraph>
            {COMPANY_NAME} finds and invests in wonderful growing companies selling for less than they are worth. This
            means, more often than not, {COMPANY_NAME} will recommend companies that other investors are selling. For
            example sometimes investors "over-react" to bad news or other events and end up selling a stock for much
            cheaper than it's intrinsic value. This is often when {COMPANY_NAME} comes in and recommends to buy it. That
            means it is very common that after you buy a Formula Stock, it can continue to drop more in value before
            later going back up. Our past returns didn't happen overnight and if your expectation is to buy a stock and
            sell it at a profit within a week or a month your average results will be a gamble.
          </Paragraph>
          <Paragraph>
            The chart below illustrates mirroring our portfolio for time periods between 1 month and 5 years, how often
            investing with Formula Stocks portfolio for differencet periods of time would have resulted in profits.
          </Paragraph>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Formula Stocks" key="1">
              <TimeInvestedChart
                // @ts-ignore
                data={backtestedHistory}
                title="The longer you invest, the lower the risk of losing money"
              />
            </TabPane>
            <TabPane tab="S&P 500" key="2">
              {/* @ts-ignore */}
              <TimeInvestedChart data={marketHistory} title="S&P500 have more losing periods across the board" />
            </TabPane>
          </Tabs>

          <Paragraph style={{ marginTop: 32 }}>
            You can see for example if you mirrored the Formula Stocks portfolio for just a single month in the past,
            there's about 70% chance you would have made money, and 30% chance you would have lost money. Whereas if you
            followed the system for any period of 5 years, there have been no 5 year periods where Formula Stocks have
            not been profitable in the past.{' '}
            <b>In short, Formula Stocks is built to be followed for the longterm, not for 1 month or 2 months.</b> If
            you compare the above chart to the S&P500, Formula Stocks have historically been a safer investment in any
            period of time.
          </Paragraph>
          <Paragraph>
            If you would like to follow our signals but aren't quite ready to use it for the longterm. We highly
            recommend signing up to our newsletter where you can follow along with our live results over time.
            Development of Formula Stocks started in 2003, and we had our first pilot-test in 2009. Since then we have
            been tracking, recording and sharing our results (both the good and the bad years)
          </Paragraph>
          <Title level={4}>Investing in many signals over a long period of time.</Title>
          <Paragraph>
            {COMPANY_NAME}' trades, has consistently both outperformed and been a safer investment than other investment
            vehicles such as index funds and hedgefunds in the long term. The longer you use it, the more diversified,
            less volatile and closer to the average statistics you will be. Any single investment could end up being a
            loser, but when investing in many signals over a longer time period the risk decreases dramatically.
          </Paragraph>
        </Content>
      </RiskContainer>
    </>
  )
}

export default Risk
