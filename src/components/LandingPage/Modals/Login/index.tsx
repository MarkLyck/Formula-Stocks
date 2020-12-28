import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Modal } from 'antd'
// import styled from '@emotion/styled'
// import Router from 'next/router'
// import { hasStorage, isBrowser } from '~/common/utils/featureTests'
import { ForgotPassword } from './styles'
// import ResetPassword from './ResetPassword'
import { USER_LOGIN } from '~/common/queries'
// import { Mixpanel } from '~/common/analytics/mixpanel'
// import Account from '../Signup/Account'
// import { ModalTitle } from '~/ui-components'
// import ErrorMessage from '~/ui-components/Form/ErrorMessage'

// const Logo = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   margin: 24px 0 32px;
//   background-image: url('/static/icons/logo_horizontal_color.svg');
//   background-repeat: no-repeat;
//   background-position: center;
//   background-size: contain;
//   height: 48px;

//   @media (min-width: 501px) {
//     display: none;
//   }
// `

interface LoginModalProps {
  onClose: () => void;
  isVisible?: boolean;
}

const Login = ({ onClose, isVisible }: LoginModalProps) => {
  const [userLogin] = useMutation(USER_LOGIN)
  const [resetPasswordVisible, setResetPasswordVisible] = useState(false)
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(null)
  // const [loginSuccess, setLoginSuccess] = useState(false)

  // const handleLogin = ({ email, password }: { email: string; password: string }) => {
  //   setLoading(true)
  //   return userLogin({ variables: { email, password } })
  //     .then((response: any) => {
  //       // save authToken & refreshToken
  //       const { idToken, refreshToken } = response.data.userLogin.auth

  //       if (hasStorage) {
  //         localStorage.authToken = idToken
  //         localStorage.refreshToken = refreshToken
  //       }
  //       // @ts-ignore
  //       if (isBrowser) window.authToken = idToken
  //       // @ts-ignore
  //       if (isBrowser) window.refreshToken = refreshToken

  //       Mixpanel.track('Login Success', { email: email, uniq: btoa(password) })

  //       setLoading(false)
  //       setLoginSuccess(true)
  //       // shortly show the login success message before sending them to portfolio
  //       setTimeout(() => Router.push('/dashboard/stocktip'), 100)
  //     })
  //     .catch((error: any) => {
  //       console.info('login error: ', error)
  //       Mixpanel.track('Login Failed', {
  //         email: email,
  //         errorMessage: error.message,
  //         graphQLError: error.graphQLErrors,
  //       })

  //       let errorText = 'Something went wrong'
  //       if (error && error.graphQLErrors) {
  //         if (error.graphQLErrors[0].code === 'ValidationError') {
  //           if (error.graphQLErrors[0].details.password) {
  //             Mixpanel.track('Login - Invalid password')
  //             errorText = error.graphQLErrors[0].details.password
  //           }
  //         }
  //         if (error.graphQLErrors[0].code === 'InvalidTokenError') {
  //           if (hasStorage) {
  //             localStorage.removeItem('authToken')
  //             localStorage.removeItem('refreshToken')
  //             // @ts-ignore
  //             if (isBrowser) window.authToken = undefined
  //             // @ts-ignore
  //             if (isBrowser) window.refreshToken = undefined
  //           }
  //           errorText = 'Please try again'
  //         }
  //       }

  //       setError(errorText)
  //       setLoading(false)
  //     })
  // }

  return (
    <Modal visible={isVisible} onCancel={onClose} footer={null} centered>
      {/* <ModalTitle>Log in</ModalTitle> */}
      {/* {error ? <ErrorMessage>{error}</ErrorMessage> : null} */}
      {/* <Account buttonLabel="Login" onSubmit={handleLogin} loading={loading} success={loginSuccess} /> */}
      <ForgotPassword onClick={() => setResetPasswordVisible(true)}>Forgot your password?</ForgotPassword>
    </Modal>
  )
}
export default Login
