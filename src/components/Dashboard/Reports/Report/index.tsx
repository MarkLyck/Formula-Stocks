import { useRouter } from 'next/router'
import { Spin, Space } from 'antd'
import { useQuery } from '@apollo/client'
import { STOCK_REPORT } from 'src/common/queries'

import Header from './Header'
import StockChart from './StockChart'

const StockReport = () => {
  const router = useRouter()
  const { symbol }: any = router.query

  const { loading, error, data } = useQuery(STOCK_REPORT, {
    variables: {
      symbol,
    },
  })

  const stock = data?.stocks_v2
  console.log('🔈 ~ stock', stock)
  const profile = stock?.profile
  const stockPrice = stock?.stockPrices

  if (loading) {
    return <Spin />
  }
  if (error) {
    return <p>error</p>
  }

  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Header profile={profile} stockPrice={stockPrice} />
        <StockChart symbol={symbol} />
        Report page
      </Space>
    </div>
  )
}

export default StockReport
