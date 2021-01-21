import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Button } from 'src/ui-components'
import { LoginModal } from 'src/components/LandingPage/Modals'

const StyledButton = styled(Button)`
    color: ${(p) => p.theme.colors.white};
    border: 2px solid ${(p) => p.theme.colors.white};

    &:hover {
        background-color: ${(p) => p.theme.colors.white};
        border: 2px solid ${(p) => p.theme.palette.basic[400]};
        color: ${p => p.theme.palette.text[500]};
    }

    &:active {
        color: ${p => p.theme.palette.primary[500]};
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
