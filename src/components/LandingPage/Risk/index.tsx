import React from 'react'
import Router from 'next/router'
import { Space } from 'antd'
import styled from '@emotion/styled'
import {
  Highlight,
  ActionButton,
  ButtonIcon,
  ScalingTitle,
  ScalingParagraph,
  LandingPageContainer,
  Beside,
  SpaceImage,
} from 'src/ui-components'

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 64px;

  @media (max-width: ${(p) => p.theme.breakpoints.small}) {
    margin-right: 0;
  }
`

const Risk = () => {
  const goToRiskPage = () => Router.push('/risk')

  return (
    <LandingPageContainer marginBottom="4rem">
      {/* @ts-ignore */}
      <Beside reverse>
        <ContentContainer>
          <Space direction="vertical">
            <ScalingTitle>
              High returns, <Highlight>low risk</Highlight>
            </ScalingTitle>
            <ScalingParagraph>
              A hallmark of successful investing is achieving higher returns without equally higher risk.
              <br />
              <br />
              Benjamin Graham pioneered the concept of a margin of safety, around which our technology is developed.
              <br />
              <br />
              While risk can never be eliminated, we look for wonderful companies trading for considerably less than
              they are worth, thus minimizing the risks inherent in stock investing.
              <br />
              <br />
              More upside. Less downside.
            </ScalingParagraph>
            <ActionButton onClick={goToRiskPage}>
              <ButtonIcon icon={['fad', 'chart-line-down']} />
              READ MORE ABOUT RISK
            </ActionButton>
          </Space>
        </ContentContainer>
        <SpaceImage src="/images/space/space-0.svg" />
      </Beside>
    </LandingPageContainer>
  )
}

export default Risk
