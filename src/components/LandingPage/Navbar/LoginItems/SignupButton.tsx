import React, { useState } from 'react'
import { Button } from 'src/ui-components'

const SignupButton = (props: any) => (
    <Button status="success" {...props}>
        Sign up now
    </Button>
)

export default SignupButton
