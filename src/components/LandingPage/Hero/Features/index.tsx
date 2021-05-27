import React, { useRef, useEffect } from 'react'
import { Space, Carousel } from 'antd'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { useQuery } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { STATISTICS_SINCE_LAUNCH } from 'src/common/queries'
import { SmallFeatureCard } from 'src/ui-components'
import { numberFormatter } from 'src/common/utils/formatters'
import { useWindowSize } from 'src/common/hooks'

const Container = styled.div`
  padding: 0 8%;
  margin-left: -8px;
`

const NextButton = styled.button`
  outline: none;
  background: none;
  border: none;
  padding: 20px;
  color: ${(p) => p.theme.palette.text[200]};
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    background: ${(p) => p.theme.palette.neutral[200]};
  }

  &:active {
    background: ${(p) => p.theme.palette.neutral[300]};
  }

  @media (max-width: ${(p) => p.theme.breakpoints.small}) {
    width: 100%;
  }
`

const StyledSmallFeatureCard = styled(SmallFeatureCard)`
  @media (max-width: ${(p) => p.theme.breakpoints.small}) {
    margin-left: 0;
  }
`

const SlickItem = styled.div`
  @media (max-width: ${(p) => p.theme.breakpoints.small}) {
    width: 100%;
  }
`

const StyledSpace = styled(Space)`
  margin-left: 8px;

  @media (max-width: ${(p) => p.theme.breakpoints.small}) {
    width: 100%;
    flex-direction: column;
    margin-left: 0;

    > .ant-space-item {
      width: 100%;
    }
  }
`

let timer: any

type FeaturesProps = {
  statistics: any
  statisticsLoading: Boolean
  statisticsError: any
}

const Features = ({ statistics, statisticsLoading, statisticsError }: FeaturesProps) => {
  const { data: launchData, loading: launchLoading, error: launchError } = useQuery(STATISTICS_SINCE_LAUNCH)
  const theme = useTheme()
  const slider = useRef()
  const windowSize = useWindowSize()

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

  if (statisticsLoading || launchLoading) return null
  if (statisticsError || launchError) return null

  const launchStatistics = launchData?.statisticsSinceLaunchesList?.items[0] || {}

  return (
    <Container>
      <Carousel
        dots={false}
        ref={(ref) => {
          // @ts-ignore
          slider.current = ref
        }}
      >
        <SlickItem>
          <StyledSpace
            size={windowSize.width <= theme.breakpoints.values.small ? 'small' : 'large'}
            align="center"
            direction={windowSize.width <= theme.breakpoints.values.small ? 'vertical' : 'horizontal'}
          >
            <StyledSmallFeatureCard icon="percent" color={theme.palette.primary[600]}>
              {statistics.winLossRatio.toFixed(2)}% win ratio
            </StyledSmallFeatureCard>
            <StyledSmallFeatureCard icon="chart-line" color={theme.palette.success[600]}>
              +{numberFormatter.format(launchStatistics.totalReturn.toFixed(0))}% return to date
            </StyledSmallFeatureCard>
            <StyledSmallFeatureCard icon="hand-holding-usd" color={theme.palette.icon_colors.pink}>
              Stay in full control
            </StyledSmallFeatureCard>
            <NextButton onClick={handleClick}>
              <FontAwesomeIcon icon="chevron-double-right" />
            </NextButton>
          </StyledSpace>
        </SlickItem>
        <SlickItem>
          <StyledSpace
            size={windowSize.width <= theme.breakpoints.values.small ? 'small' : 'large'}
            align="center"
            direction={windowSize.width <= theme.breakpoints.values.small ? 'vertical' : 'horizontal'}
          >
            <StyledSmallFeatureCard icon="brain" color={theme.palette.icon_colors.pink}>
              AI Stock reports
            </StyledSmallFeatureCard>
            <StyledSmallFeatureCard icon="analytics" color={theme.palette.primary[600]}>
              Portfolio management
            </StyledSmallFeatureCard>
            <StyledSmallFeatureCard icon="money-bill-wave" color={theme.palette.success[600]}>
              Money back guarantee
            </StyledSmallFeatureCard>
            <NextButton onClick={handleClick}>
              <FontAwesomeIcon icon="chevron-double-right" />
            </NextButton>
          </StyledSpace>
        </SlickItem>
        <SlickItem>
          <StyledSpace
            size={windowSize.width <= theme.breakpoints.values.small ? 'small' : 'large'}
            align="center"
            direction={windowSize.width <= theme.breakpoints.values.small ? 'vertical' : 'horizontal'}
          >
            <StyledSmallFeatureCard icon="gift" color={theme.palette.danger[600]}>
              Free 7-day trial
            </StyledSmallFeatureCard>
            <StyledSmallFeatureCard icon="comment" color={theme.palette.success[600]}>
              24/7 Support
            </StyledSmallFeatureCard>
            <StyledSmallFeatureCard icon="handshake" color={theme.palette.primary[600]}>
              Fully transparent
            </StyledSmallFeatureCard>
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
