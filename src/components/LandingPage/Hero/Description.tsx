import React from 'react'
import styled from '@emotion/styled'
import { WIN_RATIO } from '~/common/constants'

const Text = styled.p`
    font-weight: 400;
    font-size: 1.2vw;
    line-height: 1.8vw;
    color: ${(p) => p.theme.palette.text[200]};
    max-width: 28vw;
`

const Description = () => (
    <Text>
        Our strategy invests in high quality companies selling for much less than they should be worth.
        <br />
        <br />
        <strong>+{WIN_RATIO}%</strong> of these investments have been sold with a profit.
    </Text>
)

export default Description
