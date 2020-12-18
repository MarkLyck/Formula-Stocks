
import { initializeApollo, addApolloState } from '~/lib/apolloClient'
import {
  Navbar,
  Hero,
  PickingWinningStocks,
  HowToUse,
  LatestSellSignals,
  Performance,
  Risk,
  Statistics,
  AIScore,
  Newsletter,
  MoneyBackGuarantee,
  StrategyWeUse
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
    <HowToUse />
    <MoneyBackGuarantee />
    <StrategyWeUse />
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
