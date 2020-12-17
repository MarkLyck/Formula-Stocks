// @ts-nocheck
import React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Gauge } from '~/ui-components/Charts'
import { Card } from '~/ui-components'

// @ts-ignore
export const AIScoreContainer = styled(Card)`
  position: relative;
  padding: 0;
  height: 296px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  ${(props: { css: string }) => {
    // @ts-ignore
    return props.css
  }}
`

export const AIScoreValue = styled.h1`
  color: ${(p: any) => p.color};
  font-weight: 500;
  font-size: 2rem;
  position: absolute;
  bottom: 64px;
  left: 50%;
  transform: translateX(-50%);
`

export const AIScoreText = styled.h2`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: ${(p: any) => p.theme.palette.text[500]};
  opacity: 0.5;
  font-weight: 400;
  font-size: 1.2rem;
`

const BrainIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 16px;
  left: 16px;
  color: ${(p: any) => p.theme.palette.basic[500]};
  font-size: 1.2rem;
`

interface AIScorePropsType {
  id: any
  value: number
  css: any
}

const AIScore = ({ value, css }: AIScorePropsType) => {
  const outputValue = value * 100

  return (
    <AIScoreContainer css={css}>
      <BrainIcon icon="brain" />
      <Gauge value={outputValue} />
    </AIScoreContainer>
  )
}

export const AIScoreWithoutCharts = React.memo(AIScore)

export default React.memo(AIScore)
