import React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Icon = styled(FontAwesomeIcon)`
  color: ${(props: any) => props.theme.colors.primary};
  margin-bottom: 16px;
`

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
  font-size: 1.2rem;
`

export const GenericLoading = () => (
    <Container>
        <Icon icon="spinner-third" spin size="4x" />
        <LoadingTitle>Loading...</LoadingTitle>
    </Container>
)
