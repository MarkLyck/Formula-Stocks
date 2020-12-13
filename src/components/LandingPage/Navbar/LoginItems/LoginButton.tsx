import React from 'react'
import styled from '@emotion/styled'
import { Button } from '~/ui-components'

const StyledButton = styled(Button)`
    color: ${(p) => p.theme.palette.basic[800]};

    &:hover {
        color: ${(p) => p.theme.palette.primary[500]};
    }
`

const LoginButton = (props: any) => (
    <StyledButton appearance="ghost" {...props}>
        Login
    </StyledButton>
)

export default LoginButton
