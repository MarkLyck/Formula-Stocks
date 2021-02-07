import React from 'react'
import { Button } from 'antd'
import { ButtonIcon } from 'src/ui-components'

export const RetryButton = ({ children, ...props }: any) => {
  return (
    <Button icon={<ButtonIcon icon={['far', 'redo']} />} {...props}>
      {children ? children : 'Retry'}
    </Button>
  )
}
