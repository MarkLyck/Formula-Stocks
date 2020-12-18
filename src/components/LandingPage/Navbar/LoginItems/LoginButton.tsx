import React from 'react'
import styled from '@emotion/styled'
import { Button } from '~/ui-components'

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

const LoginButton = (props: any) => (
    <StyledButton appearance="ghost" {...props}>
        Login
    </StyledButton>
)

export default LoginButton
