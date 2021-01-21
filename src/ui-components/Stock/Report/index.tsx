// @ts-nocheck
import React from 'react'
import styled from '@emotion/styled'
import AIScore from './AIScore'
import { ScoreList, BesideSection, BoldValue } from './styles'
import { HorizontalScore, RadarChart } from 'src/ui-components/Charts'
import { Card } from 'src/ui-components'

const ChartContainer = styled(Card)`
  width: 100%;
  height: 504px;
  margin-bottom: 16px;
  > div {
    width: 100%;
  }
`

const ReportContainer = styled.div`
  display: flex;
  width: 100%;

  > div:nth-of-type(1) {
    margin-right: 32px;
  }

  @media (max-width: 800px) {
    flex-direction: column;

    > div:nth-of-type(1) {
      margin-right: 0;
    }
  }

  @media (max-width: 600px) {
    padding-right: 0;
  }
`

const ReportPartContainer = styled.div`
  width: calc(50% - 16px);
  @media (max-width: 800px) {
    width: 100%;
  }
`

const SectionHeader = styled.h3`
  font-weight: 500;
  color: ${(p: any) => p.theme.palette.basic[500]};
  margin-bottom: 8px;
  margin-top: 24px;
  margin-left: 2px;
  &:first-of-type {
    margin-top: 8px;
  }
`

// const tips: { [key: string]: string } = {
//   Reward: 'Higher values, indicates better odds for a higher future return (alpha).',
//   Safety: "Higher values, indicates better odds for a positive future return. Inverse of 'risk'",
//   Growth: 'Higher values indicate better capacity for growth',
//   Value:
//     'Higher values indicate better value. Value is the relationship between what you pay and what you get in return.',
//   Profitability: 'Higher values indicate a more profitable business model',
//   Soundness: 'Higher values indicates the degree to which the business appears to be sound.',
//   Stewardship:
//     'Higher values indicates the extent with which management actions appear aligned with shareholder interests.',
// }

export interface ReportType {
  scores: {
    ai_score: number
    ai_reward: number
    ai_safety: number
    ai_growth: number
    ai_value: number
    ai_profitability: number
    ai_soundness: number
    ai_stewardship: number
  }
  price: number
  ticker: string
}

const Report = ({ price, scores, ticker }: ReportType) => {
  const radarChartData = [
    { label: 'Growth', value: scores.ai_growth * 100 },
    { label: 'Value', value: scores.ai_value * 100 },
    { label: 'Profitability', value: scores.ai_profitability * 100 },
    { label: 'Soundness', value: scores.ai_soundness * 100 },
    { label: 'Stewardship', value: scores.ai_stewardship * 100 },
    { label: 'Safety', value: scores.ai_safety * 100 },
    { label: 'Reward', value: scores.ai_reward * 100 },
  ]

  return (
    <>
      <ReportContainer>
        <ReportPartContainer>
          <SectionHeader>AI Investment Report</SectionHeader>

          <AIScore value={scores.ai_score} />
          <ScoreList>
            <HorizontalScore value={scores.ai_reward} label="Reward" direction="right" />
            <HorizontalScore value={scores.ai_safety} label="Safety" direction="right" />
          </ScoreList>
        </ReportPartContainer>

        <ReportPartContainer>
          <SectionHeader>AI Scores</SectionHeader>
          <ChartContainer>
            <RadarChart id={`${ticker}-radar-chart`} data={radarChartData} aiScore={scores.ai_score * 100} />
          </ChartContainer>

          {/* <ScoreList>
            <HorizontalScore value={scores.ai_growth} label="Growth" direction="left" />
            <HorizontalScore value={scores.ai_value} label="Value" direction="left" />
            <HorizontalScore value={scores.ai_profitability} label="Profitability" direction="left" />
            <HorizontalScore value={scores.ai_soundness} label="Soundness" direction="left" />
            <HorizontalScore value={scores.ai_stewardship} label="Stewardship" direction="left" />
          </ScoreList> */}

          <BesideSection>
            <BoldValue>Report based on price</BoldValue>
            <BoldValue>${price}</BoldValue>
          </BesideSection>
        </ReportPartContainer>
      </ReportContainer>
    </>
  )
}

export default Report
