import React, { FC } from 'react'
import styled from '@emotion/styled'
import { getAIScoreColor } from '~/common/utils/reportUtils'
import theme from '~/lib/theme'
import { Card } from '~/ui-components'

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px 24px 24px;
  transition: all 0.2s;

  &:hover {
    @media (min-width: 800px) {
      transform: translate(${(props: any) => (props.direction === 'left' ? '-8px' : '8px')}, -4px) scale(1.02);
    }
  }
`

const Score = styled.p`
  font-weight: bold;
  font-size: 1.1rem;
  color: ${(props: any) => getAIScoreColor(props.value)};
`

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Label = styled.p`
  color: ${(props: any) => props.theme.palette.text[500]};
  font-weight: bold;
  margin-right: 16px;
  font-size: 1rem;
`

const ChartContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  margin-top: 12px;
  // background-color: ${(props) => props.theme.palette.basic[200]};
  border-radius: 4px;

  div:last-of-type {
    margin-right: 0;
  }
`

const ChartSection = styled.div`
  height: 8px;
  width: ${(props: { width: number; color: string; active?: boolean }) => props.width}%;
  background-color: ${(props: { width: number; color: string; active?: boolean }) => props.color};
  border-radius: 0px;
  margin-right: 4px;
  opacity: ${(props: { width: number; color: string; active?: boolean }) => (props.active ? '1' : '0.1')};
  transition: all 0.2s;
`

const Indicator = styled.div`
  border-radius: 2px;
  background-color: white;
  border: 3px solid ${(props: any) => getAIScoreColor(props.value)};
  height: 32px;
  width: 16px;
  position: absolute;
  top: 50%;
  left: ${(props: any) => (props.value + 100) / 2}%;
  transform: translate(-50%, -50%);
  box-shadow: 0 4px 8px 0 rgba(111, 120, 156, 0.24);
  box-sizing: border-box;
  z-index: 10;
`

export interface ChartPropsType {
  value: number
  label: string
  direction?: string
}

const HorizontalScore: FC<ChartPropsType> = ({ value, label, direction }: ChartPropsType) => {
  const outputValue = value * 100
  return (
    // @ts-ignore
    <Container direction={direction}>
      <TextContainer>
        <Label>{label}</Label>
        {/* @ts-ignore */}
        <Score value={outputValue}>
          {outputValue > 0 ? '+' : ''}
          {outputValue.toFixed(0)}
        </Score>
      </TextContainer>

      <ChartContainer className="horizontal-score-chart-container">
        {/* @ts-ignore */}
        <Indicator value={outputValue} />
        <ChartSection
          className="chart-section"
          width={40}
          color={theme.palette.scale.worst}
          active={outputValue < -20}
        />
        <ChartSection
          className="chart-section"
          width={20}
          color={theme.palette.scale.bad}
          active={outputValue >= -20 && outputValue < 20}
        />
        <ChartSection
          className="chart-section"
          width={12.5}
          color={theme.palette.scale.average}
          active={outputValue >= 20 && outputValue < 50}
        />
        <ChartSection
          className="chart-section"
          width={12.5}
          color={theme.palette.scale.good}
          active={outputValue >= 50 && outputValue < 75}
        />
        <ChartSection
          className="chart-section"
          width={12.75}
          color={theme.palette.scale.perfect}
          active={outputValue >= 75}
        />
      </ChartContainer>
    </Container>
  )
}

export default HorizontalScore
