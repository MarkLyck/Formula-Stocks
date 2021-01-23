import React from 'react'
// import Link from 'next/link'
import Router from 'next/router'
import styled from '@emotion/styled'
import { transparentize } from 'polished'

export interface NavItemProps {
    appearance?: 'filled' | 'outline' | 'ghost';
    status?: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control';
    size?: 'tiny' | 'small' | 'medium' | 'large' | 'giant';
    onClick?: () => void;
    children: any;
    href?: string | boolean | null;
    target?: string;
    disabled?: boolean;
    accessoryLeft?: any;
    accessoryRight?: any;
    realLink?: boolean;
}
const getFontSize = (size: string) => {
    if (size === 'tiny') return '12px'
    if (size === 'small') return '16px'
    if (size === 'medium') return '16px'
    if (size === 'large') return '20px'
    if (size === 'giant') return '24px'
}

// const getPadding = (size: string) => {
//     if (size === 'tiny') return '6px 12px'
//     if (size === 'small') return '8px 16px'
//     if (size === 'medium') return '12px 20px'
//     if (size === 'large') return '14px 20px'
//     if (size === 'giant') return '16px 24px'
// }


// const GhostNavLink = styled.a`
//     background-color: ${(p) => transparentize(0.25, p.theme.colors.white)};
//     color: ${(p) => p.theme.palette.basic[800]};
//     font-weight: bold;
//     padding: ${(p: any) => getPadding(p.size)};
//     font-size: ${(p: any) => getFontSize(p.size)};
//     border: 2px solid transparent;
//     border-radius: 4px;
//     outline: none;

//     &:hover {
//         cursor: pointer;
//         background-color: ${(p) => transparentize(1 - 0.08, p.theme.palette.primary[500])};
//     }

//     &:active {
//         background-color: ${(p) => transparentize(1 - 0.16, p.theme.palette.primary[500])};
//     }

//     &:focus {
//         background-color: ${(p) => transparentize(1 - 0.16, p.theme.palette.primary[500])};
//         box-shadow: 0 0 0 2pt rgba(143, 155, 179, 0.16);
//     }

//     &:disabled {
//         background-color: ${p => transparentize(1 - 0.16, p.theme.palette.basic[500])};
//         border: 2px solid ${p => transparentize(1 - 0.24, p.theme.palette.basic[500])};
//         color: ${(p) => p.theme.palette.basic[600]};
//         cursor: not-allowed;
//     }

//     @media(max-width: ${p => p.theme.breakpoints.medium}) {
//         padding: 8px 16px;
//         font-size: 12px;
//     }
// `

const GhostNavButton = styled.button`
    background-color: ${(p) => transparentize(0.25, p.theme.colors.white)};
    color: ${(p) => p.theme.palette.basic[800]};
    font-weight: bold;
    padding: 8px 16px;
    font-size: ${(p: any) => getFontSize(p.size)};
    border: 2px solid transparent;
    border-radius: 4px;
    outline: none;
    
    &:hover {
        cursor: pointer;
        background-color: ${(p) => transparentize(1 - 0.08, p.theme.palette.primary[500])};
    }

    &:active {
        background-color: ${(p) => transparentize(1 - 0.16, p.theme.palette.primary[500])};
    }

    &:focus {
        background-color: ${(p) => transparentize(1 - 0.16, p.theme.palette.primary[500])};
        box-shadow: 0 0 0 2pt rgba(143, 155, 179, 0.16);
    }

    &:disabled {
        background-color: ${p => transparentize(1 - 0.16, p.theme.palette.basic[500])};
        border: 2px solid ${p => transparentize(1 - 0.24, p.theme.palette.basic[500])};
        color: ${(p) => p.theme.palette.basic[600]};
        cursor: not-allowed;
    }

    @media(max-width: ${p => p.theme.breakpoints.medium}) {
        padding: 4px 12px;
        font-size: 14px;
    }
`

export const NavItem = ({ onClick = () => { }, realLink, href, target, children, size = 'medium' }: NavItemProps) => {
    const handleClick = () => {
        if (realLink) {
            // @ts-ignore
            window.open(href, target);
        } else if (href) {
            // @ts-ignore
            Router.push(href)
        } else {
            onClick()
        }
    }

    return (
        // @ts-ignore
        <GhostNavButton onClick={handleClick} size={size}>
            {children}
        </GhostNavButton>
    )
}

