import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'

const slideIn = keyframes`
  0% {
      transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`

const expandedMenu = css`
  button {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    svg {
      font-size: 1.4rem;
    }
    h4 {
      position: absolute;
      left: calc(50px + 8px);
      top: 50%;
      transform: translateY(-50%);
      text-align: left;
      margin: 0;
      font-size: 1rem;
      font-weight: 500;
    }
  }
`

export const MenuList = styled.ul`
  padding: 0;
  margin: 0;
  background: ${(props: any) => props.theme.palette.sideMenuColor};
  border-right: 1px solid #eeeff3;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`
