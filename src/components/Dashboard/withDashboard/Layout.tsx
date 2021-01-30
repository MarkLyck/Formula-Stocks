import React from 'react'
import { Layout } from 'antd'
import styled from '@emotion/styled'
import isPropValid from '@emotion/is-prop-valid'
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
const ContentLayout = styled(Layout, {
  shouldForwardProp: isPropValid,
})`
  margin-left: ${(p: { sideMenuCollapsed?: boolean }) => (p.sideMenuCollapsed ? '80px' : '200px')};
  transition: all 0.2s;
`

const DashboardContent = styled(Content)`
  margin: 32px;
`

const DashboardFooter = styled(Footer)`
  text-align: center;
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
          <DashboardFooter>
            {COMPANY_NAME} ©{new Date().getFullYear()}
          </DashboardFooter>
        </ContentLayout>
      </DashboardLayout>
    </ErrorBoundary>
  )
}

export default LayoutComponent
