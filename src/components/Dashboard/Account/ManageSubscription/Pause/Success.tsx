import React from 'react'
import styled from '@emotion/styled'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Typography, Button } from 'antd'
// import { SmallTitle } from '~/ui-components/Modal/styles'
const { Paragraph, Title } = Typography

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    margin: 16px 0;
    color: ${(props: any) => props.theme.colors.scale.perfect};
    font-size: 2rem;
  }
`

export interface PauseSuccessType {
  onModalDismiss: () => void
  date: Date
}

const Success = ({ onModalDismiss, date }: PauseSuccessType) => (
  <Container>
    <FontAwesomeIcon icon={['fad', 'hourglass-start']} />
    <Title level={5}>Success! Your subscription is on pause until: {format(date, 'MMM do, yyyy')}</Title>
    <Paragraph>If at any point you want to resume your subscription early</Paragraph>
    <Paragraph>please contact our support team.</Paragraph>
    <Button onClick={onModalDismiss}>Return to My Account</Button>
  </Container>
)

export default Success
