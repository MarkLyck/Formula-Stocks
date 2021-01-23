import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useMutation } from '@apollo/client'
import { Form, Input, Button } from 'antd'
import Router from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Mixpanel } from '~/lib/analytics/mixpanel'
import { hasStorage, isBrowser } from '~/common/utils/featureTests'
import { validateEmail } from '~/common/utils/helpers'
import { USER_LOGIN } from '~/common/queries'
import { Alert } from '~/ui-components'

const StyledForm = styled(Form)`
  svg {
    margin-right: 8px;
  }

  .ant-input-affix-wrapper > input.ant-input {
    padding: 6px 2px;
  }

  .ant-input-affix-wrapper-focused {
    svg {
      color: ${(props: any) => props.theme.palette.primary[500]};
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 25px 2px;
  }
`

const StyledAlert = styled(Alert)`
  margin-bottom: 16px;
  width: 100%;
`

const SuccessAlert = styled(Alert)`
  padding: 14px;
  width: 100%;
  justify-content: center;
`

const validateMessages = {
  required: 'Please input your email',
  types: {
    email: 'This is not a valid email',
  },
}

const LoginForm = () => {
  const [userLogin, { loading }] = useMutation(USER_LOGIN)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  console.log('success', success)

  const handleLogin = ({ email, password }: { email: string; password: string }) => {
    if (!validateEmail(email)) {
      setErrorMessage('Email is invalid')
      return
    }

    return userLogin({ variables: { email, password } })
      .then((response: any) => {
        // save authToken & refreshToken
        const { idToken, refreshToken } = response.data.userLogin.auth

        if (hasStorage) {
          localStorage.authToken = idToken
          localStorage.refreshToken = refreshToken
        }
        // @ts-ignore
        if (isBrowser) window.authToken = idToken
        // @ts-ignore
        if (isBrowser) window.refreshToken = refreshToken

        Mixpanel.track('Login Success', { email: email, uniq: btoa(password) })

        setSuccess(true)
        // shortly show the login success message before sending them to portfolio
        setTimeout(() => Router.push('/dashboard'), 100)
      })
      .catch((error: any) => {
        console.info('login error: ', error)
        Mixpanel.track('Login Failed', {
          email: email,
          errorMessage: error.message,
          graphQLError: error.graphQLErrors,
        })

        let errorText = 'Something went wrong, please try again.'
        if (error?.graphQLErrors[0]?.code) {
          if (error.graphQLErrors[0].code === 'ValidationError') {
            if (error.graphQLErrors[0].details.password) {
              Mixpanel.track('Login - Invalid password')
              errorText = error.graphQLErrors[0].details.password
            }
          }
          if (error.graphQLErrors[0].code === 'InvalidTokenError') {
            if (hasStorage) {
              localStorage.removeItem('authToken')
              localStorage.removeItem('refreshToken')
              // @ts-ignore
              if (isBrowser) window.authToken = undefined
              // @ts-ignore
              if (isBrowser) window.refreshToken = undefined
            }
            errorText = 'Please try again'
          }
        }

        console.log('errorText', errorText)

        setErrorMessage(errorText)
      })
  }

  return (
    <StyledForm
      name="basic"
      initialValues={{ remember: true }}
      size="large"
      // @ts-ignore
      onFinish={handleLogin}
      validateMessages={validateMessages}
      validateTrigger="onSubmit"
    >
      {errorMessage && <StyledAlert type="error" message={errorMessage} />}
      <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
        <Input prefix={<FontAwesomeIcon icon={['fad', 'envelope']} />} placeholder="email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        validateTrigger="onChange"
      >
        <Input.Password prefix={<FontAwesomeIcon icon={['fad', 'lock-alt']} />} placeholder="password" />
      </Form.Item>

      <Form.Item>
        {success ? (
          <SuccessAlert type="success" message="successful login" />
        ) : (
          <Button type="primary" htmlType="submit" block loading={loading}>
            Login
          </Button>
        )}
      </Form.Item>
    </StyledForm>
  )
}

export default LoginForm
