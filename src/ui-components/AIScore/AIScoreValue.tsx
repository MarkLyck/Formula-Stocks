import styled from '@emotion/styled'
import { Spin } from 'antd'
import { darken } from 'polished'
import { getAIScoreColor } from 'src/common/utils/reportUtils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AIScoreValueTag = styled.span`
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  background: ${(p) => p.color};
  color: ${(p) => p.theme.palette.neutral[100]};

  font-weight: bold;
  font-size: 14px;
  white-space: nowrap;
  transition: all 0.2s;

  &:hover {
    background: ${(p: any) => darken(0.05, p.color)};
  }
`

type AIScoreValueProps = {
  score: number
  icon?: any
}

const AIScoreValue = ({ score, icon = ['fad', 'tachometer-alt'] }: AIScoreValueProps) => {
  const color = getAIScoreColor(score)

  return (
    <AIScoreValueTag color={color}>
      <FontAwesomeIcon icon={icon} style={{ marginRight: 8 }} />
      {score > 0 ? '+' : ''}
      {score ? score.toFixed(2) : <Spin />}
    </AIScoreValueTag>
  )
}

export default AIScoreValue
