import React from 'react'
import styled from '@emotion/styled'
import RadarChart from './index'
const Container = styled.div``

export default {
  title: 'Charts / radar chart',
  decorators: [],
  component: RadarChart,
}

export const radar_chart = ({
  ai_growth,
  ai_profitability,
  ai_reward,
  ai_safety,
  ai_score,
  ai_soundness,
  ai_stewardship,
  ai_value,
}: any) => {
  const data = [
    { label: 'Growth', value: ai_growth * 100 },
    { label: 'Value', value: ai_value * 100 },
    { label: 'Profitability', value: ai_profitability * 100 },
    { label: 'Soundness', value: ai_soundness * 100 },
    { label: 'Stewardship', value: ai_stewardship * 100 },
    { label: 'Safety', value: ai_safety * 100 },
    { label: 'Reward', value: ai_reward * 100 },
  ]

  return (
    <Container>
      <RadarChart id="radar-chart-id" data={data} aiScore={ai_score * 100} />
    </Container>
  )
}

radar_chart.argTypes = {
  ai_growth: { control: { type: 'range', min: -1, max: 1, step: 0.01 } },
  ai_profitability: { control: { type: 'range', min: -1, max: 1, step: 0.01 } },
  ai_reward: { control: { type: 'range', min: -1, max: 1, step: 0.01 } },
  ai_safety: { control: { type: 'range', min: -1, max: 1, step: 0.01 } },
  ai_score: { control: { type: 'range', min: -1, max: 1, step: 0.01 } },
  ai_value: { control: { type: 'range', min: -1, max: 1, step: 0.01 } },
  ai_soundness: { control: { type: 'range', min: -1, max: 1, step: 0.01 } },
  ai_stewardship: { control: { type: 'range', min: -1, max: 1, step: 0.01 } },
}

radar_chart.args = {
  ai_growth: -0.7213,
  ai_profitability: 0.142857,
  ai_reward: 0.92,
  ai_safety: 1,
  ai_score: 0.82,
  ai_soundness: 0.636364,
  ai_stewardship: 0.5,
  ai_value: 0.818182,
}

radar_chart.story = {
  parameters: {
    // wait for scale animation to finish.
    chromatic: { delay: 500 },
  },
}
