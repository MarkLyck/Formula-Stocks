import React from 'react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { Button, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, ButtonIcon } from 'src/ui-components'
import { ErrorHeader, ErrorText } from './styles'

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px;

  svg {
    color: ${(p) => p.theme.palette.warning[500]};
    font-size: 32px;
  }

  button {
    svg {
      color: inherit;
      font-size: 12px;
    }
  }
`

const PermissionError = () => {
  const router = useRouter()
  let title = `Looks like your subscription is inactive`
  let text = 'You can re-subscribe or update your payment details on the account page'
  let buttonText = 'My Account'

  const goToAccount = () => {
    router.push('/dashboard/account')
  }

  return (
    <Container>
      <Space direction="vertical" align="center" size="middle" style={{ width: '100%' }}>
        <FontAwesomeIcon icon={['fad', 'exclamation-triangle']} />
        <ErrorHeader>{title}</ErrorHeader>
        <ErrorText>{text}</ErrorText>
        <Button onClick={goToAccount} icon={<ButtonIcon icon={['far', 'user']} />}>
          {buttonText}
        </Button>
      </Space>
    </Container>
  )
}

export default PermissionError
