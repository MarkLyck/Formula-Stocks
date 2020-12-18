import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

export * from './FeatureCard'

export const cardStyle = () => css`
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 4px;
    border: 1px solid #ebedf5;
    box-shadow: 0 4px 14px 0 rgba(111, 120, 156, 0.08);
    box-sizing: border-box;
    padding: 16px;
`

export const CardTitle = styled.h3`
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 16px;
  color: ${(p: any) => p.theme.palette.text[500]};
`

const Container = styled.div`
    ${cardStyle}
    padding: ${(p: any) => p.padding ? p.padding : ''};
`

export interface CardProps {
    children: any;
    style: any;
}

export const Card = ({ children, ...args }: CardProps) => (
    <Container {...args}>
        { children}
    </Container >
)
