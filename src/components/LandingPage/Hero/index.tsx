import React from 'react'
import styled from '@emotion/styled'
import { scroller } from 'react-scroll'
import { Space } from 'antd'
import useBreakpoint, { mediaQuery } from '@w11r/use-breakpoint'
import { useQuery } from '@apollo/client'

import { STATISTICS } from 'src/common/queries'
import { ActionButton, ButtonIcon } from 'src/ui-components'
import { maxSiteWidth } from 'src/common/styles'
import Title from './Title'
import Description from './Description'
import Features from './Features'

const Container = styled.div`
  background-image: url(/images/hero/mobile-background.svg);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: right -17vw;
  min-height: 48vw;
  padding-top: 48vw;
  margin-bottom: 32px;

  ${mediaQuery([
    'tablet+',
    `
    background-image: url(/images/hero/spaceship-background.svg);
    background-position: 10vw 0;
    padding-top: 0;
    margin-bottom: 24px;
  `,
  ])}
`

const Content = styled.div`
  ${maxSiteWidth}
  padding-top: 12%;
  margin-bottom: 6vw;
`

const ButtonContainer = styled(Space)`
  width: 100%;
`

const Hero = ({ showSignup }: any) => {
  const { 'isMobile-': isMobileMinus } = useBreakpoint()
  const { data, loading: statisticsLoading, error: statisticsError } = useQuery(STATISTICS)

  const learnMore = () => {
    scroller.scrollTo('how-we-pick-winning-stocks', {
      duration: 500,
      delay: 50,
      smooth: true,
      offset: -80,
    })
  }

  const statistics = data ? data.statisticsList.items[0] : {}

  return (
    <Container>
      <Content>
        <Space direction="vertical">
          <Title />
          <Description statistics={statistics} />
          <ButtonContainer size="middle" direction={isMobileMinus ? 'vertical' : 'horizontal'}>
            <ActionButton onClick={showSignup} status="success">
              <ButtonIcon icon={['fad', 'gift']} />
              TRY IT FOR $0
            </ActionButton>
            <ActionButton onClick={learnMore}>
              <ButtonIcon icon={['fad', 'info-square']} />
              LEARN MORE
            </ActionButton>
          </ButtonContainer>
        </Space>
      </Content>
      <Features statistics={statistics} statisticsLoading={statisticsLoading} statisticsError={statisticsError} />
    </Container>
  )
}

export default Hero
