import React from 'react'
import styled from '@emotion/styled'
import { Form, Input, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import CountrySelector from './CountrySelector'

const StyledForm = styled(Form)`
  svg {
    margin-right: 8px;
  }

  .ant-input-affix-wrapper > input.ant-input {
    padding: 6px 2px;
  }

  .ant-input-affix-wrapper-focused {
    svg {
      color: ${(props: any) => props.theme.palette.primary[600]};
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 25px 2px;
  }
`

const validateMessages = {
  required: 'Please input your email',
  types: {
    email: 'This is not a valid email',
  },
}

const SignupForm = ({ onSubmit }: any) => (
  <StyledForm
    name="basic"
    initialValues={{ remember: true }}
    size="large"
    // @ts-ignore
    onFinish={onSubmit}
    validateMessages={validateMessages}
    validateTrigger="onSubmit"
  >
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
    <CountrySelector />

    <Form.Item>
      <Button type="primary" htmlType="submit" block>
        Next
      </Button>
    </Form.Item>
  </StyledForm>
)

export default SignupForm
