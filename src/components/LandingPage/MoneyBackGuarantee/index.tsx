import React from 'react'
import { Space } from 'antd'
import styled from '@emotion/styled'
import { Highlight, ActionButton, ScalingTitle, ScalingParagraph, LandingPageContainer, Beside, SpaceImage } from '~/ui-components'

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 64px;
`

const MoneyBackGuarantee = () => (
    <LandingPageContainer marginBottom="4vw" >
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
                        If for any reason we don't outperform the S&P 500 index over a period of 2 years from your sign-up date, we will give you a 100% refund, no questions asked.
                        <br />
                        <br />
                        We have consistently outperformed the S&P 500 for over a decade, and we're willing to put our money where our mouth is to prove it.
                    </ScalingParagraph>
                    <ActionButton>SEE THE DETAILS</ActionButton>
                </Space>
            </ContentContainer>
        </Beside>
    </LandingPageContainer>
)

export default MoneyBackGuarantee
