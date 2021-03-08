import styled from '@emotion/styled'
import { transparentize } from 'polished'
import { getAIScoreColor } from 'src/common/utils/reportUtils'

const Tag = styled.span`
  color: white;
  // color: ${(p) => p.color};
  background: ${(p: any) => transparentize(0.2, p.color)};
  border: 1px solid ${(p) => p.color};
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 8px;
  text-align: right;
  font-weight: 400;
`

const getTagName = (score: number) => {
  if (score < -75) return 'Very bad'
  if (score < -25) return 'Bad'
  if (score < -10) return 'Below average'
  if (score < 10) return 'Average'
  if (score < 25) return 'Above average'
  if (score < 50) return 'Good'
  if (score < 80) return 'Great'
  if (score < 100) return 'Excellent'
  return 'perfect'
}

type AIScoreTagProps = {
  score: number
}

const AIScoreTag = ({ score }: AIScoreTagProps) => {
  return <Tag color={getAIScoreColor(score)}>{getTagName(score)}</Tag>
}

export default AIScoreTag
