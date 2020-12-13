import React from 'react'
import styled from '@emotion/styled'
import { Button } from '~/ui-components'

// const StyledButton = styled(Button)`

// `

const LogoutButton = (props: any) => (
    <Button appearance="ghost" status="danger" {...props}>
        Log out
    </Button>
)

export default LogoutButton
