import { Card, Typography } from 'antd'
import styled from '@emotion/styled'

const { Title } = Typography

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled.img`
  height: 24px;
  width: 24px;
  margin-right: 16px;
`

const Header = ({ profile, stockPrice }: any) => {
  console.log('🔈 ~ stockPrice', stockPrice)
  return (
    <Card>
      {profile && (
        <Container>
          <Logo src={profile.image} />
          <Title level={4} style={{ margin: 0 }}>
            {profile.companyName} ({profile.symbol})
          </Title>
          <Title level={4} style={{ margin: 0, marginLeft: 'auto' }}>
            ${stockPrice.latestPrice}
          </Title>
        </Container>
      )}
    </Card>
  )
}

export default Header
