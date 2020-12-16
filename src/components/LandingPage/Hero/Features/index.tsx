import React, { useRef, useEffect } from 'react'
import { Space, Carousel } from 'antd'
import styled from '@emotion/styled'
import { SmallFeatureCard, LandingPageContainer } from '~/ui-components'
import { useTheme } from '@emotion/react'
import { maxSiteWidth } from '~/common/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
    ${maxSiteWidth}
    width: 100%;
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

const Features = () => {
    const theme = useTheme()
    const slider = useRef();

    // @ts-ignore
    const nextPage = () => slider.current.next()

    useEffect(() => {
        let timer = setInterval(() => nextPage(), 7500)

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
                        <SmallFeatureCard icon="percent" title="93.67% Win ratio" color={theme.palette.primary[500]} />
                        <SmallFeatureCard icon="chart-line" title="+1,007% Return to date" color={theme.palette.success[500]} />
                        <SmallFeatureCard icon="hand-holding-usd" title="Stay in full control" color={theme.palette.icon_colors.pink} />
                        <NextButton onClick={nextPage}>
                            <FontAwesomeIcon icon="chevron-double-right" />
                        </NextButton>
                    </Space>
                </div>
                <div>
                    <Space size="large" align="center">
                        <SmallFeatureCard icon="brain" title="AI Stock reports" color={theme.palette.icon_colors.pink} />
                        <SmallFeatureCard icon="analytics" title="Portfolio management" color={theme.palette.primary[500]} />
                        <SmallFeatureCard icon="money-bill-wave" title="Money back guarantee" color={theme.palette.success[500]} />
                        <NextButton onClick={nextPage}>
                            <FontAwesomeIcon icon="chevron-double-right" />
                        </NextButton>
                    </Space>
                </div>
                <div>
                    <Space size="large" align="center">
                        <SmallFeatureCard icon="gift" title="Free 7-day trial" color={theme.palette.danger[500]} />
                        <SmallFeatureCard icon="comment" title="24/7 Support" color={theme.palette.success[500]} />
                        <SmallFeatureCard icon="handshake" title="Fully transparent" color={theme.palette.primary[500]} />
                        <NextButton onClick={nextPage}>
                            <FontAwesomeIcon icon="chevron-double-right" />
                        </NextButton>
                    </Space>
                </div>
            </Carousel>

        </Container>
    )
}

export default Features
