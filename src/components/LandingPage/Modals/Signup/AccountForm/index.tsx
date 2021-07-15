import { useEffect } from 'react'
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

  .ant-select {
    height: 52px !important;
  }
  .ant-select-selector {
    height: 52px !important;
  }
  .ant-select-selection-item > div {
    height: 52px;
    display: flex;
    align-items: center;
  }
  .ant-select-selection-search {
    margin-top: 6px;
    padding-left: 28px;
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

const lookupIP = async () => {
  const response = await fetch('https://extreme-ip-lookup.com/json/')
  const json = await response.json()
  return json
}

const SignupForm = ({ onSubmit }: any) => {
  const [form] = Form.useForm()

  const getCountry = async () => {
    const data = await lookupIP()
    form.setFieldsValue({ country: data.countryCode })
  }

  useEffect(() => {
    getCountry()
  }, [])

  return (
    <StyledForm
      form={form}
      name="account-form"
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

      <Form.Item style={{ marginBottom: 0 }}>
        <Button type="primary" htmlType="submit" block>
          Next
        </Button>
      </Form.Item>
    </StyledForm>
  )
}

export default SignupForm
