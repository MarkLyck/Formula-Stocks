import React from 'react'
import { Divider, Button, Tooltip } from 'antd'
import styled from '@emotion/styled'
import { Element } from 'react-scroll'
import { ScalingTitle, ScalingSubTitle, LandingPageContainer, Card, SmallFeatureCard } from 'src/ui-components'
import theme from 'src/lib/theme'

const CardTitle = styled.h4`
  margin: 0;
  font-size: 1rem;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: ${(p) => p.theme.breakpoints.small}) {
    flex-direction: column;
  }
`

const PricingCard = styled(Card)`
  margin: 0 16px;
  width: 340px;
  padding: 32px;
  min-height: 180px;

  &:hover {
    background-color: ${(p) => p.theme.palette.neutral[200]};
  }

  @media (max-width: ${(p) => p.theme.breakpoints.medium}) {
    width: 100%;
    margin: 0 8px;
    padding: 16px;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.small}) {
    margin: 0 0 16px 0;
    padding: 32px;
  }
`

const PriceTag = styled.h5`
  font-weight: bold;
  font-size: 1.2rem;
  color: ${(p) => p.theme.palette.primary[600]};
  margin: 24px 0;
`

const CancelText = styled.p`
  margin-top: 16px;
  text-align: center;
`

const Pricing = ({ showSignup }: any) => (
  <LandingPageContainer align="center" marginBottom="4rem">
    <Element name="pricing" />
    <TitleContainer>
      <ScalingTitle>Pricing</ScalingTitle>
      <ScalingSubTitle>Our products are fine-tuned for your portfolio size.</ScalingSubTitle>
    </TitleContainer>
    <Container>
      <PricingCard>
        <CardTitle>Portfolio size under $100k</CardTitle>
        <Divider />
        <Tooltip title="Try it for free for 7-days">
          <SmallFeatureCard style={{ boxShadow: 'none' }} icon="gift" color={theme.palette.success[600]} hover={false}>
            Free 7-day trial
          </SmallFeatureCard>
        </Tooltip>
        <PriceTag>
          $49 / month<sup>*</sup>
        </PriceTag>
        <Button onClick={showSignup} style={{ fontWeight: 'bold' }} type="primary">
          Try it for free
        </Button>
      </PricingCard>
      <PricingCard>
        <CardTitle>Portfolio size $100k - $1M</CardTitle>
        <Divider />
        <Tooltip title="This portfolio is tailored for medium-sized accounts.">
          <SmallFeatureCard
            style={{ boxShadow: 'none' }}
            icon="analytics"
            color={theme.palette.primary[600]}
            hover={false}
          >
            Medium sized portfolios
          </SmallFeatureCard>
        </Tooltip>
        <PriceTag>
          $99 / month<sup>*</sup>
        </PriceTag>
        <Button onClick={showSignup} style={{ fontWeight: 'bold' }} type="primary">
          Get started
        </Button>
      </PricingCard>
      <PricingCard>
        <CardTitle>Portfolio size over $1M</CardTitle>
        <Divider />
        <Tooltip title="Contact us for portfolios tailored for large accounts.">
          <SmallFeatureCard
            style={{ boxShadow: 'none' }}
            icon="money-check-edit-alt"
            color={theme.palette.warning[500]}
            hover={false}
          >
            Large portfolios
          </SmallFeatureCard>
        </Tooltip>
        <PriceTag>Contact us</PriceTag>
        <Button style={{ fontWeight: 'bold' }}>Send email</Button>
      </PricingCard>
    </Container>
    {/* <StyledAlert type="info" message="You stay in full control of your investments in your brokerage account!" /> */}
    <CancelText>
      <sup>*</sup>No lock-in contract, cancel anytime
    </CancelText>
  </LandingPageContainer>
)

export default Pricing
