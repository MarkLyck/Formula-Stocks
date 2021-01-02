import React from 'react'
import styled from '@emotion/styled'
import { Typography } from 'antd';
const { Title, Text } = Typography;

const StyledTitle = styled(Title)`
&& {
    font-size: 2rem;

    @media(max-width: ${p => p.theme.breakpoints.medium}) {
        font-size: 3vw;
    }

    @media(max-width: ${p => p.theme.breakpoints.small}) {
        font-size: 1.8rem;
    }
}
`

// const H1 = styled.h1`
//     font-size: 2vw;
//     font-weight: bold;
//     line-height: 2.8vw;

//     @media(max-width: ${p => p.theme.breakpoints.medium}) {
//         font-size: 2.4vw;
//         line-height: 4vw;
//     }

//     @media(max-width: ${p => p.theme.breakpoints.small}) {
//         font-size: 3vw;
//         line-height: 5vw;
//     }

//     @media(max-width: ${p => p.theme.breakpoints.extraSmall}) {
//         font-size: 4vw;
//         line-height: 6vw;
//     }
// `

const Highlight = styled(Text)`
    font-weight: 900;
    color: ${(p) => p.theme.palette.primary[500]};
    font-size: 3.5rem;

    @media(max-width: ${p => p.theme.breakpoints.medium}) {
        font-size: 4vw;
    }

    @media(max-width: ${p => p.theme.breakpoints.small}) {
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
