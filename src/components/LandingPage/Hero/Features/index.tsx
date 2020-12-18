import React, { useRef, useEffect } from 'react'
import { Space, Carousel } from 'antd'
import styled from '@emotion/styled'
import { SmallFeatureCard } from '~/ui-components'
import { useTheme } from '@emotion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
    padding: 0 8%;
`

const NextButton = styled.button`
    outline: none;
    background: none;
    border: none;
    padding: 20px;
    color: ${p => p.theme.palette.text[200]};
    border-radius: 4px;

    &:hover {
        cursor: pointer;
        background: ${p => p.theme.palette.basic[200]};
    }

    &:active {
        background: ${p => p.theme.palette.basic[300]};
    }
`

let timer: any

const Features = () => {
    const theme = useTheme()
    const slider = useRef();

    // @ts-ignore
    const nextPage = () => slider.current.next()
    const handleClick = () => {
        nextPage()
        clearInterval(timer)
    }

    useEffect(() => {
        timer = setInterval(() => nextPage(), 7500)

        return () => {
            clearInterval(timer)
        }
    })

    return (
        <Container>
            <Carousel dots={false} ref={ref => {
                // @ts-ignore
                slider.current = ref;
            }}>
                <div>
                    <Space size="large" align="center">
                        <SmallFeatureCard icon="percent" color={theme.palette.primary[500]}>93.67% Win ratio</SmallFeatureCard>
                        <SmallFeatureCard icon="chart-line" color={theme.palette.success[500]}>+1,007% Return to date</SmallFeatureCard>
                        <SmallFeatureCard icon="hand-holding-usd" color={theme.palette.icon_colors.pink}>Stay in full control</SmallFeatureCard>
                        <NextButton onClick={handleClick}>
                            <FontAwesomeIcon icon="chevron-double-right" />
                        </NextButton>
                    </Space>
                </div>
                <div>
                    <Space size="large" align="center">
                        <SmallFeatureCard icon="brain" color={theme.palette.icon_colors.pink}>AI Stock reports</SmallFeatureCard>
                        <SmallFeatureCard icon="analytics" color={theme.palette.primary[500]}>Portfolio management</SmallFeatureCard>
                        <SmallFeatureCard icon="money-bill-wave" color={theme.palette.success[500]}>Money back guarantee</SmallFeatureCard>
                        <NextButton onClick={handleClick}>
                            <FontAwesomeIcon icon="chevron-double-right" />
                        </NextButton>
                    </Space>
                </div>
                <div>
                    <Space size="large" align="center">
                        <SmallFeatureCard icon="gift" color={theme.palette.danger[500]}>Free 7-day trial</SmallFeatureCard>
                        <SmallFeatureCard icon="comment" color={theme.palette.success[500]}>24/7 Support</SmallFeatureCard>
                        <SmallFeatureCard icon="handshake" color={theme.palette.primary[500]}>Fully transparent</SmallFeatureCard>
                        <NextButton onClick={handleClick}>
                            <FontAwesomeIcon icon="chevron-double-right" />
                        </NextButton>
                    </Space>
                </div>
            </Carousel>

        </Container>
    )
}

export default Features
