import React from 'react'
import styled from '@emotion/styled'
import { lighten } from 'polished'
import theme from 'src/lib/theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tag } from 'src/ui-components'

export const Container = styled.span`
  background: ${(p: any) => lighten(p.backgroundOpacity, p.color ? p.color : p.theme.palette.primary[600])};
  color: ${(p: any) => (p.color ? p.color : p.theme.palette.primary[600])};
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 4px;
  font-weight: 500;
  white-space: nowrap;

  @media (max-width: 940px) {
    margin-left: 8px;
    font-size: 0.7rem;
  }
`

interface ReturnPropsType {
  percentReturn: number
  loading?: boolean
  positiveColor?: string
  negativeColor?: string
}

const Return = ({ percentReturn, loading, positiveColor, negativeColor }: ReturnPropsType) => {
  if (loading) {
    return (
      <Tag>
        <FontAwesomeIcon icon="spinner-third" style={{ fontSize: 12 }} spin /> %
      </Tag>
    )
  }

  const isPositive = percentReturn >= 0

  let color: string = ''
  if (isPositive) {
    color = positiveColor ? positiveColor : theme.palette.scale.perfect
  } else {
    color = negativeColor ? negativeColor : theme.palette.scale.worst
  }

  const backgroundOpacity = isPositive ? 0.5 : 0.34

  return (
    <Tag color={color} backgroundColor={lighten(backgroundOpacity, color)}>
      {isPositive ? '+' : ''}
      {Number(percentReturn).toFixed(2)}%
    </Tag>
  )
}

export default Return
