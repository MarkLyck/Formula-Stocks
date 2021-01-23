import React from 'react'
import styled from '@emotion/styled'
import { Tag } from '~/ui-components'

const Container = styled.div`
  padding: 32px;
`

export default {
  title: 'ui components/Tag',
}

export const tag = ({ loading, prefix, value }: any) => (
  <Container>
    <Tag loading={loading} prefix={prefix}>
      {value}
    </Tag>
  </Container>
)