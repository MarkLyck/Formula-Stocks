import React from 'react'
import styled from '@emotion/styled'
import { cardStyle, SmallIconContainer } from 'src/ui-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StatCardContainer = styled.div`
  ${cardStyle};
  align-items: center;
  flex-direction: row;
  width: 100%;

  &:hover {
    background: ${(p) => p.theme.palette.neutral[200]};
  }
`

const StatCardContent = styled.div`
  width: 100%;
`

const StatisticsContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  p {
    margin: 0;
    margin-right: 16px;
  }
`

export const StatisticsCard = ({ icon, color, children }: any) => (
  <StatCardContainer>
    <SmallIconContainer>
      <FontAwesomeIcon icon={['fad', icon]} color={color} />
    </SmallIconContainer>
    <StatCardContent>
      <StatisticsContainer>{children}</StatisticsContainer>
    </StatCardContent>
  </StatCardContainer>
)
