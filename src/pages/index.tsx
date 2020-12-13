
import Test from '../components/Test'
import { initializeApollo, addApolloState } from '../lib/apolloClient'

const IndexPage = () => (
  <Test />
)

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}

export default IndexPage
