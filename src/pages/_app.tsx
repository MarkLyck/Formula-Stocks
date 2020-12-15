import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'
import AppProvider from '../lib/AppProvider'
import '~/lib/iconLibrary'

const App = ({ Component, pageProps }: any) => {
  const apolloClient = useApollo(pageProps)

  return (
    <AppProvider>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </AppProvider>
  )
}

export default App