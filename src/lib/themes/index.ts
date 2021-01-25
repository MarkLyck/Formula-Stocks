import light from './light'
import dark from './dark'

export type themeNameType = 'light' | 'dark'

export const antDThemeMap = {
  light: `${process.env.PUBLIC_URL}/antd/light-theme.css`,
  dark: `${process.env.PUBLIC_URL}/antd/dark-theme.css`,
}

const themes = {
  light,
  dark,
}

export default themes
