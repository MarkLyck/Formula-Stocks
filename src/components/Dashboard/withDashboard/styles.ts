import styled from '@emotion/styled'
import { Alert } from 'antd'

export const DashboardLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${(props: any) => props.theme.colors.dbBackground};
`

export const DashboardBeside = styled.div`
  display: flex;
  height: 100%;
`

export const DashboardContent = styled.div`
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  padding: 32px;
  background: ${(props: any) => props.theme.palette.dashboard_background};
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  position: relative;

  @media (max-width: 600px) {
    padding: 16px;
  }
`

export const StyledAlert = styled(Alert)`
  margin-bottom: 20px;
`
