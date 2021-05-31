import React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props: any) => props.theme.colors.error};
  margin-bottom: 8px;

  svg {
    margin-right: 8px;
    font-size: 1.2rem;
  }
`

export const ErrorMessage = ({ children }: { children: any }) => {
  return (
    <Container>
      <FontAwesomeIcon icon={['fad', 'exclamation-square']} />
      {children}
    </Container>
  )
}
