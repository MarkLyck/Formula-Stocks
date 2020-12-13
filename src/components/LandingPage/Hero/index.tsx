import React from 'react'
import styled from '@emotion/styled'
import LazyLoad from 'react-lazy-load'
import NoSSR from 'react-no-ssr'
import { maxSiteWidth, Bold } from '~/common/styles'
import Button from '~/ui-components/Button'
import FeatureCard from '~/ui-components/Card/FeatureCard'
import FadeIn from '~/ui-components/Animations/FadeIn'
import ShiftIn from '~/ui-components/Animations/ShiftIn'
import { PRICE, WIN_RATIO, ANNUAL_GROWTH } from '~/common/constants'

const HeroContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 800px;

  @media (max-width: 800px) {
    height: auto;
  }
`

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;

  width: calc(100% + 2px);
  margin-left: -1px;
  height: 900px;
  background: #0523b6;
  background: url('/static/images/hero_background.svg');
  background-repeat: no-repeat;
  background-size: cover;
  transform: skewY(-10deg);
  overflow: hidden;
  transform-origin: 0;
  @media (max-width: 800px) {
    height: 1100px;
  }

  @media (max-width: 700px) {
    height: 1150px;
  }

  @media (max-width: 500px) {
    height: 1040px;
  }
`

const ContentContainer = styled.div`
  ${maxSiteWidth};
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  top: 160px;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 1200px) {
    left: 0px;
    right: 0px;
    transform: translateX(0);
  }

  @media (max-width: 800px) {
    position: relative;
    margin-bottom: 180px;
    top: 140px;
  }
  @media (max-width: 500px) {
    top: 110px;
    margin-bottom: 160px;
  }
`

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(50% - 0px);
  max-width: 420px;
  @media (max-width: 800px) {
    width: calc(50% - 8px);
  }
  @media (max-width: 725px) {
    width: 100%;
  }
`
const RightContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: calc(50% - 48px);

  img {
    width: 100%;
    transform: scale(1.3);
    transition: all 0.2s;

    &:hover {
      transform: scale(1.4);
    }

    @media (max-width: 1256px) {
      transform: scale(1);
      &:hover {
        transform: scale(1.1);
      }
    }
  }

  @media (max-width: 800px) {
    width: calc(50% - 8px);
  }

  @media (max-width: 725px) {
    display: none;
  }
`

const Title = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 8px;

  > span {
    text-decoration: underline;
  }

  @media (max-width: 870px) {
    font-size: 2rem;
  }

  @media (max-width: 500px) {
    font-size: 1.6rem;
  }
`

const Subtitle = styled.h2`
  color: white;
  line-height: 2;
  font-size: 1rem;
  @media (max-width: 500px) {
    margin-top: 16px;
    font-size: 0.9rem;
  }
`

const CTAContainer = styled.h2`
  color: white;
  display: flex;
  margin: 24px 0;
`

const CTAPrice = styled.span`
  font-size: 2rem;
  font-weight: bold;
`

const CTAButtonArea = styled.div`
  display: flex;
  align-items: center;
`

const Divider = styled.div`
  height: 40px;
  width: 2px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0 24px;

  @media (max-width: 500px) {
    margin: 0 16px;
  }
`

const Cancellation = styled.span`
  font-size: 1.2rem;
  color: white;
  @media (max-width: 500px) {
    font-size: 0.8rem;
  }
`

const CardsContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  transform: translateY(40%);
  width: 100%;
  max-width: calc(1140px + 32px);
  padding: 0 32px;

  > div {
    box-sizing: border-box;
    margin-right: 24px;
    width: calc(100% / 3 - 16px);

    &:last-child {
      margin-right: 0;
    }
  }

  @media (max-width: 1148px) {
    > div {
      width: calc(100% / 2 - 16px);
      &:first-of-type {
        display: none;
      }
    }
  }

  @media (max-width: 800px) {
    flex-direction: column;
    position: relative;
    margin-top: 24px;
    bottom: auto;
    transform: translateY(0%);
    padding: 0;
    align-items: center;
    > div {
      margin-right: 0;
      &:first-of-type {
        display: flex;
      }
      width: calc(100% - 64px);
      margin-bottom: 16px;
    }
  }

  @media (max-width: 725px) {
    margin-top: 0px;
  }
`

const Hero = ({ showSignup }) => (
    <React.Fragment>
        <HeroContainer>
            <ContentContainer>
                <LeftContent>
                    <Title>
                        Gain an <span>unfair</span> investing advantage
          </Title>
                    <Subtitle>
                        +{Math.floor(WIN_RATIO)}% of our stock picks have been sold with a profit.
            <br />
                        <br />
            Only invest in<Bold> high quality, profitable companies</Bold> with a large margin of safety!
          </Subtitle>
                    <CTAContainer>
                        <span>
                            For <CTAPrice>${PRICE}</CTAPrice>
              /wk
            </span>
                    </CTAContainer>
                    <NoSSR>
                        <FadeIn delay={100}>
                            <CTAButtonArea>
                                <Button backgroundColor="secondary" color="white" size="medium" onClick={showSignup}>
                                    SIGN UP TO BEAT THE MARKET
                </Button>
                                <Divider />
                                <Cancellation>
                                    Cancel
                  <br />
                  anytime
                </Cancellation>
                            </CTAButtonArea>
                        </FadeIn>
                    </NoSSR>
                </LeftContent>

                <RightContent>
                    <LazyLoad>
                        <img src="static/images/mockup_with_robot.png" alt="best stock picking service dashboard mockup" />
                    </LazyLoad>
                </RightContent>
            </ContentContainer>
            <CardsContainer data-chromatic="ignore">
                <ShiftIn y={100} delay={100}>
                    <FadeIn delay={100}>
                        <FeatureCard
                            title="Algorithmic approach"
                            icon={['fad', 'brain']}
                            color="pink"
                            text="Our algorithms identify high quality public companies with a high margin of safety, similar to methods used by Benjamin Graham"
                        />
                    </FadeIn>
                </ShiftIn>

                <ShiftIn y={200} delay={300}>
                    <FadeIn delay={300}>
                        <FeatureCard
                            title={`+${Math.floor(WIN_RATIO)}% Win Ratio`}
                            icon={['fad', 'percentage']}
                            color="primary"
                            // @ts-ignore
                            text={
                                <>
                                    To date <Bold>+{WIN_RATIO}%</Bold> of our stock buy/sell signals have been sold with a profit.
                </>
                            }
                        />
                    </FadeIn>
                </ShiftIn>
                <ShiftIn y={300} delay={600}>
                    <FadeIn delay={500}>
                        <FeatureCard
                            title="7-day money back guarantee"
                            icon={['fad', 'money-bill-wave']}
                            color="secondary"
                            text="If you don’t absolutely love our service after signing up. No worries, we’ll give your money back - No
              questions asked."
                        />
                    </FadeIn>
                </ShiftIn>
            </CardsContainer>
        </HeroContainer>
        <HeroBackground />
    </React.Fragment>
)

export default React.memo(Hero)
