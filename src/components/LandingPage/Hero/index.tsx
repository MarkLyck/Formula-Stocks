import React from 'react'
import styled from '@emotion/styled'
import { scroller } from 'react-scroll'
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
    background-position: 10vw 0;
    height: 50vw;

    @media(max-width: ${p => p.theme.breakpoints.small}) {        
        background-image: none;
    }
`

const Content = styled.div`
    ${maxSiteWidth}
    padding-top: 12%;
    margin-bottom: 7vw;
`

const Hero = ({ showSignup }: any) => {
    const learnMore = () => {
        scroller.scrollTo('how-we-pick-winning-stocks', {
            duration: 500,
            delay: 50,
            smooth: true,
            offset: 140
        })
    }

    return (
        <Container>
            <Content>
                <Space direction="vertical">
                    <Title />
                    <Description />
                    <Space size="middle">
                        <ActionButton onClick={showSignup} status="success">TRY IT FOR FREE</ActionButton>
                        <ActionButton onClick={learnMore}> LEARN MORE</ActionButton>
                    </Space>
                </Space>
            </Content>
            <Features />
        </Container>
    )
}

export default Hero
