import React, { useState } from 'react'
import Router from 'next/router'
import { Space } from 'antd'
import { useQuery } from '@apollo/client'

import { logout } from 'src/common/utils'
import { hasStorage, isBrowser } from 'src/common/utils/featureTests'
import { CURRENT_USER_QUERY } from 'src/common/queries'

import LoginButton from './LoginButton'
import SignupButton from './SignupButton'
import LogoutButton from './LogoutButton'
import DashboardButton from './DashboardButton'

const LoginItems = ({ showSignup }: any) => {
  const { data, error } = useQuery(CURRENT_USER_QUERY, { fetchPolicy: 'cache-and-network' })
  console.log('🔈 ~ error', error)
  console.log('🔈 ~ data', data)
  const [loggedIn, setLoggedIn] = useState(
    // @ts-ignore window.authToken
    (hasStorage && localStorage.getItem('authToken')) || (isBrowser && window.authToken)
  )

  const handleLogoutClick = () => {
    logout()
    setLoggedIn(false)
  }

  if (loggedIn && error) {
    if (error.message.includes('Token validation')) {
      handleLogoutClick()
    }
  }

  const handleDashboardClick = () => {
    console.log('handleDashboardClick - SEND USER TO DASHBOARD')
    Router.push('/dashboard')
  }

  if (loggedIn) {
    return (
      <Space>
        <LogoutButton onClick={handleLogoutClick} />
        <DashboardButton onClick={handleDashboardClick} />
      </Space>
    )
  }

  return (
    <Space>
      <LoginButton />
      <SignupButton onClick={showSignup} />
    </Space>
  )
}

export default LoginItems
