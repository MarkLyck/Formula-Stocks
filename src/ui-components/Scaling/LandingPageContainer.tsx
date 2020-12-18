import styled from '@emotion/styled'
import { maxSiteWidth } from '~/common/styles'

interface LandingPageContainerProps {
    align?: string
    marginBottom?: string
}

export const LandingPageContainer = styled.div`
    ${maxSiteWidth}
    position: relative;
    align-items: ${(p: LandingPageContainerProps) => p.align ? p.align : 'flex-start'};
    margin-bottom: ${(p: LandingPageContainerProps) => p.marginBottom ? p.marginBottom : '0'};
    text-align: ${(p: LandingPageContainerProps) => p.align ? p.align : ''};
`