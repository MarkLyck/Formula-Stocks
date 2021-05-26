import React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Typography, Button } from 'antd'
import { Title, Bold } from './styles'
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

const Discount = ({ onModalDismiss }: { onModalDismiss: () => void }) => {
  return (
    <Container>
      <FontAwesomeIcon icon={['fas', 'tags']} />
      <Title>40% OFF Discount applied successfully!</Title>
      <Paragraph>
        Discounted price for the next 3 months: <Bold>$17.50 / week</Bold>
      </Paragraph>
      <Button onClick={onModalDismiss}>Return to My Account</Button>
    </Container>
  )
}

export default Discount
