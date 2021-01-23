import React, { useState } from 'react'
// import Router from 'next/router'
import styled from '@emotion/styled'
import Link from 'next/link'
import { Divider } from 'antd'
// import { isBrowser } from '~/common/utils/featureTests'
import MenuItem from './MenuItem'
import { MenuList } from './styles'
import SupportButton from './SupportButton'
import { useWindowSize } from '~/common/hooks'
import { COMPANY_NAME } from '~/common/constants'

const BrandContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`

const BrandName = styled.h1`
  font-size: 16px;
  font-weight: 700;
  color: ${(p) => p.theme.palette.text[550]};
`

const Logo = styled.img`
  height: 32px;
  margin: 8px 16px 16px 16px;
  background: white;
  border-radius: 4px;
  padding: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 4px 0px;

  @media (max-width: ${(p) => p.theme.breakpoints.small}) {
    padding: 8px;
    height: 16px;
  }
`

const StyledDivider = styled(Divider)`
  margin: 8px 16px;
  width: calc(100% - 32px);
  min-width: inherit;
`

const getRoutes = (user?: any) => {
  const routes = [
    { name: 'Portfolio', icon: ['fad', 'analytics'], route: 'portfolio' },
    { name: 'Trades', icon: ['fad', 'flask'], route: 'trades' },
    { name: 'Reports', icon: ['fad', 'brain'], route: 'reports' },
    { name: 'account', icon: ['fad', 'user'], route: 'account' },
    // { name: 'Community', icon: ['fad', 'comments'], route: 'community', badge: 'New' },
    // { name: 'logout', icon: ['fad', 'sign-out-alt'], route: 'logout' },
  ]

  if (user && user.type === 'admin') routes.push({ name: 'Admin', icon: ['fad', 'tools'], route: 'admin' })

  return routes
}

const SideMenu = ({ user, onClose }: any) => {
  const [activeRoute, setActiveRoute] = useState('')
  const windowSize = useWindowSize()

  return (
    <MenuList>
      <BrandContainer>
        <Link href="/">
          <a>
            <Logo
              data-id="components-navbar"
              // @ts-ignore
              src={windowSize.width > 3000 ? '/logos/logo_horizontal_color.svg' : '/logos/logo_icon_color.svg'}
            />
          </a>
        </Link>
        <BrandName>{COMPANY_NAME}</BrandName>
      </BrandContainer>
      <StyledDivider />
      {getRoutes(user).map((route: any) => (
        <MenuItem
          setActiveRoute={setActiveRoute}
          closeMenu={onClose}
          key={route.route}
          icon={route.icon}
          name={route.name}
          route={route.route}
          disabled={!!route.disabled}
          isActive={route.route === activeRoute}
          user={user}
          badge={route.badge}
        />
      ))}
      <StyledDivider />
      <MenuItem
        setActiveRoute={setActiveRoute}
        closeMenu={onClose}
        key="logout"
        icon={['fad', 'sign-out-alt']}
        name="logout"
        route="logout"
        disabled={false}
        isActive={false}
        user={user}
        badge={false}
      />
      <SupportButton user={user} />
    </MenuList>
  )
}

export default SideMenu
