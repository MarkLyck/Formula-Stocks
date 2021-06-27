import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-scroll'

const NavListItem = styled.li`
  margin-right: 16px;
  display: flex;
  a {
    font-size: 0.8rem;
    font-weight: 500;
    color: ${(props: any) =>
      props.variant === 'light' ? props.theme.palette.primary[600] : 'hsla(0, 0%, 100%, 0.75)'};
    border-bottom: 3px solid transparent;
    padding: 32px 10px 16px;
    transition: 0.3s;

    &:hover {
      text-decoration: none;
      color: ${(props: any) => (props.variant === 'light' ? props.theme.palette.primary[600] : 'white')};
      border-bottom: 3px solid
        ${(props: any) => (props.variant === 'light' ? props.theme.palette.primary[600] : 'white')};
    }
  }

  @media (max-width: 500px) {
    a {
      font-size: 0.7rem;
      padding: 32px 10px;
    }
  }
`

const NavItem = ({ title, to = '', href, target, offset = 0, onClick, variant }: any) => (
  // @ts-ignore
  <NavListItem variant={variant}>
    {to ? (
      <Link to={to} smooth offset={offset}>
        {title}
      </Link>
    ) : (
      <a onClick={onClick} href={href} target={target}>
        {title}
      </a>
    )}
  </NavListItem>
)

export default NavItem
