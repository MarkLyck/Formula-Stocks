import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Router from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SlideIn from '~/components/Dialogs/SlideIn'
import SideMenu from '~/components/Dashboard/SideMenu'
import { Bar, Logo, Content, HamburgerButton } from './styles'
import { StockMarketStatus } from '~/ui-components'

const MarketStatusContainer = styled.div`
  @media (max-width: 850px) {
    display: none;
  }
`

export interface NavbarType {
  user: any
}

const Navbar = ({ user }) => {
  const [sideMenuVisible, setSideMenuVisible] = useState(false)
  const [logoClickable, setLogoClickable] = useState(false)

  useEffect(() => {
    setTimeout(() => setLogoClickable(true), 500)
  })
  const handleSideMenuToggle = () => setSideMenuVisible(!sideMenuVisible)
  const goToFrontPage = () => {
    if (logoClickable) Router.push('/')
  }

  return (
    <Bar>
      <Content>
        <HamburgerButton onClick={handleSideMenuToggle}>
          <FontAwesomeIcon icon={['far', 'bars']} />
        </HamburgerButton>
        <Logo onClick={goToFrontPage} />
        <MarketStatusContainer>
          <StockMarketStatus />
        </MarketStatusContainer>
      </Content>
      {/* <SlideIn isVisible={sideMenuVisible} onRequestClose={handleSideMenuToggle}> */}
        {/* @ts-ignore */}
        {/* <SideMenu user={user} isPopOver onRequestClose={handleSideMenuToggle} />
      </SlideIn> */}
    </Bar>
  )
}

export default Navbar
