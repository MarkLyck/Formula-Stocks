import React from 'react'
import styled from '@emotion/styled'
import { scroller } from 'react-scroll'
import { Space } from 'antd'
import { useTheme } from '@emotion/react'
import { useWindowSize } from 'src/common/hooks'
import { ActionButton, ButtonIcon } from 'src/ui-components'
import { maxSiteWidth } from 'src/common/styles'
import Title from './Title'
import Description from './Description'
import Features from './Features'

const Container = styled.div`
    background-image: url(/images/hero/spaceship-background.svg);
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: 10vw 0;
    min-height: 48vw;

    @media(max-width: ${p => p.theme.breakpoints.large}) {        
        margin-bottom: 24px;
    }

    @media(max-width: ${p => p.theme.breakpoints.medium}) {        
        margin-bottom: 32px;
    }

    @media(max-width: ${p => p.theme.breakpoints.small}) {        
        background-image: url(/images/hero/mobile-background.svg);
        background-position: right -17vw;
        padding-top: 48vw;
    }
`

const Content = styled.div`
    ${maxSiteWidth}
    padding-top: 12%;
    margin-bottom: 6vw;
`

const ButtonContainer = styled(Space)`
    @media(max-width: ${p => p.theme.breakpoints.small}) {
        width: 100%;
    }
`

const Hero = ({ showSignup }: any) => {
    const windowSize = useWindowSize()
    const theme = useTheme()

    const learnMore = () => {
        scroller.scrollTo('how-we-pick-winning-stocks', {
            duration: 500,
            delay: 50,
            smooth: true,
            offset: -80
        })
    }

    return (
        <Container>
            <Content>
                <Space direction="vertical">
                    <Title />
                    <Description />
                    <ButtonContainer size="middle" direction={windowSize.width < theme.breakpoints.values.small ? 'vertical' : 'horizontal'}>
                        <ActionButton onClick={showSignup} status="success"><ButtonIcon icon={['fad', 'gift']} />TRY IT FOR FREE</ActionButton>
                        <ActionButton onClick={learnMore}><ButtonIcon icon={['fad', 'info-square']} />LEARN MORE</ActionButton>
                    </ButtonContainer>
                </Space>
            </Content>
            <Features />
        </Container>
    )
}

export default Hero
