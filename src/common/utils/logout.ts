import { hasStorage, isBrowser } from '~/common/utils/featureTests'
import Router from 'next/router'
// import { Mixpanel } from '~/lib/analytics/mixpanel'
// import debounce from '~/common/utils/debounce'

const logout = (to?: string) => {
  // @ts-ignore
  if (isBrowser) window.authToken = undefined

  if (hasStorage) {
    localStorage.removeItem('authToken')
    localStorage.removeItem('refreshToken')
  }

  // debounce(() => Mixpanel.track('Unauthenticate'), 1000)
  Router.push(to ? to : '/')
}

export default logout
