
import { initializeApollo, addApolloState } from '~/lib/apolloClient'
import { Navbar, Hero } from '~/components/LandingPage'

const IndexPage = () => (
  <>
    <Navbar />
    <Hero />
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
