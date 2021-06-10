import React from 'react'
import { Space } from 'antd'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import useBreakpoint from '@w11r/use-breakpoint'
import { transparentize } from 'polished'

import { LandingPageContainer, Card, Highlight, ActionButton, ButtonIcon } from 'src/ui-components'

const CardTitle = styled.h4`
  margin: 0;
  font-size: 1.8rem;
  font-weight: bold;
`

const CardSubtitle = styled.h5`
  font-size: 1.2rem;
  color: ${(p) => p.theme.palette.text[200]};
  font-weight: 400;
`

const Content = styled.div`
  padding: 16px;
`

const ButtonContainer = styled(Space)`
  @media (max-width: ${(p) => p.theme.breakpoints.small}) {
    width: 100%;
  }
`

const StrategyWeUse = ({ showSignup }: any) => {
  const theme = useTheme()
  const { 'isMobile-': isMobileMinus } = useBreakpoint()

  return (
    <LandingPageContainer align="center" marginBottom="4rem">
      <Card>
        <Content>
          <Space direction="vertical" style={{ width: '100%' }}>
            <CardTitle>
              An investing strategy that <Highlight>we use</Highlight>.
            </CardTitle>
            <CardSubtitle>
              We have shown you what we can do. Want to know more? Check out the FAQ or chat with us.
            </CardSubtitle>
            <ButtonContainer size="middle" direction={isMobileMinus ? 'vertical' : 'horizontal'}>
              <ActionButton onClick={showSignup} status="success">
                <ButtonIcon icon={['fad', 'gift']} />
                TRY IT FOR FREE
              </ActionButton>
              <ActionButton
                onClick={() => console.log('SEE FAQ')}
                backgroundColor="#fff"
                color={theme.palette.text[500]}
                shadowColor={transparentize(0.5, theme.palette.neutral[600])}
              >
                <ButtonIcon icon={['fad', 'question']} />
                SEE FAQ
              </ActionButton>
              <ActionButton onClick={() => console.log('OPEN CRISP')}>
                <ButtonIcon icon={['fad', 'comment']} />
                CONTACT US
              </ActionButton>
            </ButtonContainer>
          </Space>
        </Content>
      </Card>
    </LandingPageContainer>
  )
}

export default StrategyWeUse
