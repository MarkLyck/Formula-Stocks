import React from 'react'
import styled from '@emotion/styled'
import { Space } from 'antd'
import { ActionButton } from '~/ui-components'
import { maxSiteWidth } from '~/common/styles'
import Title from './Title'
import Description from './Description'
import Features from './Features'

const Container = styled.div`
    background-image: url(/images/hero/spaceship-background.svg);
    background-size: 100%;
    background-repeat: no-repeat;
    height: 50vw;
`

const Content = styled.div`
    ${maxSiteWidth}
    padding-top: 12%;
    margin-bottom: 7vw;
`

const Hero = () => (
    <Container>
        <Content>
            <Space direction="vertical">
                <Title />
                <Description />
                <Space size="middle">
                    <ActionButton status="success">TRY IT FOR FREE</ActionButton>
                    <ActionButton>LEARN MORE</ActionButton>
                </Space>
            </Space>
        </Content>
        <Features />
    </Container>
)

export default Hero
