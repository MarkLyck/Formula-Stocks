import { useState } from 'react'
import { Card, Typography } from 'antd'
import styled from '@emotion/styled'
import { currencyFormatter } from 'src/common/utils/formatters'

const { Title } = Typography

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled.img`
  height: 32px;
  margin-right: 16px;
  border-radius: 4px;
`

const Header = ({ profile }: any) => {
  const [image, setImage] = useState(profile?.image)

  return (
    <Card>
      {profile && (
        <Container>
          {/* sets the image to empty if it fails */}
          <Logo src={image} onError={() => setImage('data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=')} />
          <Title level={4} style={{ margin: 0 }}>
            {profile.companyName} ({profile.symbol})
          </Title>
          <Title level={4} style={{ margin: 0, marginLeft: 'auto' }}>
            {currencyFormatter.format(profile.price)}
          </Title>
        </Container>
      )}
    </Card>
  )
}

export default Header
