import Link from 'next/link'
import styled from '@emotion/styled'

const Blah = styled.a`
  color: ${p => p.theme.palette.primary[500]};
`

const Test = () => (
  <Link href="/">
    <Blah>Home</Blah>
  </Link>
)

export default Test