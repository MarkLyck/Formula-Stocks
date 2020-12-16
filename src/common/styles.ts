import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const maxSiteWidth = (_props: any) => css`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  margin: 0 auto;
  padding: 0 8%;
  box-sizing: border-box;
`
// max-width: calc(1280px + 32px);


export const Bold = styled.span`
  font-weight: bold;
`
export const Underline = styled.span`
  text-decoration: underline;
`
