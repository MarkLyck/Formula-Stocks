import React, { useRef, useEffect } from 'react'
import { Space, Carousel } from 'antd'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { useQuery } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { STATISTICS, STATISTICS_SINCE_LAUNCH } from '~/common/queries'
import { SmallFeatureCard } from '~/ui-components'
import { numberFormatter } from '~/common/utils/formatters'

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
    const { data, loading, error } = useQuery(STATISTICS)
    const { data: launchData, loading: launchLoading, error: launchError } = useQuery(STATISTICS_SINCE_LAUNCH)
    const theme = useTheme()
    const slider = useRef();

    // @ts-ignore
    const nextPage = () => slider.current.next()
    const handleClick = () => {
        nextPage()
        clearInterval(timer)
    }

    useEffect(() => {
        timer = setInterval(() => {
            if (slider.current) {
                nextPage()
            }
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
                <div>
                    <Space size="large" align="center">
                        <SmallFeatureCard icon="percent" color={theme.palette.primary[500]}>{statistics.winLossRatio.toFixed(2)}% win ratio</SmallFeatureCard>
                        <SmallFeatureCard icon="chart-line" color={theme.palette.success[500]}>+{numberFormatter.format(launchStatistics.totalReturn.toFixed(0))}% return to date</SmallFeatureCard>
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
