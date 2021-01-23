import { addDecorator, addParameters } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

// custom decorators
import withStyles from './decorators/withStyles'
import withTheme from './decorators/withTheme'
import withRouter from './decorators/withRouter'
import withJotai from './decorators/withJotai'
// import withWhyDidYouRender from './decorators/withWhyDidYouRender'

// icons
// import '../src/common/utils/fontAwesomeLibrary'

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
})

addDecorator(withJotai)
addDecorator(withStyles)
addDecorator(withTheme)
addDecorator(withRouter)

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  layout: 'fullscreen',
}
