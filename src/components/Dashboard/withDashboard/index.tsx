import React, { useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import Router from 'next/router'
import flagsmith from 'flagsmith'
import { isBrowser, hasStorage } from 'src/common/utils/featureTests'
import SideMenu from 'src/components/Dashboard/SideMenu'
import { DashboardLayout, DashboardContent, DashboardBeside, StyledAlert } from './styles'
import { CURRENT_USER_QUERY, REFRESH_TOKEN } from 'src/common/queries'
import { AUTH_PROFILE_ID } from 'src/common/constants'
import { SettingsProvider } from 'src/common/contexts/settings'
import { Mixpanel } from 'src/lib/analytics/mixpanel'

const removeStoredTokens = () => {
  if (hasStorage) {
    localStorage.removeItem('authToken')
    localStorage.removeItem('refreshToken')
  }
}

const storeTokens = (authToken: string, refreshToken: string) => {
  // @ts-ignore
  window.refreshToken = refreshToken
  // @ts-ignore
  window.authToken = authToken
  if (hasStorage) {
    localStorage.refreshToken = refreshToken
    localStorage.authToken = authToken
  }
}

const withDashboard = (Component: any) => ({ location, ...extraProps }: any) => {
  if (!isBrowser) return null

  const { loading, data, refetch } = useQuery(CURRENT_USER_QUERY, { fetchPolicy: 'cache-and-network' })
  const [refreshToken, { loading: refreshTokenLoading, data: refreshTokenData, called }] = useMutation(REFRESH_TOKEN)

  // is fetching user or refreshing token
  let authenticating = loading || refreshTokenLoading
  // const isLoginPage = Router.router.route.includes('/dashboard/login')

  useEffect(() => {
    // @ts-ignore
    if (window.$crisp) window.$crisp.push(['do', 'chat:hide'])
    // The user has no authToken saved in storage or window sess -> make user login
    if (hasStorage && !localStorage.getItem('authToken')) {
      // @ts-ignore
      if (isBrowser && !window.authToken && Router?.router?.route.includes('dashboard')) {
        console.log('useEffect - authToken', localStorage.getItem('authToken'))
        console.log('useEffect - refreshToken', localStorage.getItem('refreshToken'))
        console.log('useEffect - dashboard push')
        Router.push('/dashboard/login')
        return
      }
    }
  }, [])

  // if authToken is saved, but expired user.id will be null
  if (data && data.user && data.user.id === null) {
    // if refreshToken hasn't been attempted, try refreshing.
    if (hasStorage && localStorage.refreshToken && !called) {
      refreshToken({ variables: { refreshToken: localStorage.refreshToken, authProfileId: AUTH_PROFILE_ID } })
    } else {
      // if refreshToken has been attempted and got a valid response
      if (refreshTokenData && refreshTokenData.userRefreshToken) {
        storeTokens(refreshTokenData.userRefreshToken.idToken, refreshTokenData.userRefreshToken.refreshToken)
        // refetch CURRENT_USER
        refetch()
      } else if (!authenticating) {
        // if no auth requests are in progress and refreshToken data is invalid -> make user login
        removeStoredTokens()
        console.log('push login')
        // Router.push('/dashboard/login')
      }
    }
  }

  const user = data && data.user ? data.user : null
  let alerts = []
  let subscriptionPaused = false

  if (user && user.id) {
    const stripeStatus = user.stripe.subscription.status
    if (user.stripe.subscription.pause_collection) {
      subscriptionPaused = true
    }

    // @ts-ignore
    if (window.$crisp) window.$crisp.push(['set', 'user:email', user.email])

    flagsmith.identify(user.id)
    Mixpanel.identify(user.id)
    Mixpanel.people.set({
      $email: user.email,
      $name: `${user.firstName} ${user.lastName}`,
      USER_ID: user.id,
      createdAt: user.createdAt,
      stripeCustomer: user.stripe.customerID,
      stripeStatus,
    })

    if (stripeStatus === 'past_due') {
      alerts.push({
        message: 'Missed payment',
        description:
          'Whoops, looks like you missed a payment. Please make sure you have sufficient funds in your account or update your payment details.',
        type: 'error',
        showIcon: true,
      })
    }
  }

  return (
    <SettingsProvider>
      <DashboardLayout>
        <DashboardBeside>
          <SideMenu user={user} />
          <DashboardContent>
            {alerts.map((alert: any) => (
              <StyledAlert {...alert} />
            ))}
            <Component
              location={location}
              user={user}
              subscriptionPaused={subscriptionPaused}
              loading={authenticating}
              {...extraProps}
            />
          </DashboardContent>
        </DashboardBeside>
      </DashboardLayout>
    </SettingsProvider>
  )
}

export default withDashboard
