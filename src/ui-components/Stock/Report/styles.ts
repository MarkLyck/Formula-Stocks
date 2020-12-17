import styled from '@emotion/styled'
import { Card } from '~/ui-components'

export const BesideSection = styled(Card)`
  padding: 12px 24px;
  margin-bottom: 16px;
  justify-content: space-between;
`

export const BoldValue = styled.h2`
  font-weight: bold;
  color: ${(p: any) => p.theme.palette.text[500]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
`

export const Value = styled.h2`
  font-weight: 500;
  margin-left: 8px;
  color: ${(p: any) => p.theme.palette[p.valueColor]};
  width: 40px;
  text-align: right;
`

export const FadedValue = styled.h2`
  font-weight: 500;
  color: ${(p: any) => p.theme.palette.basic[500]};
  opacity: 0.5;
  margin-left: 16px;
`

export const ScoreList = styled.ul`
  display: flex;
  flex-direction: column;
  > div {
    margin-bottom: 16px;
  }
`

export const Beside = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`

export const HelpText = styled.p`
  color: ${(p: any) => p.theme.palette.basic[500]};
  margin-top: 16px;
  margin-bottom: 8px;
  font-size: 0.8rem;
  font-weight: 500;
`
