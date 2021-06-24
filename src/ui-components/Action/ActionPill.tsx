import React from 'react'
import styled from '@emotion/styled'
import Ticker from 'src/ui-components/Stock/Ticker'

const Container = styled.div`
  display: flex;
`

const Action = styled.div`
  background-color: ${(p: any) => p.theme.palette[p.action === 'BUY' ? 'primary' : 'success'][600]};
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  display: flex;
  align-items: center;
  font-weight: bold;
`

const StyledTicker = styled(Ticker)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`

type ActionProps = {
  action: 'SELL' | 'BUY'
  ticker: string
}

export const ActionPill = ({ action, ticker }: ActionProps) => {
  return (
    <Container>
      {/* @ts-ignore */}
      <Action action={action}>{action}</Action>
      <StyledTicker ticker={ticker} />
    </Container>
  )
}
