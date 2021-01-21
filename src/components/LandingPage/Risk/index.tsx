import React from 'react'
import Router from 'next/router'
import { Space } from 'antd'
import styled from '@emotion/styled'
import { Highlight, ActionButton, ButtonIcon, ScalingTitle, ScalingParagraph, LandingPageContainer, Beside, SpaceImage } from 'src/ui-components'

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 64px;

    @media(max-width: ${p => p.theme.breakpoints.small}) {
        margin-right: 0;
    }
`

const Risk = () => {
    const goToRiskPage = () => Router.push('/risk')

    return (
        <LandingPageContainer marginBottom="4rem" >
            <Beside reverse>
                <ContentContainer>
                    <Space direction="vertical">
                        <ScalingTitle>
                            High returns, <Highlight>low risk</Highlight>
                        </ScalingTitle>
                        <ScalingParagraph>
                            It is very easy to achieve high returns by simply leveraging higher risk.
                            However high-risk investments, or day-trading usually never works out in the long-term.
                        <br />
                            <br />
                        Instead, we've spent decades developing long-term strategies that boasts above-average returns,
                        while keeping the risk very low. This is imperative to us, as we invest our own capital along with you.
                    </ScalingParagraph>
                        <ActionButton onClick={goToRiskPage}><ButtonIcon icon={['fad', 'chart-line-down']} />READ MORE ABOUT RISKS INVOLVED</ActionButton>
                    </Space>
                </ContentContainer>
                <SpaceImage src="/images/space/space-3.svg" />
            </Beside>
        </LandingPageContainer>
    )
}

export default Risk
