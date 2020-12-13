import '@emotion/react'

declare module '@emotion/react' {
    export interface Theme {
        palette: {
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
        }
    }
}