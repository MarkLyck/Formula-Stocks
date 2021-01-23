import React from 'react'
import styled from '@emotion/styled'
import { Typography } from 'antd'
const { Title, Text } = Typography

const StyledTitle = styled(Title)`
  && {
    font-size: 2rem;

    @media (max-width: ${(p) => p.theme.breakpoints.medium}) {
      font-size: 3vw;
    }

    @media (max-width: ${(p) => p.theme.breakpoints.small}) {
      font-size: 1.8rem;
    }
  }
`

const Highlight = styled(Text)`
  font-weight: 900;
  color: ${(p) => p.theme.palette.primary[500]};
  font-size: 3.5rem;

  @media (max-width: ${(p) => p.theme.breakpoints.medium}) {
    font-size: 4vw;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.small}) {
    font-size: 2.2rem;
  }
`

const HeroTitle = () => (
  <StyledTitle>
    <Highlight>Value investing</Highlight>
    <br />
    With a technological advantage
  </StyledTitle>
)

export default HeroTitle
