import React from 'react'
import styled from '@emotion/styled'

const H1 = styled.h1`
    font-size: 2vw;
    font-weight: bold;
    line-height: 2.8vw;
`

const Highlight = styled.span`
    font-weight: 900;
    color: ${(p) => p.theme.palette.primary[500]};
    font-size: 3.5vw;
    margin-left: -1%;
`


const Title = () => (
    <H1>
        <Highlight>Value investing</Highlight>
        <br />
        With an unfair advantage
    </H1>
)

export default Title
