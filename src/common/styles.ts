import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const maxSiteWidth = (_props: any) => css`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: calc(1280px + 32px);
  margin: 0 auto;
  padding: 0 32px;
  box-sizing: border-box;
`

export const Bold = styled.span`
  font-weight: bold;
`
export const Underline = styled.span`
  text-decoration: underline;
`
