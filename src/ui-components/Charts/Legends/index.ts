import styled from '@emotion/styled'
import { opacify } from 'polished'

export const Legend = styled.div`
  text-transform: capitalize;
  position: relative;
  margin: 0;
  padding: 0;
  margin: 0 40px 0px 0;
  font-size: 0.75rem;
  margin-right: ${(props: any) => `${props.width || 0}px`};
  &:before {
    content: '';
    position: absolute;
    left: -28px;
    top: 0;
    background: ${(props: any) => opacify(-0.6, props.color)};
    border: 2px solid ${(props: any) => props.color};
    height: 20px;
    width: 20px;
    border-radius: 6px;
  }
  p {
    margin-top: 3px;
  }
`

export const Legends = styled.div`
  position: absolute;
  left: ${(props: any) => props.left || 100}px;
  top: ${(props: any) => props.top || 24}px;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  z-index: 9;
  display: flex;
  align-items: center;
  flex-direction: ${(props: any) => (props.horizontal ? 'row' : 'column')};
`
