import styled from '@emotion/styled'
import { Typography, Row, Col } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useBreakpoint from '@w11r/use-breakpoint'

const { Text } = Typography

const Container = styled.div`
  padding: 16px 16px;
  background: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
`

const IconContainer = styled.div`
  height: 48px;
  width: 48px;
  background: ${(p: any) => p.theme.palette[p.positive ? 'success' : 'danger'][600]};
  border-radius: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`

const GrowthIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
  color: white;
`

const Content = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
`

const Label = styled(Text)`
  font-weight: 500;
  font-size: 14px;
`

const Value = styled(Text)`
  font-weight: bold;
  font-size: 16px;
  color: ${(p: any) => p.theme.palette[p.positive ? 'success' : 'danger'][600]};
`

const GrowthRates = ({ growthRates }: any) => {
  const { 'isTablet-': isTabletMinus } = useBreakpoint()

  let COL_SPAN = isTabletMinus ? 12 : 6

  return (
    <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
      {growthRates.map((rate: any) => (
        <Col span={COL_SPAN} key={rate.years}>
          <Container>
            {/* @ts-ignore */}
            <IconContainer positive={rate.growthRate > 0}>
              {/* @ts-ignore */}
              <GrowthIcon icon={['fad', `${rate.growthRate > 0 ? 'chart-line' : 'chart-line-down'}`]} />
            </IconContainer>
            <Content>
              <Label>
                {rate.years} year{rate.years === 1 ? '' : 's'} growth rate
              </Label>
              {/* @ts-ignore */}
              <Value positive={rate.growthRate > 0}>
                {rate.growthRate > 0 ? '+' : ''}
                {rate.growthRate.toFixed(2)}%
              </Value>
            </Content>
          </Container>
        </Col>
      ))}
    </Row>
  )
}

export default GrowthRates
