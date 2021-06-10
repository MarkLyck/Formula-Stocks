import React, { useState } from 'react'
import { Form, Space, Input, Button } from 'antd'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { useMutation } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useBreakpoint from '@w11r/use-breakpoint'

import { LandingPageContainer, Card, Highlight, Alert, ScalingTitle, ScalingSubTitle } from 'src/ui-components'
import { CREATE_NEWSLETTER } from 'src/common/queries'
import { Mixpanel } from 'src/lib/analytics/mixpanel'
import { validateEmail, capitalize } from 'src/common/utils/helpers'

const Content = styled.div`
  padding: 16px;

  .ant-form-inline {
    margin-bottom: 0;
  }
  .ant-form-inline .ant-form-item-with-help {
    margin-bottom: 0;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.medium}) {
    padding-bottom: 0;

    .ant-space-item {
      width: 100%;
    }

    .ant-form-item {
      margin-right: 0;
    }
  }
`

const InputIcon = styled(FontAwesomeIcon)`
  margin-right: 8px;
`

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [executeCreateNewsletter, { data: createData, loading: createLoading, error: createError }] = useMutation(
    CREATE_NEWSLETTER
  )
  const theme = useTheme()
  const { 'isMobile-': isMobileMinus } = useBreakpoint()

  let alreadyOnList = !!createError

  const handleNameInput = (e: any) => {
    e.preventDefault()
    setFirstName(capitalize(e.target.value))
  }

  const handleEmailInput = (e: any) => {
    e.preventDefault()
    setEmail(e.target.value.toLowerCase())
    setEmailError(null)
  }

  const onFinish = () => {
    if (!validateEmail(email)) {
      setEmailError('This email is invalid')
      return
    } else {
      // @ts-ignore
      if (window.$crisp) window.$crisp.push(['set', 'user:email', email])
    }
    if (!firstName) {
      setEmailError('Please add first name')
      return
    }

    executeCreateNewsletter({ variables: { email, firstName } })
    Mixpanel.track('Newsletter Signup', { email })
    Mixpanel.people.set({
      $email: email,
    })

    // @ts-ignore
    if (window && window.fbq) {
      // Facebook pixel tracking
      // @ts-ignore
      window.fbq('track', 'Lead')
    }
  }

  return (
    <LandingPageContainer align="center" marginBottom="4rem">
      <Card>
        <Content>
          <Space direction="vertical" align="center">
            <ScalingTitle>Don't believe us yet? Let us prove it!</ScalingTitle>
            <ScalingSubTitle>
              Join our newsletter, to receive emails with <Highlight>actual results</Highlight> of our investment
              signals (good or bad).
            </ScalingSubTitle>
            {(!createLoading && createData) || alreadyOnList ? (
              <Alert message="Success, you're on the list!" type="success" />
            ) : (
              <Form layout={'inline'} name="newsletter_signup" onFinish={onFinish}>
                <Space direction={isMobileMinus ? 'vertical' : 'horizontal'} style={{ width: '100%' }}>
                  <Form.Item name="firstName" rules={[{ required: true, message: 'Please input your first name' }]}>
                    <Input
                      onChange={handleNameInput}
                      size="large"
                      placeholder="First name"
                      prefix={<InputIcon icon={['fad', 'user']} color={theme.palette.neutral[500]} />}
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    validateStatus={!!emailError ? 'error' : undefined}
                    help={!!emailError ? emailError : undefined}
                    rules={[{ required: true, message: 'Please input your email' }]}
                  >
                    <Input
                      onChange={handleEmailInput}
                      size="large"
                      placeholder="Email address"
                      prefix={<InputIcon icon={['fad', 'envelope']} color={theme.palette.neutral[500]} />}
                    />
                  </Form.Item>
                  <Form.Item shouldUpdate={true}>
                    {() => (
                      <Button block size="large" type="primary" htmlType="submit" loading={createLoading}>
                        Join newsletter
                      </Button>
                    )}
                  </Form.Item>
                </Space>
              </Form>
            )}
          </Space>
        </Content>
      </Card>
    </LandingPageContainer>
  )
}

export default Newsletter
