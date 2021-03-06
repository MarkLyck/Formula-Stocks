import React from 'react'
import { Typography } from 'antd'
import styled from '@emotion/styled'
import dynamic from 'next/dynamic'
import { minBy } from 'lodash'

const { Text } = Typography

const TinyArea = dynamic(() => import('@ant-design/charts').then((mod) => mod.TinyArea) as any, { ssr: false })

const TooltipContent = styled.div`
  padding: 4px;
`

const TooltipText = styled(Text)`
  font-size: 14px;
  margin: 0;
`

export const TinyStockChart = ({ data, height = 60 }: any) => {
  if (!Array.isArray(data) || data.length === 0) return null

  var config = {
    height,
    autoFit: true,
    tooltip: {
      customContent: (_: string, points: [any]) => {
        const value = points[0]?.value
        return (
          <TooltipContent>
            <TooltipText>${value ? Number(value).toFixed(2) : ''}</TooltipText>
          </TooltipContent>
        )
      },
    },
    yAxis: {
      minLimit: Math.floor(minBy(data, (point: any) => point.close).close),
    },
    data: data.map((point) => point.close),
    smooth: false,
  }

  // @ts-ignore
  return <TinyArea {...config} />
}
