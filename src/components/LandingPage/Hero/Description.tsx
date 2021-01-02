import React from 'react'
import styled from '@emotion/styled'
import { WIN_RATIO } from '~/common/constants'
import { Typography } from 'antd';
const { Paragraph, Text } = Typography;

const StyledParagraph = styled(Paragraph)`
    color: ${(p) => p.theme.palette.text[200]};
    font-size: 1.2rem;
    max-width: 32vw;

    @media(max-width: ${p => p.theme.breakpoints.large}) {        
        max-width: 42vw;
    }

    @media(max-width: ${p => p.theme.breakpoints.small}) {        
        max-width: 100%;
    }
`

const Description = () => (
    <StyledParagraph>
        Our strategy invests in high quality companies selling for much less than they should be worth.
        <br />
        <br />
        <Text strong>+{WIN_RATIO}%</Text> of these investments have been sold with a profit.
    </StyledParagraph>
)

export default Description
