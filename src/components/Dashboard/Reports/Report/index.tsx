import { useRouter } from 'next/router'
import Link from 'next/link'
import { Spin, Space, Tabs, Typography, Breadcrumb, Row } from 'antd'
import { useQuery } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { FMP, GET_REPORT_QUERY } from 'src/common/queries'
import { Report } from 'src/ui-components/Stock'

import Header from './Header'
import Profile from './Profile'
import StockChart from './StockChart'
import KeyMetrics from './Growth'
import Financials from './Financials'
import StockNews from './StockNews'
import PressReleases from './PressReleases'
import InsiderTrading from './InsiderTrading'
import KeyExecs from './KeyExecs'
import EarningsCalls from './EarningsCalls'
import {
  DebtCheck,
  InsiderTradesCheck,
  ROICCheck,
  ProfitabilityCheck,
  GrowthRateCheck,
  MarginOfSafetyCheck,
  DividendsCheck,
} from './Checks'

const { Text, Title } = Typography
const { TabPane } = Tabs

const StockReport = () => {
  const router = useRouter()
  const { symbol }: any = router.query

  const { data: fmpProfile, loading } = useQuery(FMP, {
    variables: {
      endpoint: `https://financialmodelingprep.com/api/v3/profile/${symbol}`,
    },
  })
  const { data: reportData, loading: reportLoading } = useQuery(GET_REPORT_QUERY, {
    variables: {
      ticker: symbol?.replace('.', '_'),
    },
  })
  const profile = fmpProfile?.FMP?.response[0]
  const latestPrice = profile?.price
  console.log('🔈 ~ latestPrice', latestPrice)
  const report = reportData?.aIReport

  if (loading) return <Spin />

  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/dashboard/reports">Reports</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{symbol}</Breadcrumb.Item>
        </Breadcrumb>
        <Header profile={profile} />
        <StockChart symbol={symbol} />
        <Tabs type="card">
          <TabPane
            tab={
              <Text>
                <FontAwesomeIcon icon={['fad', 'brain']} style={{ marginRight: 8 }} />
                AI Report
              </Text>
            }
            key="report"
          >
            {reportLoading && <Spin />}
            {report && <Report price={report.price} scores={report.scores} ticker={symbol} />}
            <Title level={4}>Key metrics</Title>
            <Row gutter={[16, 16]}>
              <MarginOfSafetyCheck symbol={symbol} price={latestPrice} />
              <ROICCheck symbol={symbol} />
              <GrowthRateCheck
                label="Equity Growth"
                url={`https://financialmodelingprep.com/api/v3/key-metrics/${symbol}?limit=10`}
                metricName="bookValuePerShare"
              />
              <GrowthRateCheck
                label="Earnings Growth"
                url={`https://financialmodelingprep.com/api/v3/income-statement/${symbol}?limit=10`}
                metricName="eps"
              />
              <GrowthRateCheck
                label="Sales Growth"
                url={`https://financialmodelingprep.com/api/v3/income-statement/${symbol}?limit=10`}
                metricName="revenue"
              />
              <GrowthRateCheck
                label="Cash Flow Growth"
                url={`https://financialmodelingprep.com/api/v3/cash-flow-statement/${symbol}?limit=10`}
                metricName="freeCashFlow"
              />
              <DebtCheck symbol={symbol} />
              <InsiderTradesCheck symbol={symbol} />
              <ProfitabilityCheck symbol={symbol} />
              <DividendsCheck symbol={symbol} />
            </Row>
          </TabPane>
          <TabPane
            tab={
              <Text>
                <FontAwesomeIcon icon={['fad', 'info-square']} style={{ marginRight: 8 }} />
                Profile
              </Text>
            }
            key="profile"
          >
            {loading && <Spin />}
            {report && <Profile profile={profile} />}
          </TabPane>
          <TabPane
            tab={
              <Text>
                <FontAwesomeIcon icon={['fad', 'chart-line']} style={{ marginRight: 8 }} />
                Growth
              </Text>
            }
            key="key-metrics"
          >
            <KeyMetrics symbol={symbol} />
          </TabPane>
          <TabPane
            tab={
              <Text>
                <FontAwesomeIcon icon={['fad', 'dollar-sign']} style={{ marginRight: 8 }} />
                Financials
              </Text>
            }
            key="financials"
          >
            <Financials symbol={symbol} />
          </TabPane>
          <TabPane
            tab={
              <Text>
                <FontAwesomeIcon icon={['fad', 'handshake']} style={{ marginRight: 8 }} />
                Insider Trading
              </Text>
            }
            key="insider-trading"
          >
            <InsiderTrading symbol={symbol} />
          </TabPane>
          <TabPane
            tab={
              <Text>
                <FontAwesomeIcon icon={['fad', 'user-tie']} style={{ marginRight: 8 }} />
                Key Executives
              </Text>
            }
            key="key-executives"
          >
            <KeyExecs symbol={symbol} />
          </TabPane>
          <TabPane
            tab={
              <Text>
                <FontAwesomeIcon icon={['fad', 'phone-office']} style={{ marginRight: 8 }} />
                Earnings Call
              </Text>
            }
            key="earnings-calls"
          >
            <EarningsCalls symbol={symbol} />
          </TabPane>
          <TabPane
            tab={
              <Text>
                <FontAwesomeIcon icon={['fad', 'newspaper']} style={{ marginRight: 8 }} />
                Latest News
              </Text>
            }
            key="news"
          >
            <StockNews symbol={symbol} />
          </TabPane>
          <TabPane
            tab={
              <Text>
                <FontAwesomeIcon icon={['fad', 'microphone-stand']} style={{ marginRight: 8 }} />
                Press Releases
              </Text>
            }
            key="press-releases"
          >
            <PressReleases symbol={symbol} />
          </TabPane>
        </Tabs>
      </Space>
    </div>
  )
}

export default StockReport
