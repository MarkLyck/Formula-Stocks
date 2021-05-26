import React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Typography, Button } from 'antd'
import { Title } from './styles'
const { Paragraph } = Typography

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    margin: 16px 0;
    color: ${(props: any) => props.theme.colors.warning.main};
    font-size: 2rem;
  }
`

const Error = ({ onModalDismiss }: { onModalDismiss: () => void }) => (
  <Container>
    <FontAwesomeIcon icon={['fas', 'exclamation-triangle']} />
    <Title>Something went wrong!</Title>
    <Paragraph>Looks like the network request to cancel your subscription has failed.</Paragraph>
    <Paragraph>Please contact support to cancel your account.</Paragraph>
    <Button onClick={onModalDismiss}>Return to My Account</Button>
  </Container>
)

export default Error
