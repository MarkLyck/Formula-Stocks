import React from 'react'
import dynamic from 'next/dynamic'
import { maxBy, minBy } from 'lodash'
const TinyArea = dynamic(() => import('@ant-design/charts').then((mod) => mod.TinyArea) as any, { ssr: false })

export const TinyStockChart = ({ data }: any) => {
  console.log('🚀 ~ file: index.tsx ~ line 6 ~ TinyStockChart ~ data', data)
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

  return <TinyArea {...config} />
}
