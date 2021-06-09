import { Spin, Space, Card, Typography, Divider, Button, Empty } from 'antd'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { FMP } from 'src/common/queries'

const { Text } = Typography

const NewsImage = styled.div`
  width: 100px;
  height: 100px;
  background-image: url(${(p: any) => p.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 8px;
`

const Content = styled.div`
  display: flex;
`

const StockNews = ({ symbol }: any) => {
  const { data, loading } = useQuery(FMP, {
    variables: {
      endpoint: `https://financialmodelingprep.com/api/v3/stock_news?tickers=${symbol}&limit=20`,
    },
  })

  if (loading) {
    return (
      <Card>
        <Spin />
      </Card>
    )
  }

  const news = data?.FMP?.response || []

  if (news.length === 0) {
    return (
      <Card>
        <Empty description="No stock news found" />
      </Card>
    )
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {news.map((item: any) => (
        <Card
          title={item.title}
          extra={
            <Button href={item.url} target="_blank">
              link
            </Button>
          }
        >
          <Content>
            {/* @ts-ignore */}
            <NewsImage src={item.image} />
            <Divider type="vertical" style={{ height: '100%' }} />
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text>
                <b>{item.text}</b>
              </Text>
              <Text>{item.publishedDate}</Text>
              <Text>{item.site}</Text>
            </Space>
          </Content>
        </Card>
      ))}
    </Space>
  )
}

export default StockNews
