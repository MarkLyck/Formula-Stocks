import React, { useState } from 'react'
import Router from 'next/router'
import { Space } from 'antd'
import logout from '~/common/utils/logout'
import { hasStorage, isBrowser } from '~/common/utils/featureTests'


import LoginButton from './LoginButton'
import SignupButton from './SignupButton'
import LogoutButton from './LogoutButton'
import DashboardButton from './DashboardButton'

const LoginItems = ({ showSignup }: any) => {
    const [loggedIn, setLoggedIn] = useState(
        // @ts-ignore window.authToken
        (hasStorage && localStorage.getItem('authToken')) || (isBrowser && window.authToken)
    )

    const handleLogoutClick = () => {
        logout()
        setLoggedIn(false)
    }

    const handleDashboardClick = () => {
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
