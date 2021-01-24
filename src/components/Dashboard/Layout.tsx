import React, { useState } from 'react'
import { Layout, Menu, Divider } from 'antd'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { COMPANY_NAME } from 'src/common/constants'

const { Content, Footer, Sider } = Layout

const MenuIcon = styled(FontAwesomeIcon)`
  && {
    width: 16px;
    margin-right: 20px;
  }
`

const StyledMenu = styled(Menu)`
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

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: calc(100% - 32px);
  margin: 16px;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 8px;
  background-color: ${(p) => p.theme.palette.basic[200]};
`

const MenuDivider = styled(Divider)`
  width: calc(100% - 32px);
  min-width: 0;
  margin: 16px auto;
`

const Spacer = styled.div`
  flex: 1;
`

export type LayoutProps = {
  children: React.ReactNode
}

const menuList = [
  { label: 'Portfolio', icon: ['fad', 'analytics'] },
  { label: 'Trades', icon: ['fad', 'flask'] },
  { label: 'Reports', icon: ['fad', 'brain'] },
  { label: 'Account', icon: ['fad', 'user'] },
  { divider: true },
  { label: 'Admin', icon: ['fad', 'tools'] },
]

const LayoutComponent = ({ children }: LayoutProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const onCollapse = (value: boolean) => setCollapsed(value)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Logo>logo</Logo>
        <MenuDivider />
        {/* @ts-ignore */}
        <StyledMenu collapsed={collapsed} defaultSelectedKeys={['1']} mode="inline">
          {menuList.map((item, i) => {
            if (item.divider) return <MenuDivider />

            return (
              // @ts-ignore
              <Menu.Item key={i + 1} icon={<MenuIcon icon={item.icon} />}>
                {item.label}
              </Menu.Item>
            )
          })}
          <Spacer />
          <Menu.Item key={menuList.length + 1} icon={<MenuIcon icon={['fad', 'sign-out-alt']} />}>
            Logout
          </Menu.Item>
        </StyledMenu>
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>
          {COMPANY_NAME} ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  )
}

export default LayoutComponent
