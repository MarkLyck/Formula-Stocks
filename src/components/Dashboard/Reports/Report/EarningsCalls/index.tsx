import { Spin, Card, Typography, Empty } from 'antd'
import { useQuery } from '@apollo/client'

import { FMP } from 'src/common/queries'

const { Text } = Typography

const EarningsCalls = ({ symbol }: any) => {
  const { data, loading } = useQuery(FMP, {
    variables: {
      endpoint: `https://financialmodelingprep.com/api/v3/earning_call_transcript/${symbol}`,
    },
  })

  if (loading) {
    return (
      <Card>
        <Spin />
      </Card>
    )
  }

  const earningsCalls = data?.FMP.response || []

  if (earningsCalls.length === 0) {
    return (
      <Card>
        <Empty description="No earnings calls found" />
      </Card>
    )
  }

  const earningsCall = earningsCalls[0]

  return (
    <Card title={earningsCall.date}>
      <Text>{earningsCall?.content}</Text>
    </Card>
  )
}

export default EarningsCalls
