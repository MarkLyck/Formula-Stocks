import React from 'react'
import styled from '@emotion/styled'
import { Space } from 'antd'
import Title from './Title'
import Description from './Description'
import { ActionButton } from '~/ui-components'

const Container = styled.div`
    position: relative;
    background-image: url(/images/hero/spaceship-background.svg);
    background-size: 100%;
    background-repeat: no-repeat;
    height: 1000px;
`

const Content = styled.div`
    position: absolute;
    margin: 12% 60% 0 13%;
`

const Hero = () => (
    <Container>
        <Content>
            <Space direction="vertical">
                <Title />
                <Description />
                <Space size="middle">
                    <ActionButton status="success">TRY FREE</ActionButton>
                    <ActionButton>LEARN MORE</ActionButton>
                </Space>
            </Space>
        </Content>
    </Container>
)

export default Hero
