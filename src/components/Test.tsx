import Link from 'next/link'

import styled from '@emotion/styled'

const Blah = styled.a`
  color: red;
`

const Test = () => (
  <header>
    <Link href="/">
      <Blah>Home</Blah>
    </Link>
  </header>
)

export default Test