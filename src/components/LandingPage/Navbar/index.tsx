import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { Space, Divider } from 'antd'
import { scroller } from 'react-scroll'
import { NavItem, LandingPageContainer } from '~/ui-components'
import LoginItems from './LoginItems'
import useWindowSize from '~/common/hooks/useWindowSize'

const Header = styled.header`
    position: absolute;
    top: 0;
    width:100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 32px 0;
`

const Logo = styled.img`
    height: 24px;
`

const Container = styled(LandingPageContainer)`
    width:100%;
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export interface NavbarProps { }

const Navbar = () => {
    const windowSize = useWindowSize()

    const goToPricing = () => {
        scroller.scrollTo('pricing', {
            duration: 500,
            delay: 50,
            smooth: true,
            offset: -80
        })
    }

    return (
        <Header>
            <Container>
                <Space>
                    <Link href="/">
                        <a>
                            <Logo
                                data-id="components-navbar"
                                // @ts-ignore
                                src={windowSize.width > 1000 ? '/logos/logo_horizontal_color.svg' : '/logos/logo_icon_color.svg'}
                            />
                        </a>
                    </Link>
                    <Divider type="vertical" />
                    <NavItem href="/strategy">Strategy</NavItem>
                    <NavItem onClick={goToPricing} href={false}>Pricing</NavItem>
                    <NavItem realLink href="/assets/white_paper.pdf" target="_blank">White paper</NavItem>
                </Space>
                <LoginItems />
            </Container>
        </Header >
    )
}

export default Navbar