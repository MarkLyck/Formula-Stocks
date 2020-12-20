
import { initializeApollo, addApolloState } from '~/lib/apolloClient'
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

const IndexPage = () => (
  <>
    <Navbar />
    <Hero />
    <PickingWinningStocks />
    <Performance />
    <Risk />
    <LatestSellSignals />
    <Statistics />
    <Newsletter />
    <AIScore />
    <Pricing />
    <MoneyBackGuarantee />
    <HowToGetStarted />
    <StrategyWeUse />
    <ExchangesSupported />
    <Footer />
  </>
)

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}

export default IndexPage
