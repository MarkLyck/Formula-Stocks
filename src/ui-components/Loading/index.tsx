import React from 'react'
import styled from '@emotion/styled'
import { LoadingIndicator } from './LoadingIndicator'

export * from './LoadingIndicator'
export * from './LoadingTag'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height 100%;
    min-height: 400px;
    width: 100%;
`

const LoadingTitle = styled.h2`
  margin-top: 8px;
  font-size: 1.2rem;
`

export const GenericLoading = () => (
  <Container>
    <LoadingIndicator size="4x" />
    <LoadingTitle>Loading...</LoadingTitle>
  </Container>
)
