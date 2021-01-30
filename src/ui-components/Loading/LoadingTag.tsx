import React from 'react'
import { Tag, LoadingIndicator } from '~/ui-components'
import theme from '~/lib/theme'

export const LoadingTag = () => (
  <Tag color={theme.palette.text[500]} backgroundColor={theme.palette.neutral[300]}>
    loading <LoadingIndicator style={{ marginLeft: '8px' }} />
  </Tag>
)
