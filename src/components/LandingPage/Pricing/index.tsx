import React from 'react'
import { Divider, Button } from 'antd'
import styled from '@emotion/styled'
import { ScalingTitle, ScalingSubTitle, LandingPageContainer, Card, SmallFeatureCard } from '~/ui-components'
import theme from '~/lib/theme'

const CardTitle = styled.h4`
    margin: 0;
    font-size: 1rem;
`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`

const PricingCard = styled(Card)`
    margin: 0 16px;
    width: 300px;

    &:hover {
        background-color: ${p => p.theme.palette.basic[200]};
    }
`

const PriceTag = styled.h5`
    font-weight: bold;
    font-size: 1.2rem;
    color: ${p => p.theme.palette.primary[500]};
    margin: 24px 0;
`

const CancelText = styled.p`
    margin-top: 16px;
    text-align: center;
`

const Pricing = () => (
    <LandingPageContainer align="center" marginBottom="8vw" >
        <TitleContainer>
            <ScalingTitle>
                Pricing
            </ScalingTitle>
            <ScalingSubTitle>
                Our pricing is tiered based on your portfolio size in order to keep our service affordable for those with smaller account sizes.
            </ScalingSubTitle>
        </TitleContainer>
        <Container >
            <PricingCard style={{ padding: "32px", minHeight: "180px" }}>
                <CardTitle>
                    Account value under $25k
                </CardTitle>
                <Divider />
                <SmallFeatureCard style={{ boxShadow: 'none' }} icon="gift" color={theme.palette.success[500]} hover={false}>Free 7-day trial</SmallFeatureCard>
                <PriceTag>
                    $49 / month<sup>*</sup>
                </PriceTag>
                <Button style={{ fontWeight: 'bold' }} type="primary">Try it for free</Button>
            </PricingCard>
            <PricingCard style={{ padding: "32px", minHeight: "180px" }}>
                <CardTitle>
                    Account value $25k - $100k
                </CardTitle>
                <Divider />
                <SmallFeatureCard style={{ boxShadow: 'none' }} icon="analytics" color={theme.palette.primary[500]} hover={false}>Medium capital</SmallFeatureCard>
                <PriceTag>
                    $99 / month<sup>*</sup>
                </PriceTag>
                <Button style={{ fontWeight: 'bold' }} type="primary">Get started</Button>
            </PricingCard>
            <PricingCard style={{ padding: "32px", minHeight: "180px" }}>
                <CardTitle>
                    Account value over $100k
                </CardTitle>
                <Divider />
                <SmallFeatureCard style={{ boxShadow: 'none' }} icon="money-check-edit-alt" color={theme.palette.warning[500]} hover={false}>Large capital</SmallFeatureCard>
                <PriceTag>
                    Contact us
                </PriceTag>
                <Button style={{ fontWeight: 'bold' }}>Send email</Button>
            </PricingCard>
        </Container>
        <CancelText><sup>*</sup>No lock-in contract, cancel anytime</CancelText>
    </LandingPageContainer >
)

export default Pricing
