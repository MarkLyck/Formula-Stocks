import React from 'react'
import { Space } from 'antd'
import styled from '@emotion/styled'
import { LandingPageContainer, Card, Highlight, ActionButton } from '~/ui-components'
import theme from '~/lib/theme'
import { transparentize } from 'polished'

const CardTitle = styled.h4`
    margin: 0;
    font-size: 1.8vw;
    font-weight: bold;
`

const CardSubtitle = styled.h5`
    font-size: 1.2vw;
    color: ${p => p.theme.palette.text[200]};
    font-weight: 400;
`

const Content = styled.div`
    padding: 16px;
`


const StrategyWeUse = () => (
    <LandingPageContainer align="center" marginBottom="2vw" >
        <Card>
            <Content>
                <Space direction="vertical">
                    <CardTitle>
                        An investing strategy that <Highlight>we use</Highlight>.
                    </CardTitle>
                    <CardSubtitle>
                        We have shown you what we can do. Want to know more? Check out the FAQ or chat with us.
                    </CardSubtitle>
                    <Space size="middle">
                        <ActionButton status="success">TRY IT FOR FREE</ActionButton>
                        <ActionButton backgroundColor="#fff" color={theme.palette.text[500]} shadowColor={transparentize(0.5, theme.palette.basic[600])}>SEE FAQ</ActionButton>
                        <ActionButton>CONTACT US</ActionButton>
                    </Space>
                </Space>
            </Content>
        </Card>
    </LandingPageContainer>
)

export default StrategyWeUse
