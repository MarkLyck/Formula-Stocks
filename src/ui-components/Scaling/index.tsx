import styled from '@emotion/styled'
import { Typography } from 'antd'

const { Title, Paragraph } = Typography

export * from './LandingPageContainer'

export const ScalingTitle = styled(Title)`
    &&& { 
        font-size: 2.8vw;
        margin-top: 0;
        margin-bottom: 0;
    }
`

export const ScalingSubTitle = styled(Title)`
    &&& { 
        color: ${(p) => p.theme.palette.text[200]};
        font-size: 1.4vw;
        font-weight: 400;
    }
`

export const ScalingParagraph = styled(Paragraph)`
    && {
        font-size: 1.2vw;
    }
`