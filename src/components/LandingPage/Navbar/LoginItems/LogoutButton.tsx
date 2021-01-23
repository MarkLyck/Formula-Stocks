import React from 'react'
import { Button } from '~/ui-components'

const LogoutButton = (props: any) => (
    <Button appearance="ghost" status="danger" {...props}>
        Log out
    </Button>
)

export default LogoutButton
