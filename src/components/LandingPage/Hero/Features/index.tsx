import React, { useRef, useEffect } from 'react'
import { Space, Carousel } from 'antd'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { useQuery } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { STATISTICS, STATISTICS_SINCE_LAUNCH } from '~/common/queries'
import { SmallFeatureCard } from '~/ui-components'
import { numberFormatter } from '~/common/utils/formatters'
import { useWindowSize } from '~/common/hooks'

const Container = styled.div`
    padding: 0 8%;
    margin-left: -8px;

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

    @media(max-width: ${p => p.theme.breakpoints.small}) {
        width: 100%;
    }
`

const StyledSmallFeatureCard = styled(SmallFeatureCard)`
    @media(max-width: ${p => p.theme.breakpoints.small}) {
        margin-left: 0;
    }
`

const SlickItem = styled.div`
    @media(max-width: ${p => p.theme.breakpoints.small}) {
        width: 100%;
    }
`

const StyledSpace = styled(Space)`
    margin-left: 8px;


    @media(max-width: ${p => p.theme.breakpoints.small}) {
        width: 100%;
        flex-direction: column;
        margin-left: 0;

        > .ant-space-item {
            width: 100%;
        }
    }
`

let timer: any

const Features = () => {
    const { data, loading, error } = useQuery(STATISTICS)
    const { data: launchData, loading: launchLoading, error: launchError } = useQuery(STATISTICS_SINCE_LAUNCH)
    const theme = useTheme()
    const slider = useRef();
    const windowSize = useWindowSize()

    // @ts-ignore
    const nextPage = () => slider.current.next()
    const handleClick = () => {
        nextPage()
        clearInterval(timer)
    }

    useEffect(() => {
        timer = setInterval(() => {
            // if (slider.current) {
            //     nextPage()
            // }
        }, 7500)

        return () => {
            clearInterval(timer)
        }
    })

    if (loading || launchLoading) return null
    if (error || launchError) return null

    const statistics = data ? data.statisticsList.items[0] : {}
    const launchStatistics = data ? launchData.statisticsSinceLaunchesList.items[0] : {}

    return (
        <Container>
            <Carousel dots={false} ref={ref => {
                // @ts-ignore
                slider.current = ref;
            }}>
                <SlickItem>
                    <StyledSpace size={windowSize.width <= theme.breakpoints.values.small ? "small" : "large"} align="center" direction={windowSize.width <= theme.breakpoints.values.small ? 'vertical' : 'horizontal'}>
                        <StyledSmallFeatureCard icon="percent" color={theme.palette.primary[500]}>{statistics.winLossRatio.toFixed(2)}% win ratio</StyledSmallFeatureCard>
                        <StyledSmallFeatureCard icon="chart-line" color={theme.palette.success[500]}>+{numberFormatter.format(launchStatistics.totalReturn.toFixed(0))}% return to date</StyledSmallFeatureCard>
                        <StyledSmallFeatureCard icon="hand-holding-usd" color={theme.palette.icon_colors.pink}>Stay in full control</StyledSmallFeatureCard>
                        <NextButton onClick={handleClick}>
                            <FontAwesomeIcon icon="chevron-double-right" />
                        </NextButton>
                    </StyledSpace>
                </SlickItem>
                <SlickItem>
                    <StyledSpace size={windowSize.width <= theme.breakpoints.values.small ? "small" : "large"} align="center" direction={windowSize.width <= theme.breakpoints.values.small ? 'vertical' : 'horizontal'}>
                        <StyledSmallFeatureCard icon="brain" color={theme.palette.icon_colors.pink}>AI Stock reports</StyledSmallFeatureCard>
                        <StyledSmallFeatureCard icon="analytics" color={theme.palette.primary[500]}>Portfolio management</StyledSmallFeatureCard>
                        <StyledSmallFeatureCard icon="money-bill-wave" color={theme.palette.success[500]}>Money back guarantee</StyledSmallFeatureCard>
                        <NextButton onClick={handleClick}>
                            <FontAwesomeIcon icon="chevron-double-right" />
                        </NextButton>
                    </StyledSpace>
                </SlickItem>
                <SlickItem>
                    <StyledSpace size={windowSize.width <= theme.breakpoints.values.small ? "small" : "large"} align="center" direction={windowSize.width <= theme.breakpoints.values.small ? 'vertical' : 'horizontal'}>
                        <StyledSmallFeatureCard icon="gift" color={theme.palette.danger[500]}>Free 7-day trial</StyledSmallFeatureCard>
                        <StyledSmallFeatureCard icon="comment" color={theme.palette.success[500]}>24/7 Support</StyledSmallFeatureCard>
                        <StyledSmallFeatureCard icon="handshake" color={theme.palette.primary[500]}>Fully transparent</StyledSmallFeatureCard>
                        <NextButton onClick={handleClick}>
                            <FontAwesomeIcon icon="chevron-double-right" />
                        </NextButton>
                    </StyledSpace>
                </SlickItem>
            </Carousel>

        </Container>
    )
}

export default Features
