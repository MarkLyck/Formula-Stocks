import { useState } from 'react'
import { Card, Typography, Divider } from 'antd'
import styled from '@emotion/styled'
import { currencyFormatter } from 'src/common/utils/formatters'
import { AIScoreValue } from 'src/ui-components'

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

const Header = ({ profile, report }: any) => {
  console.log('🔈 ~ report', report)
  const [image, setImage] = useState(profile?.image)
  const aiScore = report?.scores?.ai_score
  const companyName = profile?.companyName || report.name
  const symbol = profile?.symbol || report.ticker
  const price = profile?.price || report.price

  return (
    <Card>
      <Container>
        {/* sets the image to empty if it fails */}
        <Logo src={image} onError={() => setImage('data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=')} />
        <Title level={4} style={{ margin: 0 }}>
          {companyName} ({symbol})
        </Title>
        <Title level={5} style={{ margin: 0, marginLeft: 'auto' }}>
          {currencyFormatter.format(price)}
        </Title>
        <Divider type="vertical" style={{ height: 32, margin: '0 16px' }} />
        <AIScoreValue score={aiScore * 100} />
      </Container>
    </Card>
  )
}

export default Header
