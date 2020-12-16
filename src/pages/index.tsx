
import { initializeApollo, addApolloState } from '~/lib/apolloClient'
import { Navbar, Hero, PickingWinningStocks, HowDoIUseIt } from '~/components/LandingPage'

const IndexPage = () => (
  <>
    <Navbar />
    <Hero />
    <PickingWinningStocks />
    <HowDoIUseIt />
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
