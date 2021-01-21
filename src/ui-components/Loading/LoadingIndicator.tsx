import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import themes from 'src/lib/themes'

export const LoadingIndicator = ({ color = themes.light.palette.primary[500], ...args }: any) => (
  <FontAwesomeIcon icon="spinner-third" spin color={color} {...args} />
)


