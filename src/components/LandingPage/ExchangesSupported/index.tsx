import React from 'react'
import { Space } from 'antd'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { LandingPageContainer, } from 'src/ui-components'
import { useWindowSize } from 'src/common/hooks'

const Title = styled.h2`
    text-align: center;
    color: ${p => p.theme.palette.text[300]};
    font-size: 1.6rem;
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

const ExchangesSupported = () => {
    const windowSize = useWindowSize()
    const theme = useTheme()

    return (
        <LandingPageContainer align="center" >
            <Title>
                Exchanges supported
        </Title>
            <Space size="middle" direction={windowSize.width <= theme.breakpoints.values.small ? 'vertical' : 'horizontal'}>
                <Exchange src="/logos/exchanges/nyse.svg" />
                <Exchange src="/logos/exchanges/nasdaq.svg" />
                <Exchange src="/logos/exchanges/tsx.svg" />
            </Space>
        </LandingPageContainer>
    )
}

export default ExchangesSupported
