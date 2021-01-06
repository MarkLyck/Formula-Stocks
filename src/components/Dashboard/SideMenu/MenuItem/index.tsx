// @ts-nocheck
import React, { Component } from 'react'
import Router from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logoutUser from '~/common/utils/logout'
import { Mixpanel } from '~/lib/analytics/mixpanel'
import { Button, Badge, IconContainer } from './styles'

class MenuItem extends Component<any, any> {
  clickHandler = () => {
    const { route, setActiveRoute, closeMenu } = this.props
    if (route === 'logout') {
      Mixpanel.track('Logout')
      logoutUser()
      return
    }

    Mixpanel.track(`Side Menu Click - ${route}`)
    setActiveRoute(route)

    // closeMenu is only a function on mobile
    if (closeMenu) closeMenu()
    Router.push(`/dashboard/${route}`)
  }

  render() {
    const { route, name, icon, isActive, user, badge, disabled = false } = this.props
    if (route === 'admin' && (!user || user.type !== 'admin')) return null

    return (
      <Button
        onClick={this.clickHandler}
        isActive={isActive}
        data-test-id={`${name}-menu-btn`}
        logout={route === 'logout'}
        disabled={disabled}
      >
        <IconContainer>
          <FontAwesomeIcon icon={icon} flip={route === 'logout' ? 'horizontal' : undefined} />
        </IconContainer>
        <h4>{name}</h4>
        {badge && <Badge>{badge}</Badge>}
      </Button>
    )
  }
}

export default MenuItem
