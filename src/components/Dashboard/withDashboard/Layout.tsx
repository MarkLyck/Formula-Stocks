import React from 'react'
import { Layout } from 'antd'
import styled from '@emotion/styled'
import { COMPANY_NAME } from 'src/common/constants'
import SideMenu from './SideMenu'

const { Content, Footer } = Layout

const DashboardLayout = styled(Layout)`
  min-height: 100vh;
`

const DashboardContent = styled(Content)`
  margin: 32px;
`

export type LayoutProps = {
  children: React.ReactNode
}

const LayoutComponent = ({ children }: LayoutProps) => (
  <DashboardLayout>
    <SideMenu />
    <Layout>
      <DashboardContent>{children}</DashboardContent>
      <Footer>
        {COMPANY_NAME} ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  </DashboardLayout>
)

export default LayoutComponent
