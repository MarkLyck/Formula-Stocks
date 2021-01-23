import React from 'react'
import { InputNumber, Button } from 'antd'
import styled from '@emotion/styled'

const StyledInputNumber = styled(InputNumber)`
  border-radius: 0;
  border-left: 0;
  border-right: 0;
`

const MinusButton = styled(Button)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`

const PlusButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`

interface PlusMinusInputProps {
  onChange: (value: number) => void
  value: number
  step?: number
  min?: number
  [key: string]: any
}

export const PlusMinusInput = ({ value, min, onChange, step = 1, ...props }: PlusMinusInputProps) => {
  const subtract = () => {
    onChange(value - step)
  }

  const add = () => {
    onChange(value + step)
  }

  const handleChange = (value: number) => {
    // @ts-ignore
    if (isNaN(min) || value >= min) {
      onChange(value)
    }
  }

  return (
    <div>
      {/* @ts-ignore */}
      <MinusButton onClick={subtract} disabled={!isNaN(min) && value - step < min}>
        -
      </MinusButton>
      {/* @ts-ignore */}
      <StyledInputNumber value={value} onChange={handleChange} {...props} min={min} />
      <PlusButton onClick={add}>+</PlusButton>
    </div>
  )
}
