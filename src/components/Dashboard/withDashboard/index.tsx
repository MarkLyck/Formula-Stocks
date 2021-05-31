import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from 'src/ui-components'
import { resetApplication } from 'src/common/utils'

import { CURRENT_USER_QUERY } from 'src/common/queries'
import Layout from './Layout'
import useStore from 'src/lib/useStore'

const withDashboard = (Component: React.ReactNode) => () => {
  const setUser = useStore((state: any) => state.setUser)
  const { data } = useQuery(CURRENT_USER_QUERY, { fetchPolicy: 'cache-and-network' })

  useEffect(() => {
    setUser(data?.user)
  }, [data])

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
