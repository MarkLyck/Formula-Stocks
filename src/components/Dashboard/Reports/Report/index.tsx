import { useRouter } from 'next/router'
import { Spin, Space, Tabs, Typography } from 'antd'
import { useQuery } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { FMP, GET_REPORT_QUERY } from 'src/common/queries'
import { Report } from 'src/ui-components/Stock'
import Header from './Header'
import Profile from './Profile'
import StockChart from './StockChart'
import Financials from './Financials'
import StockNews from './StockNews'

const { Text } = Typography
const { TabPane } = Tabs

const StockReport = () => {
  const router = useRouter()
  const { symbol }: any = router.query
  console.log('🔈 ~ symbol', symbol)

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
  const report = reportData?.aIReport

  if (loading) return <Spin />

  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Header profile={profile} />
        <StockChart symbol={symbol} />
        <Tabs onChange={console.log} type="card">
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
                <FontAwesomeIcon icon={['fad', 'balance-scale-right']} style={{ marginRight: 8 }} />
                Key metrics
              </Text>
            }
            key="keymetrics"
          >
            <Financials symbol={symbol} />
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
          {/* <TabPane
            tab={
              <Text>
                <FontAwesomeIcon icon={['fad', 'dollar-sign']} style={{ marginRight: 8 }} />
                Dividends
              </Text>
            }
            key="dividends"
          >
            Content of Tab Pane 3
          </TabPane> */}
        </Tabs>
      </Space>
    </div>
  )
}

export default StockReport
