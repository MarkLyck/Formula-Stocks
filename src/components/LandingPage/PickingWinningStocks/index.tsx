import React from 'react'
import Router from 'next/router'
import styled from '@emotion/styled'
import { Element } from 'react-scroll'
import { maxSiteWidth } from '~/common/styles'
import { Space } from 'antd'
import { ActionButton, ScalingTitle, ScalingParagraph, TextTag } from '~/ui-components'

const BackgroundContainer = styled.div`
    background-image: url(/images/product_images/screenshot_space.svg);
    background-size: 50%;
    background-repeat: no-repeat;
    width: 100%;
    padding-bottom: 280px;
`

const Container = styled.div`
    ${maxSiteWidth}
`

const Highlight = styled.span`
    color: ${(p) => p.theme.palette.primary[500]};
`

const Content = styled.div`
    padding-top: 15vw;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    max-width: 36vw;
    margin-left: auto;
`


const HowItWorks = () => {
    const goToStrategyPage = () => Router.push('/strategy')

    return (
        <BackgroundContainer>
            <Container>
                <Element name="how-we-pick-winning-stocks" />
                <Content>
                    <Space direction="vertical">
                        <ScalingTitle>How we pick <Highlight>winning stocks</Highlight></ScalingTitle>
                        <ScalingParagraph>
                            Our algorithms are built on timeless value investing principles from history's
                            top value-investors like Warren Buffet & Benjamin Graham.
                        </ScalingParagraph>
                        <ScalingParagraph>
                            We analyze and evaluate companies based on 100s of factors like: <TextTag>value</TextTag> <TextTag>risk</TextTag> <TextTag>growth</TextTag> <TextTag>stewardship</TextTag> & many more.
                        </ScalingParagraph>
                        <ScalingParagraph>
                            Out of thousands of stocks, only a select few companies make the cut for our portfolio.
                        </ScalingParagraph>
                        <ActionButton onClick={goToStrategyPage}>READ MORE ABOUT OUR STRATEGY</ActionButton>
                    </Space>
                </Content>
            </Container>
        </BackgroundContainer>
    )
}

export default HowItWorks
