import React from 'react'
import Newsletter from './index'
import { CREATE_NEWSLETTER } from '~/common/queries'

export default {
  title: 'Landing page/newsletter',
  component: Newsletter,
  parameters: {
    layout: 'centered',
  },
}

export const newsletter = () => <Newsletter />

newsletter.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: CREATE_NEWSLETTER,
        },
        result: {
          data: {},
        },
      },
    ],
  },
}
