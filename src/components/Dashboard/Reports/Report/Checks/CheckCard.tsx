import { Col, Card, Typography, Spin, Space } from 'antd'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const { Title, Text } = Typography

const StyledCard = styled(Card)`
  border-radius: 8px;

  .ant-card-body {
    display: flex;
    align-items: center;
  }
`

const IconContainer = styled.div`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  background-color: ${(p: any) => p.theme.palette[p.color][600]};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`

const SentimentIconContainer = styled.div`
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: ${(p: any) => p.theme.palette[p.color][600]};
  color: white;
  border-radius: 50%;

  svg {
    width: 8px;
    height: 8px;
  }
`

const Content = styled.div`
  display: flex;
`

const SentimentIcon = styled(FontAwesomeIcon)``

type CheckCardProps = {
  icon: string[]
  title: string
  description: string
  sentiment: 'positive' | 'neutral' | 'danger' | 'warning'
  tags: any[]
}

export const CheckCard = ({ icon, title, description, sentiment, tags }: CheckCardProps) => {
  let sentimentIcon = ['fas', 'check']
  if (sentiment === 'warning') {
    sentimentIcon = ['fas', 'exclamation-triangle']
  } else if (sentiment === 'danger') {
    sentimentIcon = ['far', 'times']
  }

  return (
    <Col span={8}>
      <StyledCard>
        <Space>
          <IconContainer color={sentiment}>
            {/* @ts-ignore */}
            <FontAwesomeIcon icon={icon} />
          </IconContainer>
          <div>
            <Title level={5} style={{ marginBottom: 0 }}>
              {title}
            </Title>
            <Content>
              <Space>
                <Text>{description}</Text>
                {tags}
              </Space>
            </Content>
          </div>
        </Space>
        <SentimentIconContainer color={sentiment}>
          {/* @ts-ignore */}
          <SentimentIcon icon={sentimentIcon} />
        </SentimentIconContainer>
      </StyledCard>
    </Col>
  )
}

export const LoadingCard = () => (
  <Col span={8}>
    <StyledCard>
      <Spin />
    </StyledCard>
  </Col>
)

const TagContainer = styled.div`
  padding: 4px 8px;
  background-color: ${(p: any) => p.theme.palette[p.color][200]};
  color: ${(p: any) => p.theme.palette[p.color][600]};
  border-radius: 4px;
  font-weight: 600;
  font-size: 12px;
`

export const CheckTag = ({ color, children, icon }: { color: string; children: any; icon?: any }) => (
  <TagContainer color={color}>
    <span style={{ whiteSpace: 'nowrap' }}>
      {icon && <FontAwesomeIcon icon={icon} style={{ marginRight: 8 }} />}
      {children}
    </span>
  </TagContainer>
)
