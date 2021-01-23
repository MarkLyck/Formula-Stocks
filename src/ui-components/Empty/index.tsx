import React from 'react'
import { Empty as EmptyAntD } from 'antd'
import styled from '@emotion/styled'
import { Card } from '~/ui-components'

export interface EmptyProps {
  label?: string
}

const Container = styled(Card)`
  justify-content: center;
  align-items: center;
`

export const Empty = ({ label = 'No data' }: EmptyProps) => (
  <Container>
    <EmptyAntD image={EmptyAntD.PRESENTED_IMAGE_SIMPLE} description={<span>{label}</span>} />
  </Container>
)
