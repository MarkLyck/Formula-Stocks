import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'

import { useApollo } from '../lib/apolloClient'
import AppProvider from '../lib/AppProvider'
import 'src/lib/iconLibrary'

const App = ({ Component, pageProps }: any) => {
  const apolloClient = useApollo(pageProps)

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
      </Head>

      <AppProvider>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </AppProvider>
    </>
  )
}

export default App
