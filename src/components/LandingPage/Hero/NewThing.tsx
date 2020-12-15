import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
    display: flex;
    border-radius: 24px;
    background: #F6F8FE;
    align-items: center;
`

const Text = styled.div`
    font-weight: 500;
    margin-left: 8px;
`

const New = styled.div`
    display: inline-flex;
    border-radius: 24px;
    background: #71E7D7;
    padding: 6px 24px;
    margin: 6px;
    color: white;
    font-weight: bold;
`

const NewThing = () => (
    <Container>
        <New>NEW</New>
        <Text>
            Your personal crypto training bot
            </Text>
    </Container>
)

export default NewThing
