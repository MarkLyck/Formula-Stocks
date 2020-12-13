import Link from 'next/link'
import styled from '@emotion/styled'
import { Button } from 'antd'

const Blah = styled.a`
  color: ${p => p.theme.palette.primary[500]};
`

const Test = () => (
  <>
    <Button type="primary">Primary Button</Button>
    {/* <Link href="/">
      <Blah>Home</Blah>
    </Link> */}
  </>
)

export default Test