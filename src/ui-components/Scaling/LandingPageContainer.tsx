import styled from '@emotion/styled'
import { maxSiteWidth } from '~/common/styles'

export const LandingPageContainer = styled.div`
    ${maxSiteWidth}
    align-items: ${(p: any) => p.align ? p.align : 'flex-start'};
`