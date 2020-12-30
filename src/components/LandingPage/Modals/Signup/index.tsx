import React from 'react'
import { Modal } from 'antd'
import { ModalTitle } from '~/ui-components'

interface SignupModalProps {
  onClose: () => void;
  isVisible?: boolean;
}

const SignupModal = ({ onClose, isVisible }: SignupModalProps) => (
  <Modal visible={isVisible} onCancel={onClose} footer={null} centered>
    <ModalTitle>Sign up</ModalTitle>
  </Modal>
)

export default SignupModal
