import React from 'react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'

const Button = styled.button`
    outline: none;
    border-radius: 4px;
    background-color: ${(p: { theme: any; status: string }) => p.theme.palette[p.status][500]};
    border: 4px solid transparent;
    color: #fff;
    font-size: 0.8rem;
    font-weight: 600;
    box-shadow: 0 4px 16px 0 ${(p: { theme: any; status: string }) => transparentize(0.5, p.theme.palette[p.status][500])};
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

`

//#4169e1;
export const ActionButton = ({ status = 'primary', children }: any) => (
    // @ts-ignore
    <Button status={status}>
        {children}
    </Button>
)

