import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from 'src/ui-components'
import { resetApplication } from 'src/common/utils'

import { CURRENT_USER_QUERY } from '~/common/queries'
import { useAtom, userAtom } from 'src/atoms'
import Layout from './Layout'

const withDashboard = (Component: React.ReactNode) => () => {
  const [user, setUser] = useAtom(userAtom)
  const { loading, data, error } = useQuery(CURRENT_USER_QUERY, { fetchPolicy: 'cache-and-network' })

  useEffect(() => {
    setUser(data?.user)
  }, [data])

  console.log('loading', loading)
  console.log('loading', error)
  console.log('user', user)

  return (
    <Layout>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={resetApplication}>
        {/* @ts-ignore */}
        <Component />
      </ErrorBoundary>
    </Layout>
  )
}

export default withDashboard
