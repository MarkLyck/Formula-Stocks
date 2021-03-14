import React from 'react'
import styled from '@emotion/styled'
import { Mixpanel } from 'src/lib/analytics/mixpanel'
import { Tabs } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { About, Articles, Report, Stats, Financials } from 'src/ui-components/Stock'

const { TabPane } = Tabs

const TabIcon = styled(FontAwesomeIcon)`
  margin-right: 8px;
`

const ActionLink = styled.a`
  color: ${(p: any) => p.theme.palette.text[500]};
  &:hover {
    color: ${(p: any) => p.theme.palette.primary[600][500]};
  }

  @media (max-width: 900px) {
    display: none;
  }
`

const YahooLink = ({ ticker }: { ticker: string }) => {
  if (!ticker) return null
  return (
    <ActionLink href={`https://finance.yahoo.com/quote/${ticker}`} target="_blank">
      Yahoo Finance
    </ActionLink>
  )
}

interface TabsPropsType {
  stockTip: any
}

const index = ({ stockTip = {} }: TabsPropsType) => {
  if (!stockTip) return null

  const handleChange = (value: string) => {
    Mixpanel.track(`Stock tab - ${value}`, {
      ticker: stockTip.ticker,
    })
  }

  return (
    <Tabs
      defaultActiveKey="1"
      type="card"
      tabBarExtraContent={<YahooLink ticker={stockTip.ticker} />}
      onChange={handleChange}
    >
      <TabPane
        tab={
          <span>
            <TabIcon icon={['fad', 'brain']} />
            AI Report
          </span>
        }
        key="AI Report"
      >
        <Report scores={stockTip.scores} price={stockTip.price} ticker={stockTip.ticker} />
      </TabPane>
      <TabPane
        tab={
          <span>
            <TabIcon icon={['far', 'info-square']} />
            About
          </span>
        }
        key="About"
      >
        <About ticker={stockTip.ticker} />
      </TabPane>
      <TabPane
        tab={
          <span>
            <TabIcon icon={['far', 'newspaper']} />
            Stock news
          </span>
        }
        key="Stock News"
      >
        <Articles ticker={stockTip.ticker} />
      </TabPane>
      <TabPane
        tab={
          <span>
            <TabIcon icon={['far', 'analytics']} />
            Statistics
          </span>
        }
        key="Statistics"
      >
        <Stats ticker={stockTip.ticker} />
      </TabPane>
      <TabPane
        tab={
          <span>
            <TabIcon icon={['far', 'dollar-sign']} />
            Financials
          </span>
        }
        key="Financials"
      >
        <Financials ticker={stockTip.ticker} />
      </TabPane>
    </Tabs>
  )
}

export default index
