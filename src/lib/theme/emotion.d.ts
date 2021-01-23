import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      white: string
      black: string
    }
    palette: {
      text: {
        [key: string]: string
      }
      basic: {
        [key: string]: string
      }
      primary: {
        [key: string]: string
      }
      success: {
        [key: string]: string
      }
      info: {
        [key: string]: string
      }
      warning: {
        [key: string]: string
      }
      danger: {
        [key: string]: string
      }
      icon_colors: {
        pink: string
      }
      scale: {
        perfect: string
        good: string
        average: string
        bad: string
        worst: string
      }
      border: string
    }
    breakpoints: {
      extraSmall: string
      small: string
      medium: string
      large: string
      extraLarge: string
      values: {
        extraSmall: number
        small: number
        medium: number
        large: number
        extraLarge: number
      }
    }
  }
}
