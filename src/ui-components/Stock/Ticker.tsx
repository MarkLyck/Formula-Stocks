import React from 'react'
import styled from '@emotion/styled'
import { Tooltip, Typography } from 'antd'
import copy from 'copy-to-clipboard'

const { Text } = Typography

export const Container = styled.div`
  background: ${(p: any) => p.theme.palette.neutral[300]};
  color: ${(p: any) => p.theme.palette.text[500]};
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 4px;
  font-weight: 400;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s;

  &:hover {
    background: ${(p: any) => p.theme.palette.neutral[500]};
    cursor: pointer;
  }

  @media (max-width: 940px) {s
    margin-left: 8px;
    font-size: 0.7rem;
  }
`

interface TickerType {
  ticker: string
}

const Ticker = ({ ticker }: TickerType) => {
  const formattedTicker = ticker.replace('_', '.')

  const handleClick = () => {
    copy(formattedTicker)
  }

  return (
    <Tooltip title={'copied'} trigger="click">
      <Container onClick={handleClick}>
        <Text>{formattedTicker}</Text>
      </Container>
    </Tooltip>
  )
}

export default Ticker
