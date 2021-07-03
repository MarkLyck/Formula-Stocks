import React, { useState } from 'react'
import { Space, Card } from 'antd'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  ActionButton,
  Highlight,
  ScalingTitle,
  ScalingParagraph,
  LandingPageContainer,
  Beside,
  SpaceImage,
} from 'src/ui-components'
import { PastTradesModal } from '../Modals'

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

const YearReturnContainer = styled(Card)`
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 4px 14px 0 rgba(111, 120, 156, 0.08);

  .ant-card-body {
    padding: 16px 24px;
  }
`
const Return = styled.span`
  margin-left: 16px;
  color: ${(p) => p.theme.palette.success[600]};
`

const VerifiableResults = () => {
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <LandingPageContainer marginBottom="4rem">
      <PastTradesModal isVisible={modalVisible} onClose={() => setModalVisible(false)} />
      <Beside>
        <SpaceImage src="/images/space/space-1.svg" />
        <ContentContainer>
          <Space direction="vertical">
            <ScalingTitle>
              Verifiable <Highlight>results</Highlight>
            </ScalingTitle>
            <ScalingParagraph>
              Since inception in 2003, and launch in 2009, Formula Stocks has delivered strong results for its users.
              <br />
              <br />
              Upon launch we initiated a 3 year pilot program, as verified by a 3rd party licensed auditor:
              <br />
              <Space style={{ margin: '16px 0' }}>
                <YearReturnContainer>
                  2009: <Return>+78.94%</Return>
                </YearReturnContainer>
                <YearReturnContainer>
                  2010: <Return>+44.64%</Return>
                </YearReturnContainer>
                <YearReturnContainer>
                  2011: <Return>+17.51%</Return>
                </YearReturnContainer>
              </Space>
              <br />
              Optimizing the odds for great future results is what Joe does best, even as future results are always
              unknown.
              <br />
              <br />
              By clicking below you can examine how each of our previous trades have worked out seen in retrospect.
            </ScalingParagraph>
            <ActionButton onClick={() => setModalVisible(true)}>
              <FontAwesomeIcon icon={['fad', 'history']} style={{ marginRight: 8 }} />
              SEE ALL HISTORICAL TRADES
            </ActionButton>
          </Space>
        </ContentContainer>
      </Beside>
    </LandingPageContainer>
  )
}

export default VerifiableResults
