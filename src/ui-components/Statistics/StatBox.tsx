import React from 'react'
import styled from '@emotion/styled'
import { Tooltip } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Card = styled.div`
  display: flex;
  border-radius: 4px;
  border: 1px solid #ebedf5;
  box-shadow: 0 4px 14px 0 rgba(111, 120, 156, 0.08);
  box-sizing: border-box;
  align-items: center;
  padding: 16px;
  height: 80px;
  width: 100%;
  transition: transform 0.3s;
  background: ${(p: any) => p.backgroundColor};

  &:hover {
    transform: scale(1.02);
  }
`

const Content = styled.div`
  background: none;
  width: 68%;
  padding-left: 10%;

  h4 {
    color: ${(p: any) => p.color};
    font-weight: 600;
    font-size: 1.5rem;
    margin-bottom: 0;
  }
  h5 {
    color: ${(p: any) => p.color};
    font-weight: 400;
  }
`

const Symbol = styled.div`
  color: ${(p: any) => p.color};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  font-size: 25px;
  i {
    font-size: 25px;
  }
`

const Divider = styled.div`
  width: 2px;
  height: 100%;
  background: ${(p: { backgroundColor: string }) => p.backgroundColor};
`

type StatisticBoxProps = {
  label: string
  value: number | string
  tooltip?: string
  color: string
  backgroundColor: string
  icon: [string, string]
}

export const StatBox = ({ label, value, tooltip = '', color, backgroundColor, icon }: StatisticBoxProps) => (
  <Tooltip title={tooltip}>
    {/* @ts-ignore */}
    <Card backgroundColor={backgroundColor}>
      <Symbol color={color}>
        {/* @ts-ignore */}
        <FontAwesomeIcon icon={icon} />
      </Symbol>
      <Divider backgroundColor={backgroundColor === 'white' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.4)'} />
      <Content color={color}>
        <h4>{value}</h4>
        <h5>{label}</h5>
      </Content>
    </Card>
  </Tooltip>
)
