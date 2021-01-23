import React from 'react'
import Report, { ReportType } from '~/ui-components/Stock/Report'
import mockReport from 'src/tests/mocks/report'

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
  price: mockReport.price,
  scores: mockReport.scores,
};