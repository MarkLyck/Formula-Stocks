import { Global, css } from '@emotion/react'

const GlobalStyles = () => (
  <Global
    styles={css`
      body, html {
        padding: 0;
        margin: 0;
      }

      body {
        font-family: Roboto, sans-serif;
      }
    `}
  />
)

export default GlobalStyles