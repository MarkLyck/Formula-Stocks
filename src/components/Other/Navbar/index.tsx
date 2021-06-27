import React from 'react'
import styled from '@emotion/styled'
import { maxSiteWidth } from '~/common/styles'
import Router from 'next/router'
import { isBrowser } from '~/common/utils/featureTests'
import useWindowSize from 'src/common/hooks/useWindowSize'
import { ActionButton } from 'src/ui-components'
import NavItem from './NavItem'

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
  box-sizing: border-box;
`

const NavLinks = styled.ul`
  display: flex;
  box-sizing: border-box;
`

const LinkContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.img`
  display: flex;
  align-items: center;
  width: 240px;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 880px) {
    width: auto;
    max-height: 40px;
  }
`

const LogoPlaceholder = styled.div`
  width: 150px;
  margin-left: 7px;
`

const goTo = (location: any) => Router.push(location)
const openWhitePaper = () => window.open('/assets/whitepaper_2008.pdf', '_blank')

const Nav = () => {
  // @ts-ignore
  if (isBrowser && window.$crisp) $crisp.push(['do', 'chat:show'])
  const windowSize = useWindowSize()

  return (
    <NavBackground>
      <NavContainer>
        <LinkContainer>
          {isBrowser ? (
            <Logo
              data-id="sales-navbar"
              onClick={() => goTo('/')}
              src={
                windowSize.width > 1000
                  ? '/logos/formula_stocks/logo_horizontal.svg'
                  : '/logos/formula_stocks/logo_square.svg'
              }
            />
          ) : (
            <LogoPlaceholder />
          )}

          <NavLinks>
            <NavItem variant="light" title="HOME" onClick={() => goTo('/')} />
            <NavItem variant="light" title="RISK" onClick={() => goTo('/risk')} />
            <NavItem variant="light" title="STRATEGY" onClick={() => goTo('/strategy')} />
            <NavItem
              variant="light"
              title="FAQ"
              href="https://help.formulastocks.com/en/category/faq-h9v423/"
              target="_blank"
            />
            <NavItem variant="light" title="WHITE PAPER" onClick={() => openWhitePaper()} />
          </NavLinks>
          <ActionButton onClick={() => goTo('/?signup')}>SIGN UP TO BEAT THE MARKET</ActionButton>
        </LinkContainer>
      </NavContainer>
    </NavBackground>
  )
}

export default Nav
