import { Spin, Space, Card, Typography, Empty } from 'antd'
import { useQuery } from '@apollo/client'
import { currencyRoundedFormatter } from 'src/common/utils/formatters'

import { FMP } from 'src/common/queries'

const { Text } = Typography

const KeyExecs = ({ symbol }: any) => {
  const { data, loading } = useQuery(FMP, {
    variables: {
      endpoint: `https://financialmodelingprep.com/api/v3/key-executives/${symbol}`,
    },
  })

  if (loading) {
    return (
      <Card>
        <Spin />
      </Card>
    )
  }

  const keyExecs = data?.FMP.response || []

  if (keyExecs.length === 0) {
    return (
      <Card>
        <Empty description="No insider trades found" />
      </Card>
    )
  }

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }}>
        {keyExecs.map((exec: any) => {
          return (
            <Card title={exec.name}>
              <Space direction="vertical">
                <Text>
                  Title: <b>{exec.title}</b>
                </Text>
                {exec.pay !== null && (
                  <Text>
                    Pay:{' '}
                    <b>
                      {currencyRoundedFormatter.format(exec.pay)} ({exec.currencyPay})
                    </b>
                  </Text>
                )}
              </Space>
            </Card>
          )
        })}
      </Space>
    </>
  )
}

export default KeyExecs
