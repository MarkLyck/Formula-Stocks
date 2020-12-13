import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { Space } from 'antd'
import { NavItem } from '~/ui-components'
import LoginItems from './LoginItems'
import useWindowSize from '~/common/hooks/useWindowSize'

const Header = styled.header`
    width:100%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
`

const Logo = styled.img`
    height: 100%;
    width: auto;
    padding: 16px;
`

export interface NavbarProps { }

const Navbar = () => {
    const windowSize = useWindowSize()

    return (
        <Header>
            <Link href="/">
                <a>
                    <Logo
                        data-id="components-navbar"
                        src={windowSize.width > 1080 ? '/logos/horizontal.svg' : '/logos/logo_icon_white.svg'}
                    />
                </a>
            </Link>
            <Space>
                <NavItem href="/">Strategy</NavItem>
                <NavItem href="/">FAQ</NavItem>
                <NavItem href="/">White paper</NavItem>
            </Space>
            <LoginItems />
        </Header>
    )
}

export default Navbar