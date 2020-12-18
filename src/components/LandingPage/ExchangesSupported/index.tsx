import React from 'react'
import { Space } from 'antd'
import styled from '@emotion/styled'
import { LandingPageContainer, } from '~/ui-components'

const Title = styled.h2`
    text-align: center;
    color: ${p => p.theme.palette.text[300]};
    font-size: 1.6vw;
    margin-bottom: 16px;
`

const Exchange = styled.img`
    height: 48px;
    margin: 0 32px;
`

const ExchangesSupported = () => (
    <LandingPageContainer align="center" marginBottom="200px" >
        <Title>
            Exchanges supported
        </Title>
        <Space size="large">
            <Exchange src="/logos/exchanges/nyse.svg" />
            <Exchange src="/logos/exchanges/nasdaq.svg" />
            <Exchange src="/logos/exchanges/tsx.svg" />
        </Space>
    </LandingPageContainer>
)

export default ExchangesSupported
