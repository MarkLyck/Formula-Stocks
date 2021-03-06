import React, { useState } from 'react'
import { initializeApollo, addApolloState } from 'src/lib/apolloClient'
import { SignupModal } from 'src/components/LandingPage/Modals'
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
  VerifiableResults,
  StrategyWeUse,
  ExchangesSupported,
  Pricing,
  Footer,
} from 'src/components/LandingPage'

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
      <VerifiableResults />
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
