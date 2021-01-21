import defaultTheme from './default'

const theme: any = {
  ...defaultTheme,
  type: 'dark',
  palette: {
    ...defaultTheme.palette,
    text: {
      0: '#101426',
      100: '#151A30',
      200: '#192038',
      300: '#222B45',
      400: '#2E3A59',
      500: '#8F9BB3',
      600: '#EDF1F7',
      700: '#F7F9FC',
    },
    basic: {
      100: '#000',
      200: '#101426',
      300: '#151A30',
      400: '#192038',
      500: '#222B45',
      600: '#2E3A59',
      700: '#8F9BB3',
      800: '#C5CEE0',
      900: '#E4E9F2',
      1000: '#EDF1F7',
      1100: '#F7F9FC',
      1200: '#FFFFFF',
    },
    border: '#222B45',
  }
}

export default theme
