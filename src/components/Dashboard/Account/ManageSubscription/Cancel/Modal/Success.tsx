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
    color: ${(props: any) => props.theme.colors.scale.perfect};
    font-size: 2rem;
  }
`
const Success = ({ cancelReason, onModalDismiss }: { cancelReason: string; onModalDismiss: () => void }) => (
  <Container>
    <FontAwesomeIcon icon={['fas', 'tags']} />
    <Title>Your subscription is cancelled</Title>
    <Paragraph>
      If you bought any of our signals, we strongly recommend you hold onto them until we send out our SELL signals for
      them.
    </Paragraph>
    <Paragraph>
      We publish all of our SELL signals publicly, so you can always check back to our home page to see what we ended up
      selling that stock pick for.
    </Paragraph>
    <Paragraph>From the team at Weekly Stocktip, we wish you good luck in your future investment endeavors!</Paragraph>
    <Button onClick={onModalDismiss}>Return to My Account</Button>
  </Container>
)

export default Success
