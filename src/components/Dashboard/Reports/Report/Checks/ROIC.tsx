import { useQuery } from '@apollo/client'

import { FMP } from 'src/common/queries'
import { CheckCard, LoadingCard, CheckTag } from './CheckCard'

type CheckProps = {
  symbol: string
}

export const ROICCheck = ({ symbol }: CheckProps) => {
  const { data, loading } = useQuery(FMP, {
    variables: {
      endpoint: `https://financialmodelingprep.com/api/v3/key-metrics/${symbol}?limit=10`,
    },
  })

  if (loading) return <LoadingCard />
  if (!data?.FMP.response || data?.FMP.response.length === 0) return null

  const keyMetrics = data?.FMP.response.slice().reverse()
  const roicByYear = keyMetrics.map((metric: any) => metric.roic)
  const latestROIC = roicByYear[roicByYear.length - 1] * 100
  const hasPositiveGrowth = roicByYear[0] < roicByYear[roicByYear.length - 1]

  // don't show if data is invalid.
  if (latestROIC === 0) return null

  let isConsistentlyGrowing = true
  let numberOfDecliningYears = 0
  roicByYear.forEach((value: number, i: number) => {
    if (i === 0) return
    if (value < roicByYear[i - 1]) {
      isConsistentlyGrowing = false
      numberOfDecliningYears += 1
    }
  })

  let description = `${latestROIC.toFixed(2)}%`
  let sentiment = 'neutral'

  if (latestROIC >= 0) sentiment = 'neutral'
  if (latestROIC > 10) sentiment = 'success'
  if (latestROIC < 0) sentiment = 'danger'

  const tags = []
  if (latestROIC > 10) tags.push(<CheckTag children="High return" color="success" icon={['fad', 'percentage']} />)
  if (latestROIC >= 5 && latestROIC < 10)
    tags.push(<CheckTag children="Normal return" color="neutral" icon={['fad', 'percentage']} />)
  if (latestROIC >= 0 && latestROIC < 5)
    tags.push(<CheckTag children="Low return" color="warning" icon={['fad', 'percentage']} />)
  if (latestROIC < 0) tags.push(<CheckTag children="Negative return" color="danger" icon={['fad', 'minus']} />)

  if (isConsistentlyGrowing)
    tags.push(<CheckTag children="Consistent growth" color="success" icon={['fad', 'chart-line']} />)
  // if (hasPositiveGrowth && !isConsistentlyGrowing) tags.push(<CheckTag children="Inconsistent" color="warning" />)

  if (hasPositiveGrowth) tags.push(<CheckTag children="Increasing" color="success" icon={['fad', 'chart-line']} />)
  if (!hasPositiveGrowth) tags.push(<CheckTag children="Decreasing" color="danger" icon={['fad', 'chart-line-down']} />)

  return (
    <CheckCard
      icon={['fad', 'percentage']}
      title="Return On Invested Capital"
      description={description}
      tags={tags}
      // @ts-ignore
      sentiment={sentiment}
    ></CheckCard>
  )
}
