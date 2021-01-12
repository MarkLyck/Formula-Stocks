import React, { useState } from 'react'
import MenuItem from './MenuItem'
import { MenuList } from './styles'
import SupportButton from './SupportButton'
import styled from '@emotion/styled'

const Heading = styled.h5`
  color: #A0A0B9;
  text-align: left;
  width: 100%;
  padding: 8px 24px;
  font-size: 14px;
  margin: 0;
  font-weight: 400;
`

const Spacer = styled.div`
  flex: 1;
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

const SideMenu = ({ user, onClose }) => {
  const [activeRoute, setActiveRoute] = useState('')

  return (
    <MenuList>
      <Heading>Menu</Heading>
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
      <Spacer />
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
