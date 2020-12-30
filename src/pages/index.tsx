import React, { useState } from 'react'
import { initializeApollo, addApolloState } from '~/lib/apolloClient'
import { SignupModal } from '~/components/LandingPage/Modals'
import {
  Navbar,
  Hero,
  PickingWinningStocks,
  HowToGetStarted,
  LatestSellSignals,
  Performance,
  Risk,
  Statistics,
  AIScore,
  Newsletter,
  MoneyBackGuarantee,
  StrategyWeUse,
  ExchangesSupported,
  Pricing,
  Footer
} from '~/components/LandingPage'

const IndexPage = () => {
  const [signupVisible, setSignupVisible] = useState(false)

  const showSignup = () => setSignupVisible(true)

  return (
    <>
      {/* Modals */}
      <SignupModal isVisible={signupVisible} onClose={() => setSignupVisible(false)} />
      {/* Page components */}
      <Navbar showSignup={showSignup} />
      <Hero showSignup={showSignup} />
      <PickingWinningStocks />
      <Performance />
      <Risk />
      <LatestSellSignals />
      <Statistics />
      <Newsletter />
      <AIScore />
      <Pricing showSignup={showSignup} />
      <MoneyBackGuarantee />
      <HowToGetStarted />
      <StrategyWeUse showSignup={showSignup} />
      <ExchangesSupported />
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}

export default IndexPage
