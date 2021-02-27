import { hasStorage, isBrowser } from '~/common/utils/featureTests'
import Router from 'next/router'
// import { Mixpanel } from '~/lib/analytics/mixpanel'
// import debounce from '~/common/utils/debounce

export const logout = (event?: any, to?: string) => {
  if (event?.preventDefault) event.preventDefault()

  // @ts-ignore
  if (isBrowser) window.authToken = undefined

  if (hasStorage) {
    localStorage.removeItem('authToken')
    localStorage.removeItem('refreshToken')
  }

  // debounce(() => Mixpanel.track('Unauthenticate'), 1000)
  Router.push(to ? to : '/')
}
