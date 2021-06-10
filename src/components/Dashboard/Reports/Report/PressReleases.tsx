import { Spin, Space, Card, Typography, Empty } from 'antd'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { FMP } from 'src/common/queries'

const { Text } = Typography

const Content = styled.div`
  display: flex;
`

const PressReleases = ({ symbol }: any) => {
  const { data, loading } = useQuery(FMP, {
    variables: {
      endpoint: `https://financialmodelingprep.com/api/v3/press-releases/${symbol}?limit=20`,
    },
  })

  if (loading) {
    return (
      <Card>
        <Spin />
      </Card>
    )
  }

  const pressReleases = data?.FMP?.response || []

  if (pressReleases.length === 0) {
    return (
      <Card>
        <Empty description="No press releases found" />
      </Card>
    )
  }

  console.log('🔈 ~ pressReleases', pressReleases)
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {pressReleases.map((item: any) => (
        <Card title={item.title} extra={item.date}>
          <Content>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text>{item.text}</Text>
            </Space>
          </Content>
        </Card>
      ))}
    </Space>
  )
}

export default PressReleases
