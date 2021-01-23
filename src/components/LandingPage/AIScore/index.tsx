import React, { useState } from 'react'
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
  TextTag,
} from '~/ui-components'
import { AIScoreModal } from '../Modals'

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 64px;

  @media (max-width: ${(p) => p.theme.breakpoints.small}) {
    margin-right: 0;
    margin-bottom: 6rem;
    width: 100%;
  }
`

const AIScore = () => {
  const [dialogVisible, setDialogVisible] = useState(false)

  return (
    <LandingPageContainer marginBottom="4rem">
      <AIScoreModal isVisible={dialogVisible} onClose={() => setDialogVisible(false)} />
      <Beside>
        <ContentContainer>
          <Space direction="vertical">
            <ScalingTitle>
              The <Highlight>AI Score</Highlight>
            </ScalingTitle>
            <ScalingParagraph>
              While the many scientific algorithms that goes into evaluating a company are incredibly complex. We have
              narrowed the output down to a single number.
              <br />
              <br />
              The AI Score is a scale from -100 to +100, made up of 7 sub-categories:
              <br />
              <TextTag>Value</TextTag> <TextTag>Growth</TextTag> <TextTag>Risk</TextTag> <TextTag>Reward</TextTag>{' '}
              <TextTag>Profitability</TextTag> <TextTag>Soundness</TextTag> & <TextTag>Stewardship</TextTag>
              <br />
              <br />
              Investing solely in stocks with a high AI Score means you'll be buying quality stocks when they are on
              sale, in businesses likely to grow and improve over time. You'll also often avoid businesses that are
              awful, expensive, badly run, produces subpar returns or are extremely risky.
              <br />
              <br />
              Don't invest without it!
            </ScalingParagraph>
            <ActionButton onClick={() => setDialogVisible(true)}>
              <ButtonIcon icon={['fad', 'brain']} />
              SEE OUR STUDY ON THE AI SCORE
            </ActionButton>
          </Space>
        </ContentContainer>
        <SpaceImage src="/images/space/space-2.svg" />
      </Beside>
    </LandingPageContainer>
  )
}

export default AIScore
