import React from 'react'
import { Tag, LoadingIndicator } from 'src/ui-components'
import theme from 'src/lib/theme'

export const LoadingTag = () => (
  <Tag color={theme.palette.text[500]} backgroundColor={theme.palette.neutral[300]}>
    loading <LoadingIndicator style={{ marginLeft: '8px' }} />
  </Tag>
)
