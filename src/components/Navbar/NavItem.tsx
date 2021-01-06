import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-scroll'

const NavListItem = styled.li`
  margin-right: 16px;
  display: flex;
  height: 100%;

  a {
    font-size: 0.8rem;
    font-weight: 500;
    color: ${(props) => (props.variant === 'light' ? props.theme.colors.primary : 'hsla(0, 0%, 100%, 0.75)')};
    border-bottom: 3px solid transparent;
    padding: 0 8px;
    display: flex;
    align-items: center;
    height: 100%;
    transition: 0.3s;

    &:hover {
      text-decoration: none;
      color: ${(props) => (props.variant === 'light' ? props.theme.colors.primary : 'white')};
      border-bottom: 3px solid ${(props) => (props.variant === 'light' ? props.theme.colors.primary : 'white')};
    }
  }
  @media (max-width: 500px) {
    a {
      font-size: 0.7rem;
    }
  }
`

const NavItem = ({ title, to = '', offset = 0, onClick, variant }) => (
  <NavListItem variant={variant}>
    {to ? (
      <Link to={to} smooth offset={offset}>
        {title}
      </Link>
    ) : (
      <a onClick={onClick}>{title}</a>
    )}
  </NavListItem>
)

export default NavItem
