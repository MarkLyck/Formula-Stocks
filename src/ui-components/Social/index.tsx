import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from '@emotion/styled'

const Container = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => p.theme.palette.basic[200]};
  height: 40px;
  width: 40px;
  border-radius: 4px;
  color: ${(p) => p.theme.palette.text[200]};
  font-size: 16px;
`

export interface SocialMediaLinkProps {
  href: string
  icon: string
}

export const SocialMediaLink = ({ href, icon }: SocialMediaLinkProps) => (
  <Container href={href} target="_blank">
    {/* @ts-ignore */}
    <FontAwesomeIcon icon={['fab', icon]} />
  </Container>
)
