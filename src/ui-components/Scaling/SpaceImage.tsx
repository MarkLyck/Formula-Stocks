import React from 'react'
import styled from '@emotion/styled'

const StyledImage = styled.img`
  width: 100%;
  max-width: 50%;

  @media (max-width: ${(p) => p.theme.breakpoints.small}) {
    max-width: 100%;
    margin: 16px 0;
  }
`

export const SpaceImage = (args: any) => <StyledImage {...args} />
