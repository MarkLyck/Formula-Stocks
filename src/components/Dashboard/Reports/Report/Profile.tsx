import { List, Card, Typography, Space, Divider } from 'antd'
import styled from '@emotion/styled'
import { currencyRoundedFormatter } from 'src/common/utils/formatters'

const { Text, Title } = Typography

const GridItemContainer = styled.div`
  background: ${(p) => p.theme.palette.neutral[300]};
  border-radius: 4px;
  padding: 16px 24px;
  display: flex;
`

const ItemLabel = styled.p`
  margin: 0;
  margin-right: 8px;
`

const ItemValue = styled.p`
  margin: 0;
  font-weight: bold;
`

const Grid = styled.div`
  display: flex;
`

const GridItem = ({ label, value }: any) => (
  <GridItemContainer>
    <ItemLabel>{label}:</ItemLabel> <ItemValue>{value}</ItemValue>
  </GridItemContainer>
)

const Profile = ({ profile }: any) => {
  const gridItems = [
    { label: 'Sector', value: profile.sector },
    { label: 'Industry', value: profile.industry },
    { label: 'Website', value: profile.website },
    { label: 'Ceo', value: profile.ceo },
    { label: 'Exchange', value: profile.exchange },
    { label: 'IPO', value: profile.ipoDate },
    { label: 'Country', value: profile.country },
    { label: 'Market Cap', value: currencyRoundedFormatter.format(profile.mktCap) },
  ]

  return (
    <Card>
      {profile && (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Title level={4} style={{ margin: 0 }}>
            {profile.companyName} ({profile.symbol})
          </Title>
          <Divider />
          <Text>{profile.description}</Text>
          <Divider />
          <Grid>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 2,
                lg: 2,
                xl: 3,
                xxl: 3,
              }}
              dataSource={gridItems}
              renderItem={(item) => (
                <List.Item>
                  <GridItem label={item.label} value={item.value} />
                </List.Item>
              )}
            />
          </Grid>
        </Space>
      )}
    </Card>
  )
}

export default Profile
