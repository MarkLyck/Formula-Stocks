import styled from '@emotion/styled'
import { Typography } from 'antd'

const { Title, Paragraph } = Typography

export * from './LandingPageContainer'

export const ScalingTitle = styled(Title)`
&& { 
    font-size: 2.8vw;
}
`
export const ScalingParagraph = styled(Paragraph)`
&& {

    font-size: 1.2vw;
}
`