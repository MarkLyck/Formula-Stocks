import React from 'react'
import { Space } from 'antd'
import styled from '@emotion/styled'
import { ScalingTitle, ScalingSubTitle, LandingPageContainer, Card } from '~/ui-components'
import { COMPANY_NAME } from '~/common/constants'

const NumberContainer = styled.div`
    background: #fff;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 5px 16px rgba(18, 62, 138, 0.15);
    font-size: 1.2rem;
    font-weight: bold;
    color: ${p => p.theme.palette.primary[500]};
`

const CardTitle = styled.h4`
    margin: 0;
    font-size: 1.2rem;
    font-weight: bold;
`

const Description = styled.p`
    color: ${p => p.theme.palette.text[300]};
    margin: 0;
`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;
`

const Container = styled.div`
    display: flex;
    justify-content: center;

    @media(max-width: ${p => p.theme.breakpoints.small}) {
        flex-direction: column;
    }
`

const StepCard = styled(Card)`
    margin: 0 16px;
    padding: 32px;
    min-height: 180px;
    width: calc(100% / 3);

    &:hover {
        background-color: ${p => p.theme.palette.basic[200]};
    }

    @media(max-width: ${p => p.theme.breakpoints.small}) {
        width: 100%;
        margin: 16px 0;
    }
`

const HowToGetStarted = () => (
    <LandingPageContainer align="center" marginBottom="4rem" >
        <TitleContainer>
            <ScalingTitle>
                How to get started
            </ScalingTitle>
            <ScalingSubTitle>
                Using {COMPANY_NAME} is easy and only requires a few minutes of trading each month.
            </ScalingSubTitle>
        </TitleContainer>
        <Container >
            <StepCard>
                <Space direction="vertical">
                    <Space size="middle">
                        <NumberContainer>1</NumberContainer>
                        <CardTitle>
                            Mirror portfolio
                        </CardTitle>
                    </Space>
                    <Description>
                        The easiest way to get started is to mirror our portfolio in your own brokerage account of choice. If you don't have one yet, we will help!
                    </Description>
                </Space>
            </StepCard>
            <StepCard>
                <Space direction="vertical">
                    <Space size="middle">
                        <NumberContainer>2</NumberContainer>
                        <CardTitle>
                            Follow monthly trades
                    </CardTitle>
                    </Space>
                    <Description>
                        Every month, the system re-evaluates it’s portfolio, buying & selling stocks. You'll be notified of the new trades that you can make in your own account to follow along.
                    </Description>
                </Space>
            </StepCard>
            <StepCard>
                <Space direction="vertical">
                    < Space size="middle">
                        <NumberContainer>3</NumberContainer>
                        <CardTitle>
                            Re-invest dividends
                    </CardTitle>
                    </Space>
                    <Description>
                        Most stocks we invest in will pay out a dividend. To get the most of our system, we highly recommend you re-invest the dividends for exponential growth.
                    </Description>
                </Space >
            </StepCard >
        </Container >
    </LandingPageContainer >
)

export default HowToGetStarted
