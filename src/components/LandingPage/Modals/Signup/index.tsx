import React, { useState } from 'react'
import { Modal } from 'antd'
import dynamic from 'next/dynamic'

import { ModalTitle } from 'src/ui-components'
// import SignupForm from './AccountForm'

const AccountForm = dynamic(() => import('./AccountForm'))

interface SignupModalProps {
  onClose: () => void
  isVisible?: boolean
}

const SignupModal = ({ onClose, isVisible }: SignupModalProps) => {
  const [page, setPage] = useState(1)
  const [, setAccountInfo] = useState(null)

  const handleAccountInfoSubmit = (values: any) => {
    setAccountInfo(values)
    setPage(2)
  }

  return (
    <Modal visible={isVisible} onCancel={onClose} footer={null} centered>
      <ModalTitle>Sign up</ModalTitle>
      {page === 1 && <AccountForm onSubmit={handleAccountInfoSubmit} />}
    </Modal>
  )
}

export default SignupModal
