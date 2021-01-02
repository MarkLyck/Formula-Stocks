import React from 'react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'

interface ActionButtonProps {
    children?: any;
    status?: string;
    color?: string;
    backgroundColor?: string;
    shadowColor?: string;
    theme?: any;
    onClick: () => any;
}

const Button = styled.button`
    outline: none;
    border-radius: 4px;
    background-color: ${(p: ActionButtonProps) => p.backgroundColor ? p.backgroundColor : p.theme.palette[p.status][500]};
    border: 4px solid transparent;
    color: ${(p: ActionButtonProps) => p.color ? p.color : '#fff'};
    font-size: 0.8rem;
    font-weight: 600;
    box-shadow: 0 4px 16px 0 ${(p: ActionButtonProps) => p.shadowColor ? p.shadowColor : transparentize(0.5, p.theme.palette[p.status][500])};
    text-decoration: none;
    text-align: center;
    padding: 12px 20px;
    white-space: nowrap;
    text-align: center;


    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }

    &:focus {
        opacity: 0.8;
    }

    &:active {
        opacity: 0.7;
    }

    @media(max-width: ${p => p.theme.breakpoints.small}) {
        width: 100%;
    }

    @media(max-width: ${p => p.theme.breakpoints.extraSmall}) {
        padding: 8px 12px;
        font-size: 12px;
    }
`

export const ActionButton = ({ status = 'primary', backgroundColor, color, shadowColor, children, ...args }: ActionButtonProps) => (
    // @ts-ignore
    <Button status={status} backgroundColor={backgroundColor} color={color} shadowColor={shadowColor} {...args}>
        {children}
    </Button>
)

