import React, { useState } from 'react'
import { Space } from 'antd'
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
              Formula Stocks underwent a pilot test in 2009, 2010 and 2010 where we first tested the system in a real
              trading account. The results of the pilot test is verified by a 3rd party auditor.
              <br />
              <br />
              2009: +78.94%
              <br />
              2010: +44.64%
              <br />
              2011: +17.51%
              <br />
              <br />
              But the best way to verify our strategy, is by doing it yourself. Since we don't manage your account, our
              trades are all publically available in real-time. If you have the knowledge and time to research our stock
              signals you will likely come to the same conclusion as Joe and invest in wonderful growing businesses with
              a large margin of safety. Of course Formula Stocks is built to automate this process and give you time
              back to do the things you love.
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
