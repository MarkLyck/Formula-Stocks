import styled from '@emotion/styled'
import { Typography } from 'antd'

const { Title, Paragraph } = Typography

export * from './LandingPageContainer'
export * from './SpaceImage'
export * from './Beside'

export const ScalingTitle = styled(Title)`
    text-align: ${(p: { textAlign?: string }) => p.textAlign ? p.textAlign : ''};
    &&& { 
        font-size: 2rem;
        margin-top: 0;
        margin-bottom: 0;
    }
`

export const ScalingSubTitle = styled(Title)`
    &&& { 
        color: ${(p) => p.theme.palette.text[200]};
        font-size: 1.4rem;
        font-weight: 400;
        margin-top: 1rem;
    }
`

export const ScalingParagraph = styled(Paragraph)`
    && {
        font-size: 1.2rem;
    }
`