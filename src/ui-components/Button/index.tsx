import React from 'react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import theme from '../../lib/theme'

export * from './NavItem'
export * from './ActionButton'
export * from './ButtonIcon'
export * from './RetryButton'
export * from './SupportButton'

export interface ButtonProps {
  appearance?: 'filled' | 'outline' | 'ghost'
  status?: 'neutral' | 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control'
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'giant'
  onClick?: () => void
  children: any
  disabled?: boolean
  accessoryLeft?: any
  accessoryRight?: any
}

export const getButtonFontSize = (size: string) => {
  if (size === 'tiny') return '12px'
  if (size === 'small') return '16px'
  if (size === 'medium') return '16px'
  if (size === 'large') return '20px'
  if (size === 'giant') return '24px'
}

export const getButtonPadding = (size: string) => {
  if (size === 'tiny') return '6px 12px'
  if (size === 'small') return '8px 16px'
  if (size === 'medium') return '12px 20px'
  if (size === 'large') return '14px 20px'
  if (size === 'giant') return '16px 24px'
}

const FilledButton = styled.button`
  background-color: ${(p: any) => theme.palette[p.status][500]};
  color: white;
  border: 2px solid transparent;
  font-weight: bold;
  padding: ${(p: any) => getButtonPadding(p.size)};
  font-size: ${(p: any) => getButtonFontSize(p.size)};
  border-radius: 4px;
  outline: none;

  &:hover {
    cursor: pointer;
    background-color: ${(p: any) => theme.palette[p.status][400]};
  }

  &:active {
    background-color: ${(p: any) => theme.palette[p.status][600]};
  }

  &:focus {
    background-color: ${(p: any) => theme.palette[p.status][600]};
    border: 2px solid ${(p: any) => theme.palette[p.status][700]};
    box-shadow: 0 0 0 2pt rgba(143, 155, 179, 0.16);
  }

  &:disabled {
    background-color: ${transparentize(1 - 0.16, theme.palette.neutral[500])};
    color: ${theme.palette.neutral[600]};
    cursor: not-allowed;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.medium}) {
    padding: 4px 12px;
    font-size: 14px;
  }
`

const OutlineButton = styled.button`
  background-color: white;
  color: ${(p: any) => theme.palette[p.status][500]};
  font-weight: bold;
  padding: ${(p: any) => getButtonPadding(p.size)};
  font-size: ${(p: any) => getButtonFontSize(p.size)};
  border: 2px solid ${(p: any) => theme.palette[p.status][500]};
  border-radius: 4px;
  outline: none;

  &:hover {
    cursor: pointer;
    background-color: ${(p: any) => transparentize(1 - 0.08, theme.palette[p.status][500])};
  }

  &:active {
    background-color: ${(p: any) => transparentize(1 - 0.16, theme.palette[p.status][500])};
  }

  &:focus {
    background-color: ${(p: any) => transparentize(1 - 0.16, theme.palette[p.status][500])};
    box-shadow: 0 0 0 2pt rgba(143, 155, 179, 0.16);
  }

  &:disabled {
    background-color: ${transparentize(1 - 0.16, theme.palette.neutral[500])};
    border: 2px solid ${transparentize(1 - 0.24, theme.palette.neutral[500])};
    color: ${theme.palette.neutral[600]};
    cursor: not-allowed;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.medium}) {
    padding: 4px 12px;
    font-size: 14px;
  }
`

const GhostButton = styled.button`
  background-color: transparent;
  color: ${(p: any) => theme.palette[p.status][500]};
  font-weight: bold;
  padding: ${(p: any) => getButtonPadding(p.size)};
  font-size: ${(p: any) => getButtonFontSize(p.size)};
  border: 2px solid transparent;
  border-radius: 4px;
  outline: none;

  &:hover {
    cursor: pointer;
    background-color: ${(p: any) => transparentize(1 - 0.08, theme.palette[p.status][500])};
  }

  &:active {
    background-color: ${(p: any) => transparentize(1 - 0.16, theme.palette[p.status][500])};
  }

  &:focus {
    background-color: ${(p: any) => transparentize(1 - 0.16, theme.palette[p.status][500])};
    box-shadow: 0 0 0 2pt rgba(143, 155, 179, 0.16);
  }

  &:disabled {
    background-color: ${transparentize(1 - 0.16, theme.palette.neutral[500])};
    border: 2px solid ${transparentize(1 - 0.24, theme.palette.neutral[500])};
    color: ${theme.palette.neutral[600]};
    cursor: not-allowed;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.medium}) {
    padding: 4px 12px;
    font-size: 14px;
  }
`

export const Button = ({
  children,
  appearance = 'filled',
  status = 'primary',
  size = 'small',
  disabled,
  ...props
}: ButtonProps) => {
  if (appearance === 'outline') {
    return (
      // @ts-ignore
      <OutlineButton size={size} status={status} disabled={disabled} {...props}>
        {children}
      </OutlineButton>
    )
  }

  if (appearance === 'ghost') {
    return (
      // @ts-ignore
      <GhostButton size={size} status={status} disabled={disabled} {...props}>
        {children}
      </GhostButton>
    )
  }

  return (
    // @ts-ignore
    <FilledButton size={size} status={status} disabled={disabled} {...props}>
      {children}
    </FilledButton>
  )
}
