import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Layout, Menu, Tooltip } from 'antd'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from 'src/ui-components'
import { resetApplication, logout } from 'src/common/utils'
import SupportButton from './SupportButton'

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
  padding: ${(p: { collapsed: any }) => (p.collapsed ? '8px' : '8px 16px')};
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

const Spacer = styled('div', {
  shouldForwardProp: () => false,
})`
  flex: 1;
`

const menuList = [
  { label: 'Portfolio', icon: ['fad', 'analytics'], route: '/dashboard/portfolio' },
  { label: 'Trades', icon: ['fad', 'flask'], route: '/dashboard/trades' },
  { label: 'AI Reports', icon: ['fad', 'tachometer-alt'], route: '/dashboard/reports' },
  { label: 'Account', icon: ['fad', 'user'], route: '/dashboard/account' },
  { divider: true },
  { label: 'Admin', icon: ['fad', 'tools'], route: '/dashboard/admin' },
]

export type SideMenuProps = {
  collapsed?: boolean
  setCollapsed: () => void
}

const SideMenu = ({ collapsed, setCollapsed }: SideMenuProps) => {
  const router = useRouter()
  const activeItem =
    menuList.filter((item) => item.route && router.pathname?.includes(item.route))[0]?.route || '/dashboard/portfolio'

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
          <LogoContainer>
            <LogoCard collapsed={collapsed}>
              <Logo src={collapsed ? '/logos/logo_icon_color.svg' : '/logos/logo_horizontal_color.svg'} />
            </LogoCard>
          </LogoContainer>
        </Tooltip>
        <MenuDivider />
        {/* @ts-ignore */}
        <StyledMenu collapsed={collapsed} defaultSelectedKeys={[activeItem]} mode="inline">
          {menuList.map((item, i) => {
            if (item.divider) return <MenuDivider key={'divider' + i} />

            return (
              // @ts-ignore icon string
              <Menu.Item key={item.route} icon={<MenuIcon icon={item.icon} />}>
                {/* @ts-ignore item.route will exist */}
                <Link href={item.route}>
                  <a>{item.label}</a>
                </Link>
              </Menu.Item>
            )
          })}
          <Menu.Item onClick={logout} key={menuList.length + 1} icon={<MenuIcon icon={['fad', 'sign-out-alt']} />}>
            Logout
          </Menu.Item>
          <Spacer />
          {/* @ts-ignore */}
          <SupportButton user={{}} collapsed={collapsed} />
        </StyledMenu>
      </Sider>
    </ErrorBoundary>
  )
}

export default SideMenu
