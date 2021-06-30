import React from 'react'
import { Layout } from 'antd'
import styled from '@emotion/styled'
import isPropValid from '@emotion/is-prop-valid'
import { useLocalStorageState, useToggle } from 'ahooks'
import { ErrorBoundary } from 'react-error-boundary'
import useBreakpoint from '@w11r/use-breakpoint'

import { COMPANY_NAME } from 'src/common/constants'
import { ErrorFallback } from 'src/ui-components'
import { resetApplication } from 'src/common/utils'
import ResponsiveSideMenu from './ResponsiveSideMenu'
import SideMenu from './SideMenu'
import Navbar from './Navbar'

const { Content, Footer } = Layout

const DashboardLayout = styled(Layout)`
  min-height: 100vh;
`
const ContentLayout = styled(Layout, {
  shouldForwardProp: isPropValid,
})`
  margin-left: ${(p: any) => p.marginLeft};
  width: ${(p: any) => p.width};
  transition: all 0.2s;
`

const DashboardContent = styled(Content)`
  margin: 32px;
`

const DashboardFooter = styled(Footer)`
  text-align: center;
  padding-top: 0;
`

export type LayoutProps = {
  children: React.ReactNode
}

const LayoutComponent = ({ children }: LayoutProps) => {
  const [sideMenuCollapsed, setSideMenuCollapsed] = useLocalStorageState('side-menu-collapsed', false)
  const [sideMenuIsVisible, { toggle: toggleSideMenu }] = useToggle()
  const { 'isTablet+': isTabletPlus } = useBreakpoint()

  let width = '100%'
  let marginLeft = '0px'

  // istanbul ignore next
  if (isTabletPlus) {
    width = sideMenuCollapsed ? '100vw - 8px' : '100vw - 200px'
    marginLeft = sideMenuCollapsed ? '80px' : '200px'
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={resetApplication}>
      <DashboardLayout>
        {isTabletPlus ? (
          <SideMenu
            collapsed={!!sideMenuCollapsed}
            // @ts-ignore
            setCollapsed={setSideMenuCollapsed}
            onLinkClick={() => toggleSideMenu(false)}
          />
        ) : (
          <ResponsiveSideMenu
            collapsed={!!sideMenuCollapsed}
            // @ts-ignore
            setCollapsed={setSideMenuCollapsed}
            sideMenuIsVisible={sideMenuIsVisible}
            onClose={() => toggleSideMenu(false)}
            onLinkClick={() => toggleSideMenu(false)}
          />
        )}
        {/* @ts-ignore */}
        <ContentLayout width={width} marginLeft={marginLeft}>
          {!isTabletPlus && <Navbar toggleSideMenu={/* istanbul ignore next */ () => toggleSideMenu()} />}
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
