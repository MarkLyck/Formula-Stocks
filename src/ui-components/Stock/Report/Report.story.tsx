import React from 'react'
import styled from '@emotion/styled'
import Report, { ReportType } from '~/ui-components/Stock/Report'
import mockReport from '~/../tests/mocks/report'

const Container = styled.div`
  padding: 32px;
`

export default {
  title: 'ui components/report',
  decorators: [],
  component: Report,
}

export const report = (args: ReportType) => {
  return (
    <Container>
      <Report price={mockReport.price} scores={mockReport.scores} {...args} />
    </Container>
  )
}

report.story = {
  parameters: {
    // wait for animations to finish.
    chromatic: { delay: 500 },
  },
}
