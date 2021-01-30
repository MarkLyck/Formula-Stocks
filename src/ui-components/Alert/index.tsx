import React from 'react'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface AlertProps {
  message: string
  type?: 'success' | 'info' | 'warning' | 'error'
}

const AlertContainer = styled.div`
  display: inline-flex;
  align-items: center;
  background: ${(p: { color: string; backgroundColor: string }) => p.backgroundColor};
  color: ${(p: { color: string; backgroundColor: string }) => p.color};
  font-size: 1rem;
  padding: 8px 16px;
  border-radius: 4px;

  svg {
    margin-right: 8px;
  }
`

const getColor = (type: 'success' | 'info' | 'warning' | 'error', theme: any) => {
  if (type === 'error') return theme.palette.danger[600]
  if (type === 'warning') return theme.palette.warning[500]
  if (type === 'info') return theme.palette.primary[600]
  if (type === 'success') return theme.palette.success[600]
}

const getBackgroundColor = (type: 'success' | 'info' | 'warning' | 'error', theme: any) => {
  if (type === 'error') return theme.palette.danger[100]
  if (type === 'warning') return theme.palette.warning[100]
  if (type === 'info') return theme.palette.primary[100]
  if (type === 'success') return theme.palette.success[100]
}

const getIcon = (type: 'success' | 'info' | 'warning' | 'error') => {
  if (type === 'error') return 'exclamation-square'
  if (type === 'warning') return 'exclamation-triangle'
  if (type === 'info') return 'info-square'
  if (type === 'success') return 'check-square'
}

export const Alert = ({ message, type = 'info', ...args }: AlertProps) => {
  const theme = useTheme()

  const color = getColor(type, theme)
  const backgroundColor = getBackgroundColor(type, theme)

  return (
    <AlertContainer color={color} backgroundColor={backgroundColor} {...args}>
      {/* @ts-ignore */}
      <FontAwesomeIcon icon={['fad', getIcon(type)]} /> {message}
    </AlertContainer>
  )
}
