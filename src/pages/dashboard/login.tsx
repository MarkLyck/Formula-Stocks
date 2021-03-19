import React from 'react'
import withDashboard from 'src/components/Dashboard/withDashboard'
import { LoginModal } from 'src/components/LandingPage/Modals'

const DashboardLogin = () => {
  return (
    <div>
      <LoginModal onClose={() => {}} isVisible />
    </div>
  )
}

export default withDashboard(DashboardLogin)
