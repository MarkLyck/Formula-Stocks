import React from 'react'
import Layout from './Layout'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from 'src/ui-components'
import { resetApplication } from 'src/common/utils'

const withDashboard = (Component: React.ReactNode) => () => {
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
