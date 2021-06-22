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
  Disclaimer,
} from 'src/ui-components'
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
              There are multiple ways to invest intelligently. You have previously met Joe, who specializes in selecting
              individual winning stocks.
              <br />
              <br />
              Another approach is quantitative investing, where you invest in a "basket" of stocks, say 40 stocks, which
              sports certain winning traits. These traits are derived from more than 200 different quantitative and
              qualitative factors, computed for each stock. Called the AI-score, a number between -100 and 100,
              indicating the relative attractiveness.
              <br />
              <br />
              Consider a stock with -100 as something to avoid, and a stock with an AI-score if 100 as something to
              absolutely invest in. Since all supported stocks receive a score you can construct your own preferred
              portfolio.
              <br />
              <br />
              If invested in 40 stocks with an AI-score {'>'} 80 a typical historical avg. return would have been 27%
              pro anno<sup>*</sup>. See study for further details.
              <br />
              <br />
              For each stock you also get access to a report, detailing risk vs. reward, value, growth, profitability,
              soundness and much more.
              <Disclaimer>
                <sup>*</sup>Past performance does not guarantee future performance
              </Disclaimer>
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
