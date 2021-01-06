import React, { useState } from 'react'
import Router from 'next/router'
import { isBrowser } from '~/common/utils/featureTests'
import MenuItem from './MenuItem'
import { MenuList } from './styles'
import SupportButton from './SupportButton'

const getRoutes = (user?: any) => {
  const routes = [
    { name: 'Portfolio', icon: ['fad', 'analytics'], route: 'portfolio' },
    { name: 'Trades', icon: ['fad', 'flask'], route: 'trades' },
    { name: 'Reports', icon: ['fad', 'brain'], route: 'reports' },
    { name: 'account', icon: ['fad', 'user'], route: 'account' },
    // { name: 'Community', icon: ['fad', 'comments'], route: 'community', badge: 'New' },
    { name: 'logout', icon: ['fad', 'sign-out-alt'], route: 'logout' },
  ]

  if (user && user.type === 'admin') routes.push({ name: 'Admin', icon: ['fad', 'tools'], route: 'admin' })

  return routes
}

const SideMenu = ({ user, onClose }) => {
  const [activeRoute, setActiveRoute] = useState('')
  const [isVisible, setIsVisible] = useState(true)

  return (
    <MenuList isVisible={isVisible}>
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
      <SupportButton user={user} />
    </MenuList>
  )
}

export default SideMenu
