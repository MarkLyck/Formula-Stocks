import styled from '@emotion/styled'
import { transparentize } from 'polished'
import { getAIScoreColor, getAIScoreSentiment } from 'src/common/utils/reportUtils'

const Tag = styled.span`
  color: white;
  background: ${(p: any) => transparentize(0.2, p.color)};
  border: 1px solid ${(p) => p.color};
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
  text-align: right;
  font-weight: 400;
`

type AIScoreTagProps = {
  score: number
}

const AIScoreTag = ({ score }: AIScoreTagProps) => {
  return <Tag color={getAIScoreColor(score)}>{getAIScoreSentiment(score)}</Tag>
}

export default AIScoreTag
