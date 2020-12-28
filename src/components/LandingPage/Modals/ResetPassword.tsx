import React, { useState } from 'react'
import { Form, Button } from 'antd'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionButton } from '~/ui-components'

interface ResetPasswordModalProps {
  backToLogin?: any;
}

const ResetPasswordModal = ({ backToLogin }: ResetPasswordModalProps) => {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<any>(null)

  const onSubmit = async (values: { email: string }) => {
    setLoading(true)

    // TODO move this to a server-side function.
    const response = await fetch('https://secure.8base.com/dbconnections/change_password', {
      method: 'POST',
      body: JSON.stringify({
        client_id: 'uVfHu5ihD2aJ2I86zdS4KgQ4s7K5iKO1',
        email: values.email,
        connection: 'auth0DB-5dab9152b0bf73f9211c2747', //DB connection name (ask 8base support for this.)
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    setLoading(false)

    if (response.status === 200) {
      setStatus('success')
    } else {
      // TODO add better error handling
      alert('something went wrong, please contact support')
    }
  }

  return (
    <>
      <h2>Reset Password</h2>
      <Form name="reset-password-email" onFinish={onSubmit} size="large">
        <Form.Item
          name="email"
          validateTrigger={['onChange', 'onBlur']}
          rules={[
            { type: 'email', message: 'Not a valid email', validateTrigger: 'onBlur' },
            { required: true, message: 'Please input your email' },
          ]}
        >
          {/* <BigInput
            prefix={<FontAwesomeIcon icon={['fad', 'envelope']} />}
            placeholder="Email"
            autoFocus
            // autoFocus in modal
            ref={(input) => input && input.focus()}
            autoComplete="email"
          /> */}
        </Form.Item>
        <Form.Item>
          {/* @ts-ignore */}
          <ActionButton type="primary" htmlType="submit" block loading={loading} success={status === 'success'}>
            Send password reset email
          </ActionButton>
        </Form.Item>
        <Button type="link" onClick={backToLogin}>
          Back to Login
        </Button>
      </Form>
    </>
  )
}

export default ResetPassword
