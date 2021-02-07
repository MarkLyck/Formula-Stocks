import React from 'react'
import { ErrorPage } from './index'

export default {
  title: 'ui-components/error',
  component: ErrorPage,
}

export const error_page = (args: any) => <ErrorPage {...args} />
error_page.args = {
  error: new Error('test Error'),
}
