import React from 'react'
import dynamic from 'next/dynamic'
import { minBy } from 'lodash'
const TinyArea = dynamic(() => import('@ant-design/charts').then((mod) => mod.TinyArea) as any, { ssr: false })

export const TinyStockChart = ({ data }: any) => {
  if (!Array.isArray(data) || data.length === 0) return null

  var config = {
    height: 60,
    autoFit: true,
    yAxis: {
      minLimit: Math.floor(minBy(data, (point: any) => point.close).close),
    },
    data: data.map((point) => point.close),
    smooth: true,
  }

  // @ts-ignore
  return <TinyArea {...config} />
}
