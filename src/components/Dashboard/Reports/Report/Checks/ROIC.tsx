import { useQuery } from '@apollo/client'

import { FMP } from 'src/common/queries'
import { CheckCard, LoadingCard } from './CheckCard'

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

  let description = ''
  let sentiment = 'neutral'

  if (latestROIC > 0) {
    if (isConsistentlyGrowing && latestROIC > 10) {
      description = `${latestROIC.toFixed(2)}%, and consistently growing YoY.`
      sentiment = 'success'
    } else if (isConsistentlyGrowing && latestROIC < 10) {
      description = `${latestROIC.toFixed(2)}%, but consistently growing YoY.`
      sentiment = 'neutral'
    }

    if (hasPositiveGrowth && !isConsistentlyGrowing && latestROIC > 10) {
      let adjective = 'some'
      if (numberOfDecliningYears >= 5) {
        adjective = 'very'
      }

      description = `${latestROIC.toFixed(2)}%, with ${adjective} inconsistent growth.`
      sentiment = latestROIC > 20 ? 'success' : 'neutral'
    }
    if (hasPositiveGrowth && !isConsistentlyGrowing && latestROIC < 10) {
      description = `${latestROIC.toFixed(2)}% with inconsistent growth.`
      sentiment = 'warning'
    }
    if (!hasPositiveGrowth && latestROIC >= 10) {
      description = `${latestROIC.toFixed(2)}% (good) but it has been declining`
      sentiment = 'warning'
    }
    if (!hasPositiveGrowth && latestROIC < 10) {
      description = `${latestROIC.toFixed(2)}% and it has been declining`
      sentiment = 'danger'
    }
  } else {
    if (hasPositiveGrowth) {
      description = `${latestROIC.toFixed(2)}% but growing`
      sentiment = 'danger'
    } else if (!hasPositiveGrowth) {
      description = `${latestROIC.toFixed(2)}% and declining!`
      sentiment = 'danger'
    }
  }

  return (
    <CheckCard
      icon={['fad', hasPositiveGrowth ? 'chart-line' : 'chart-line-down']}
      title="Return On Invested Capital"
      description={description}
      // @ts-ignore
      sentiment={sentiment}
    ></CheckCard>
  )
}
