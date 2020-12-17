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
    font-size: 1.2vw;
    font-weight: bold;
    color: ${p => p.theme.palette.primary[500]};
`

const CardTitle = styled.h4`
    margin: 0;
    font-size: 1.2vw;
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

const HowDoIUseIt = () => (
    <LandingPageContainer align="center" >
        <TitleContainer>
            <ScalingTitle>
                How to get started
            </ScalingTitle>
            <ScalingSubTitle>
                Using {COMPANY_NAME} is easy and only requires a few minutes of trading each month.
            </ScalingSubTitle>
        </TitleContainer>
        <Space size="large">
            <Card>
                <Space direction="vertical">
                    <Space size="middle">
                        <NumberContainer>1</NumberContainer>
                        <CardTitle>
                            Mirror the portfolio
                        </CardTitle>
                    </Space>
                    <Description>
                        The easiest way to get started is to mirror our portfolio in your own brokerage account of choice.
                    </Description>
                </Space>
            </Card>
            <Card>
                <Space direction="vertical">
                    <Space size="middle">
                        <NumberContainer>2</NumberContainer>
                        <CardTitle>
                            Follow monthly trades
                    </CardTitle>
                    </Space>
                    <Description>
                        In the beginning of every month, the system re-evaluates it’s portfolio, buying & selling stocks. Simply copy our tradres in your own account to follow along.
                    </Description>
                </Space>
            </Card>
            <Card>
                <Space direction="vertical">
                    <Space size="middle">
                        <NumberContainer>3</NumberContainer>
                        <CardTitle>
                            Re-invest dividends
                    </CardTitle>
                    </Space>
                    <Description>
                        Most stocks we invest in will pay out a dividend. We highly recommend you re-invest the dividends for exponential growth.
                    </Description>
                </Space>
            </Card>
        </Space>
    </LandingPageContainer>
)

export default HowDoIUseIt
