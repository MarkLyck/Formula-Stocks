import React from 'react'
import { Layout } from 'antd'
import styled from '@emotion/styled'
import { useLocalStorageState } from 'ahooks'
import { COMPANY_NAME } from 'src/common/constants'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from 'src/ui-components'
import { resetApplication } from 'src/common/utils'
import SideMenu from './SideMenu'

const { Content, Footer } = Layout

const DashboardLayout = styled(Layout)`
  min-height: 100vh;
`

const ContentLayout = styled(Layout)`
  margin-left: ${(p: { sideMenuCollapsed?: boolean }) => (p.sideMenuCollapsed ? '80px' : '200px')};
  transition: all 0.2s;
`

const DashboardContent = styled(Content)`
  margin: 32px;
`

export type LayoutProps = {
  children: React.ReactNode
}

const LayoutComponent = ({ children }: LayoutProps) => {
  const [sideMenuCollapsed, setSideMenuCollapsed] = useLocalStorageState('side-menu-collapsed', false)

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={resetApplication}>
      <DashboardLayout>
        <SideMenu collapsed={sideMenuCollapsed} setCollapsed={setSideMenuCollapsed} />
        <ContentLayout sideMenuCollapsed={sideMenuCollapsed}>
          <DashboardContent>{children}</DashboardContent>
          <Footer>
            {COMPANY_NAME} ©{new Date().getFullYear()}
          </Footer>
        </ContentLayout>
      </DashboardLayout>
    </ErrorBoundary>
  )
}

export default LayoutComponent
