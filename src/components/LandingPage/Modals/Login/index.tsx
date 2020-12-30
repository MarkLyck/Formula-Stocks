import React from 'react'
import styled from '@emotion/styled'
import { Modal } from 'antd'
import { ModalTitle } from '~/ui-components'
import LoginForm from './LoginForm'

const ForgotPassword = styled.a`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  font-size: 0.8rem;
`

interface LoginModalProps {
  onClose: () => void;
  isVisible?: boolean;
}

const LoginModal = ({ onClose, isVisible }: LoginModalProps) => (
  <Modal visible={isVisible} onCancel={onClose} footer={null} centered>
    <ModalTitle>Log in</ModalTitle>
    <LoginForm />
    <ForgotPassword onClick={() => { }}>Forgot your password?</ForgotPassword>
  </Modal>
)

export default LoginModal
