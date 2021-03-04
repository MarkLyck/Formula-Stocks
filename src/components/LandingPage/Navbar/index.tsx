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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 0;
`

const Logo = styled.img`
  height: 24px;
  background: white;
  border-radius: 4px;

  @media (max-width: ${(p) => p.theme.breakpoints.small}) {
    padding: 8px;
    height: 32px;
  }
`

const Container = styled(LandingPageContainer)`
  width: 100%;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const NavItems = styled(Space)`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 700px) {
    .ant-space-item:nth-child(1) {
      display: none;
    }
  }

  @media (max-width: 600px) {
    .ant-space-item:nth-child(2) {
      display: none;
    }
  }

  @media (max-width: 500px) {
    display: none;
  }
`

export interface NavbarProps {}

const Navbar = ({ showSignup }: any) => {
  const windowSize = useWindowSize()

  const goToPricing = () => {
    scroller.scrollTo('pricing', {
      duration: 500,
      delay: 50,
      smooth: true,
      offset: -80,
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
                src={
                  windowSize.width > 1000
                    ? '/logos/formula_stocks/logo_horizontal.svg'
                    : '/logos/formula_stocks/logo_square.svg'
                }
              />
            </a>
          </Link>
          <Divider type="vertical" />
          <NavItems>
            <NavItem href="/strategy">Strategy</NavItem>
            <NavItem onClick={goToPricing} href={false}>
              Pricing
            </NavItem>
            <NavItem realLink href="/assets/white_paper.pdf" target="_blank">
              White paper
            </NavItem>
          </NavItems>
        </Space>
        <LoginItems showSignup={showSignup} />
      </Container>
    </Header>
  )
}

export default Navbar
