import { addDecorator, addParameters } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { MockedProvider } from '@apollo/client/testing'

// custom decorators
import withStyles from './decorators/withStyles'
import withTheme from './decorators/withTheme'
import withRouter from './decorators/withRouter'

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
})

addDecorator(withStyles)
addDecorator(withTheme)
addDecorator(withRouter)

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  layout: 'fullscreen',
  apolloClient: {
    MockedProvider,
    // any props you want to pass to MockedProvider on every story
  },
}
