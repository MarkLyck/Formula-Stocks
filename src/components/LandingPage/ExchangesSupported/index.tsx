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
    height: 80px;
    margin: 0 32px;
    padding: 16px;
    border-radius: 4px;
    &:hover {
        background-color: ${p => p.theme.palette.basic[200]};
    }
`

const ExchangesSupported = () => (
    <LandingPageContainer align="center" >
        <Title>
            Exchanges supported
        </Title>
        <Space size="middle">
            <Exchange src="/logos/exchanges/nyse.svg" />
            <Exchange src="/logos/exchanges/nasdaq.svg" />
            <Exchange src="/logos/exchanges/tsx.svg" />
        </Space>
    </LandingPageContainer>
)

export default ExchangesSupported
