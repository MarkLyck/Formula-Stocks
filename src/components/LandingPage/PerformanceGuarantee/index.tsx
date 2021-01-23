import React, { useState } from 'react'
import { Space, Button } from 'antd'
import styled from '@emotion/styled'
import { Highlight, ScalingTitle, ScalingParagraph, LandingPageContainer, Beside, SpaceImage } from '~/ui-components'
import { PerformanceGuaranteeModal } from '../Modals'

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

const LinkButton = styled(Button)`
  padding: 0;
`

const MoneyBackGuarantee = () => {
  const [dialogVisible, setDialogVisible] = useState(false)

  return (
    <LandingPageContainer marginBottom="4rem">
      <PerformanceGuaranteeModal isVisible={dialogVisible} onClose={() => setDialogVisible(false)} />
      <Beside>
        <SpaceImage src="/images/space/space-1.svg" />
        <ContentContainer>
          <Space direction="vertical">
            <ScalingTitle>
              Our performance <Highlight>guarantee</Highlight>
            </ScalingTitle>
            <ScalingParagraph>
              We're the only signal service that guarantee our performance!
              <br />
              <br />
              If for any reason we don't outperform the S&P 500 index over a period of 24 months from your sign-up date,
              we will give you a 100% refund, no questions asked.
              <br />
              <br />
              We have proudly outperformed the S&P 500 by a very large margin for over a decade, and if we don't keep
              providing a better alternative in the future than an index fund, we will refund all of your past
              payments.*
            </ScalingParagraph>
            <LinkButton type="link" onClick={() => setDialogVisible(true)}>
              See more details*
            </LinkButton>
          </Space>
        </ContentContainer>
      </Beside>
    </LandingPageContainer>
  )
}

export default MoneyBackGuarantee
