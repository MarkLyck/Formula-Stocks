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
              There are multiple ways to invest intelligently. You have previously met Joe, who is an artificial
              intelligence specialized in selecting individual winning stocks.
              <br />
              <br />
              Another approach is quantitative investing, in which you invest in a "basket" of stocks, say 20 or 40
              stocks, which sports certain winning traits. These traits are calculated based on more than 200 different
              mathematical factors, and we compute a score for each stock, called the AI-score, which is essentially a
              number between -100 and 100, indicating its relative attractiveness to an investor.
              <br />
              <br />
              Consider a stock with -100 as something to avoid, and a stock with an AI-score if 100 as something to
              definitively invest in, and consider that all supported stocks receive a score.
              <br />
              <br />
              If you for instance invest in 40 stocks with an AI-score of +80 a typical historical average return would
              be 27% pro anno<sup>*</sup>. See study for further details.
              <br />
              <br />
              For each stock you get access to a detailed report, detailing risk vs. reward, value, growth,
              profitability, soundness and much more.
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
