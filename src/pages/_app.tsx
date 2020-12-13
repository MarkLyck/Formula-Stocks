import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'
import AppProvider from '../lib/AppProvider'

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)

  return (
    <AppProvider>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </AppProvider>
  )
}
