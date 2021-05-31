import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Layout, Menu, Tooltip } from 'antd'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ErrorBoundary } from 'react-error-boundary'

import useStore from 'src/lib/useStore'
import { ErrorFallback } from 'src/ui-components'
import { resetApplication, logout } from 'src/common/utils'
import SupportButton from './SupportButton'
import PlanSelect from './PlanSelect'

const { Sider } = Layout

const MenuIcon = styled(FontAwesomeIcon)`
  && {
    width: 16px;
    margin-right: 20px;
  }
`

const StyledMenu = styled(Menu, {
  shouldForwardProp: (prop) => {
    return prop !== 'collapsed'
  },
})`
  &&& {
    display: flex;
    flex-direction: column;
    height: calc(100% - 100px);
    .ant-menu-item {
      margin-top: 0;
      margin-bottom: 0;
      height: 48px;
      display: flex;
      align-items: center;
      padding-left: ${(p: any) => (p.collapsed ? 'calc(50% - 16px / 2) !important' : '24px')};
      &::after {
        right: inherit;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        border: none;
        width: 6px;
        height: 80%;
        background: ${(p) => p.theme.palette.primary[600]};
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
      }
    }
    .ant-menu-item-selected {
      background: ${(p) => p.theme.palette.primary[100]};
      &::after {
        opacity: 1;
      }
    }
  }
`

const LogoContainer = styled.div`
  padding: 16px 16px 8px;
  width: 100%;
`

const LogoCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 100%;
  padding: ${(p: { collapsed: any }) => (p.collapsed ? '8px' : '8px 8px')};
  overflow: hidden;
  border-radius: 4px;
  background-color: ${(p) => p.theme.palette.neutral[200]};
  transition: all 0.2s;

  &:hover {
    cursor: pointer;
    background-color: ${(p) => p.theme.palette.neutral[400]};
  }
`

const Logo = styled.img`
  max-height: 40px;
  max-width: 100%;
`

const MenuDivider = styled('div', {
  shouldForwardProp: () => false,
})`
  width: calc(100% - 32px);
  height: 1px;
  background: ${(p) => p.theme.palette.neutral[300]};
  margin: 16px auto;
`

const BottomMenu = styled.div`
  width: 100%;
  position: absolute;
  bottom: 48px;
`

const menuList = [
  { label: 'Portfolio', icon: ['fad', 'analytics'], route: '/dashboard/portfolio' },
  { label: 'Trades', icon: ['fad', 'flask'], route: '/dashboard/trades' },
  { label: 'Suggestions', icon: ['fad', 'lightbulb'], route: '/dashboard/suggestions' },
  { label: 'AI Reports', icon: ['fad', 'tachometer-alt'], route: '/dashboard/reports' },
  { divider: true },
  { label: 'Account', icon: ['fad', 'user'], route: '/dashboard/account' },
  { label: 'Articles', icon: ['fad', 'newspaper'], route: 'https://medium.com/@FormulaStocks' },
  { label: 'Road map', icon: ['fad', 'pennant'], route: '/dashboard/roadmap' },
  { divider: true },
  { label: 'Admin', icon: ['fad', 'tools'], route: '/dashboard/admin' },
]

export type SideMenuProps = {
  collapsed?: boolean
  setCollapsed: () => void
  onLinkClick: () => void
}

const SideMenu = ({ collapsed, setCollapsed, onLinkClick }: SideMenuProps) => {
  const router = useRouter()
  const user = useStore((state: any) => state.user)
  const activeItem =
    menuList.filter((item) => item.route && router.pathname?.includes(item.route))[0]?.route || '/dashboard/portfolio'

  const goToHomePage = () => router.push('/')

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={resetApplication}>
      <Sider
        theme="light"
        style={{
          position: 'fixed',
          height: '100vh',
          left: 0,
          overflow: 'auto',
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <Tooltip placement="right" title="Home">
          <LogoContainer onClick={goToHomePage}>
            <LogoCard collapsed={collapsed}>
              <Logo
                src={collapsed ? '/logos/formula_stocks/logo_square.svg' : '/logos/formula_stocks/logo_horizontal.svg'}
              />
            </LogoCard>
          </LogoContainer>
        </Tooltip>
        <MenuDivider role="menuitem" />
        {/* @ts-ignore */}
        <StyledMenu collapsed={collapsed} defaultSelectedKeys={[activeItem]} mode="inline">
          {menuList.map((item, i) => {
            if (item.label === 'Admin') {
              if (!user) return null
              if (user?.type !== 'admin') return null
            }

            if (item.divider) return <MenuDivider key={'divider' + i} role="menuitem" />

            return (
              // @ts-ignore icon string
              <Menu.Item onClick={onLinkClick} key={item.route} icon={<MenuIcon icon={item.icon} />}>
                {/* @ts-ignore item.route will exist */}
                {item.route.includes('http') ? (
                  // @ts-ignore
                  <Link href={item.route}>
                    <a href={item.route} target="_blank">
                      {item.label}
                    </a>
                  </Link>
                ) : (
                  // @ts-ignore
                  <Link href={item.route}>
                    <a>{item.label}</a>
                  </Link>
                )}
              </Menu.Item>
            )
          })}
          <Menu.Item onClick={logout} key={menuList.length + 1} icon={<MenuIcon icon={['fad', 'sign-out-alt']} />}>
            Logout
          </Menu.Item>
        </StyledMenu>
        <BottomMenu>
          <PlanSelect />
          <SupportButton user={{}} collapsed={collapsed} />
        </BottomMenu>
      </Sider>
    </ErrorBoundary>
  )
}

export default SideMenu
