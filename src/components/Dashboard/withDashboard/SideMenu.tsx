import React from 'react'
import isPropValid from '@emotion/is-prop-valid'
import { useLocalStorageState } from 'ahooks'
import { Layout, Menu, Tooltip } from 'antd'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
        background: ${(p) => p.theme.palette.primary[500]};
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

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  background-color: ${(p) => p.theme.palette.basic[200]};

  &:hover {
    cursor: pointer;
  }
`

const MenuDivider = styled('div', {
  shouldForwardProp: () => false,
})`
  width: calc(100% - 32px);
  height: 1px;
  background: ${(p) => p.theme.palette.basic[300]};
  margin: 16px auto;
`

const Spacer = styled('div', {
  shouldForwardProp: () => false,
})`
  flex: 1;
`

const menuList = [
  { label: 'Portfolio', icon: ['fad', 'analytics'] },
  { label: 'Trades', icon: ['fad', 'flask'] },
  { label: 'Reports', icon: ['fad', 'brain'] },
  { label: 'Account', icon: ['fad', 'user'] },
  { divider: true },
  { label: 'Admin', icon: ['fad', 'tools'] },
]

const SideMenu = () => {
  const [collapsed, setCollapsed] = useLocalStorageState('side-menu-collapsed', false)

  return (
    <Sider theme="light" collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <Tooltip placement="right" title="Home">
        <LogoContainer>
          <Logo>{collapsed ? 'L' : 'Logo'}</Logo>
        </LogoContainer>
      </Tooltip>
      <MenuDivider />
      {/* @ts-ignore */}
      <StyledMenu collapsed={collapsed} defaultSelectedKeys={['1']} mode="inline">
        {menuList.map((item, i) => {
          if (item.divider) return <MenuDivider key={i + 1} />

          return (
            // @ts-ignore
            <Menu.Item key={i + 1} icon={<MenuIcon icon={item.icon} />}>
              {item.label}
            </Menu.Item>
          )
        })}
        <Menu.Item key={menuList.length + 1} icon={<MenuIcon icon={['fad', 'sign-out-alt']} />}>
          Logout
        </Menu.Item>
        <Spacer />
        {/* @ts-ignore */}
        <SupportButton user={{}} collapsed={collapsed} />
      </StyledMenu>
    </Sider>
  )
}

export default SideMenu
