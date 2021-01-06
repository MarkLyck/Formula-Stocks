import React, { Component, useState } from 'react'
import styled from '@emotion/styled'
import { maxSiteWidth } from '~/common/styles'
import Router from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { hasStorage, isBrowser } from '~/common/utils/featureTests'
import { useWindowSize } from '~/common/hooks'
import NavItem from './NavItem'
import { Button } from '~/ui-components'
import LogoHorizontal from 'public/logos/logo_horizontal_color.svg'
import LogoIcon from 'public/logos/logo_icon_color.svg'
import logoutUser from '~/common/utils/logout'

const NavBackground = styled.div`
  width: 100%;
  border-bottom: 1px solid #ebedf5;
  box-shadow: 0 4px 14px 0 rgba(111, 120, 156, 0.08);
  position: fixed;
  z-index: 100;
  background: white;
`

const NavContainer = styled.nav`
  box-sizing: border-box;
  ${maxSiteWidth};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  box-sizing: border-box;
`

const NavLinks = styled.ul`
  display: flex;
  box-sizing: border-box;
  height: 100%;
`

const UserLinks = styled.ul`
  display: flex;
  align-items: center;

  @media (max-width: 760px) {
    display: none;
  }
`

const LinkContainer = styled.div`
  display: flex;
  height: 100%;
`

const Logo = styled.span`
  display: flex;
  align-items: center;
  width: 150px;
  margin-left: 16px;

  > svg {
    transform: scale(1.5);
  }

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 500px) {
    margin-left: 0;
    width: 50px;
  }
`

const LogoPlaceholder = styled.div`
  width: 150px;
  margin-left: 7px;
`

const ActionButton = styled(Button)`
  padding: 8px 16px;
`

const goTo = (location) => Router.push(location)
const openWhitePaper = () => window.open('/static/2008_Whitepaper_weeklystocktip.pdf', '_blank')

const Nav = ({ showSignup, showLogin, variant }) => {
  const [loggedIn, setLoggedIn] = useState(
    (hasStorage && localStorage.getItem('authToken')) || (isBrowser && window.authToken)
  )
  const windowSize = useWindowSize()

  return (
    <NavBackground>
      <NavContainer>
        <LinkContainer>
          {isBrowser ? (
            <Logo
              data-id="ui-components-navbar"
              onClick={() => goTo('/')}
              dangerouslySetInnerHTML={{
                __html: windowSize.width > 500 ? LogoHorizontal : LogoIcon,
              }}
            />
          ) : (
            <LogoPlaceholder />
          )}
          <NavLinks>
            <NavItem variant="light" title="HOME" onClick={() => goTo('/')} />
            <NavItem variant="light" title="FAQ" onClick={() => goTo('/faq')} />
            <NavItem variant="light" title="ARTICLES" onClick={() => goTo('/articles')} />
            <NavItem variant="light" title="WHITE PAPER" onClick={() => openWhitePaper()} />
          </NavLinks>
        </LinkContainer>
        <UserLinks>
          <ActionButton onClick={() => goTo('/?signup')} backgroundColor="secondary" color="white" size="small">
            SIGN UP TO BEAT THE MARKET
          </ActionButton>
        </UserLinks>
      </NavContainer>
    </NavBackground>
  )
}

export default Nav
