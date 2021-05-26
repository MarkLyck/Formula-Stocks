import { Global, css } from '@emotion/react'

const GlobalStyles = () => (
  <Global
    styles={css`
      body,
      html {
        padding: 0;
        margin: 0;
      }

      body {
        font-family: Roboto, sans-serif;
      }

      .ant-progress-inner {
        background-color: #f7f9fc;
      }

      .ant-menu-inline-collapsed-tooltip {
        .ant-tooltip-inner {
          a {
            color: white;
          }
        }
      }
    `}
  />
)

export default GlobalStyles
