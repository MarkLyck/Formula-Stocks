import React from 'react'
import styled from '@emotion/styled'

export * from './ActionPill'

const Container = styled.div`
  background-color: ${(p: any) => p.theme.palette[p.action === 'BUY' ? 'primary' : 'success'][600]};
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
`

type ActionProps = {
  action: 'SELL' | 'BUY'
}

export const Action = ({ action }: ActionProps) => {
  return <Container action={action}>{action}</Container>
}
