import { ReactNode } from 'react'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import React from 'react'
import { getAIScoreColor } from 'src/common/utils/reportUtils'
import AIScoreTag from './AIScoreTag'

const { Text } = Typography

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

const Chart = styled.div`
  position: relative;
  width: 100%;
  height: 8px;
  background: ${(p) => p.theme.palette.neutral[300]};
  border-radius: 4px;
  margin-right: 8px;
`

const Middle = styled.div`
  position: absolute;
  left: calc(50% - 1px);
  width: 1px;
  height: 8px;
  background-color: ${(p) => p.theme.palette.neutral[500]};
  z-index: 10;
`

type ValueProps = { theme?: any; width: number; positive: boolean; color: string }

const Value = styled.div`
  position: absolute;
  height: 8px;
  width: ${(p: ValueProps) => p.width}%;
  left: ${(p: ValueProps) => (p.positive ? '50%' : `calc(50% - ${p.width}%)`)};

  background: ${(p: ValueProps) => p.color};
  border-top-right-radius: ${(p: ValueProps) => (p.positive ? '4px' : '0')};
  border-bottom-right-radius: ${(p: ValueProps) => (p.positive ? '4px' : '0')};
  border-top-left-radius: ${(p: ValueProps) => (p.positive ? '0' : '4px')};
  border-bottom-left-radius: ${(p: ValueProps) => (p.positive ? '0' : '4px')};
  z-index: 1;
`

const Label = styled(Text)`
  color: ${(p) => p.theme.palette.neutral[700]};
  margin-right: 8px;
`

const Top = styled.div`
  display: flex;
  align-items: center;
`

type AIScoreProps = {
  score: number
  label: ReactNode
}

const AIScorePreview = ({ score, label }: AIScoreProps) => {
  const realScore = score * 100

  return (
    <div style={{ width: '100%' }}>
      <Top>
        {label && <Label>{label}</Label>}
        <AIScoreTag score={realScore} />
      </Top>
      <Container>
        <Chart>
          <Middle />
          <Value width={Math.abs(realScore / 2)} positive={realScore >= 0} color={getAIScoreColor(realScore)} />
        </Chart>
        <Text style={{ fontWeight: 'bold' }}>
          {realScore >= 0 ? '+' : ''}
          {realScore.toFixed(2)}
        </Text>
      </Container>
    </div>
  )
}

export default AIScorePreview
