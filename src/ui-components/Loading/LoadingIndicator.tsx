import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import theme from '~/lib/theme'

export const LoadingIndicator = ({ color = theme.palette.primary[500], ...args }: any) => (
  <FontAwesomeIcon icon="spinner-third" spin color={color} {...args} />
)


