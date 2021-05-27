import React from 'react'
import styled from '@emotion/styled'
import { Typography } from 'antd'
const { Paragraph, Text } = Typography

const StyledParagraph = styled(Paragraph)`
  color: ${(p) => p.theme.palette.text[200]};
  font-size: 1.2rem;
  max-width: 32vw;

  @media (max-width: ${(p) => p.theme.breakpoints.large}) {
    max-width: 42vw;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.small}) {
    max-width: 100%;
  }
`

type DescriptionProps = {
  statistics: any
}

const Description = ({ statistics }: DescriptionProps) => {
  return (
    <StyledParagraph>
      Our strategy finds and invests in wonderful growing companies selling for less than they should be worth.
      <br />
      <br />
      <Text strong>+{statistics?.winLossRatio?.toFixed(2) || '90.00'}%</Text> of these Warren Buffett style investments
      have been sold with a profit.
    </StyledParagraph>
  )
}

export default Description
