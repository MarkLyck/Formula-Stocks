import React from 'react'
import Report, { ReportType } from '~/ui-components/Stock/Report'
import { REPORT_MOCK } from 'src/tests/mocks'

export default {
  title: 'ui components/report',
  decorators: [],
  component: Report,
}

export const report = (args: ReportType) => <Report {...args} />

report.story = {
  parameters: {
    // wait for animations to finish.
    chromatic: { delay: 500 },
  },
}

report.args = {
  price: REPORT_MOCK.price,
  scores: REPORT_MOCK.scores,
}
