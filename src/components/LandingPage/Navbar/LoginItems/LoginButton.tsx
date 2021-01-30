import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Button } from '~/ui-components'
import { LoginModal } from '~/components/LandingPage/Modals'

const StyledButton = styled(Button)`
  color: ${(p) => p.theme.palette.neutral[100]};
  border: 2px solid ${(p) => p.theme.palette.neutral[100]};

  &:hover {
    background-color: ${(p) => p.theme.palette.neutral[100]};
    border: 2px solid ${(p) => p.theme.palette.neutral[400]};
    color: ${(p) => p.theme.palette.text[500]};
  }

  &:active {
    color: ${(p) => p.theme.palette.primary[600]};
  }
`

const LoginButton = (props: any) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <LoginModal isVisible={isVisible} onClose={() => setIsVisible(false)} />
      <StyledButton appearance="ghost" onClick={() => setIsVisible(true)} {...props}>
        Login
      </StyledButton>
    </>
  )
}

export default LoginButton
