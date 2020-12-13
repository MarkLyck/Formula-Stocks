import React from 'react'
import styled from '@emotion/styled'

export * from './FeatureCard'

const Container = styled.div`
    background: white;
    border-radius: 4px;
    border: 1px solid #ebedf5;
    box-shadow: 0 4px 14px 0 rgba(111, 120, 156, 0.08);
    box-sizing: border-box;
    padding: 16px;
`

export interface CardProps {
    children: any
}

export const Card = ({ children }: CardProps) => (
    <Container>
        {children}
    </Container>
)
