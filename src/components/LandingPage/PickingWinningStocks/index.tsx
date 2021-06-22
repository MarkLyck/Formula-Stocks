import React from 'react'
import Router from 'next/router'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { Element } from 'react-scroll'
import { maxSiteWidth } from 'src/common/styles'
import { Space } from 'antd'
import { ActionButton, ScalingTitle, ScalingParagraph, ButtonIcon } from 'src/ui-components'
import { useWindowSize } from 'src/common/hooks'

const BackgroundContainer = styled.div`
  background-image: url(/images/product_images/screenshot_space.svg);
  background-size: 50%;
  background-position: center left;
  background-repeat: no-repeat;
  width: 100%;
  min-height: 54vw;
  margin-bottom: 4rem;
  display: flex;
  align-items: center;

  @media (max-width: ${(p) => p.theme.breakpoints.medium}) {
    background-image: none;
    padding-bottom: 0;
  }
`

const Container = styled.div`
  ${maxSiteWidth}
`

const Highlight = styled.span`
  color: ${(p) => p.theme.palette.primary[600]};
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  max-width: 36vw;
  margin-left: auto;

  @media (max-width: ${(p) => p.theme.breakpoints.medium}) {
    max-width: 100%;
    display: block;
    margin-left: 0;
    padding-top: 0;
  }
`

const ProductImage = styled.img`
  width: 100%;
  margin-bottom: 32px;
  border-radius: 4px;
  border: 1px solid #ebedf5;
  box-shadow: 0 4px 14px 0 rgba(111, 120, 156, 0.08);
  box-sizing: border-box;
`

const HowItWorks = () => {
  const goToStrategyPage = () => Router.push('/strategy')
  const windowSize = useWindowSize()
  const theme = useTheme()

  return (
    <BackgroundContainer>
      <Container>
        <Element name="how-we-pick-winning-stocks" />
        {windowSize.width <= theme.breakpoints.values.medium && (
          <ProductImage src="/images/product_images/mobile-screenshot.png" />
        )}
        <Content>
          <Space direction="vertical">
            <ScalingTitle>
              How we pick <Highlight>winning stocks</Highlight>
            </ScalingTitle>
            <ScalingParagraph>
              Meet Joe. Joe is an artificial intelligence with a diverse personality. He simultaneously thinks like 25
              of the best super investors of recent centuries, such as Benjamin Graham, Philip Fisher, Warren Buffett,
              Jesse Livermore, to name a few.
            </ScalingParagraph>
            <ScalingParagraph>
              Joe can help you earn a better return on your capital. He is happy when he can invest in a wonderful
              business with good growth prospects, a great business model, purchased at a price well below its intrinsic
              value.
            </ScalingParagraph>
            <ScalingParagraph>
              Price is what you pay, value is what you get. Joe's task is to make sure you get your moneys worth of good
              businesses at a sharp price.
            </ScalingParagraph>
            <ScalingParagraph>
              He is adept at avoiding mistakes, careful about what he invests in, evaluating finances, business models
              and management teams as well as 200 other factors influencing a positive outcome.
            </ScalingParagraph>
            <ScalingParagraph>
              While you sleep, Joe tirelessly evaluates thousands of business opportunities selecting the very best,
              giving you more time to focus on what you love to do.
            </ScalingParagraph>
            <ActionButton onClick={goToStrategyPage}>
              <ButtonIcon icon={['fad', 'flask']} />
              READ MORE ABOUT OUR STRATEGY
            </ActionButton>
          </Space>
        </Content>
      </Container>
    </BackgroundContainer>
  )
}

export default HowItWorks
