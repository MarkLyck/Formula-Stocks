import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'
import AppProvider from '../lib/AppProvider'
import '~/lib/iconLibrary'
import 'src/lib/themes/antd.less'
// import { ThemeProvider } from 'antd-theme';

const App = ({ Component, pageProps }: any) => {
  const apolloClient = useApollo(pageProps)

  return (
    <AppProvider>
      {/* <ThemeProvider> */}
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
      {/* </ThemeProvider> */}
    </AppProvider>
  )
}

export default App
