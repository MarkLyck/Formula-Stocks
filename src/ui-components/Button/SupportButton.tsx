import React from 'react'
import { Button } from 'antd'
import { ButtonIcon } from 'src/ui-components'

export const SupportButton = (props: any) => {
  return (
    <Button icon={<ButtonIcon icon={['far', 'envelope']} />} {...props}>
      Contact support
    </Button>
  )
}
