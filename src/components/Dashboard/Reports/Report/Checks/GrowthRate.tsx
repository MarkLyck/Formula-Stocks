import { useQuery } from '@apollo/client'
import { mean } from 'lodash'
import { FMP } from 'src/common/queries'
import { CheckCard, LoadingCard, CheckTag } from './CheckCard'

import { calculateGrowthRateByYear } from '../Growth/utils/growthRates'

type GrowthRateCheckProps = {
  url: string
  label: string
  metricName: string
}

export const GrowthRateCheck = ({ url, label, metricName }: GrowthRateCheckProps) => {
  const { data, loading } = useQuery(FMP, {
    variables: {
      endpoint: url,
    },
  })

  if (loading) return <LoadingCard />
  if (!data?.FMP.response || data?.FMP.response.length === 0) return null

  const responseData = data?.FMP.response.slice().reverse()
  const values = responseData.map((item: any) => item[metricName])
  const latestValue = values[values.length - 1]
  const { growthRates } = calculateGrowthRateByYear(values)

  const growthRateNumbers = growthRates.map((item: any) => item.growthRate)

  // don't show if data is invalid.
  if (latestValue === 0) return null

  const averageGrowthRate: number = mean(growthRateNumbers)
  console.log('🔈 ~ averageGrowthRate', averageGrowthRate)
  const hasPositiveGrowth = averageGrowthRate > 0

  // TODO average growthRate

  // @ts-ignore
  let description = `${averageGrowthRate.toFixed(2)}%`
  let sentiment = 'neutral'

  if (hasPositiveGrowth) {
    sentiment = 'success'
  } else {
    sentiment = 'danger'
  }

  if (!description) return null

  const tags = []
  if (averageGrowthRate >= 10)
    tags.push(<CheckTag children="High Growth" color="success" icon={['fad', 'chart-line']} />)
  if (averageGrowthRate >= 50)
    tags.push(<CheckTag children="Unsustainable" color="warning" icon={['fad', 'chart-line']} />)
  if (averageGrowthRate >= 5 && averageGrowthRate < 10)
    tags.push(<CheckTag children="Medium Growth" color="neutral" icon={['fad', 'chart-line']} />)
  if (averageGrowthRate >= 0 && averageGrowthRate < 5)
    tags.push(<CheckTag children="Slow Growth" color="warning" icon={['fad', 'chart-line']} />)
  if (averageGrowthRate < 0)
    tags.push(<CheckTag children="Negative Growth" color="danger" icon={['fad', 'chart-line-down']} />)

  return (
    <CheckCard
      icon={['fad', hasPositiveGrowth ? 'chart-line' : 'chart-line-down']}
      title={label}
      description={description}
      tags={tags}
      // @ts-ignore
      sentiment={sentiment}
    ></CheckCard>
  )
}

// import { useQuery } from '@apollo/client'

// import { FMP } from 'src/common/queries'
// import { CheckCard, LoadingCard } from './CheckCard'

// import { calculateGrowthRateByYear } from '../Growth/utils/growthRates'

// type CheckProps = {
//   symbol: string
// }

// export const CashflowCheck = ({ symbol }: CheckProps) => {
//   const { data, loading } = useQuery(FMP, {
//     variables: {
//       endpoint: `https://financialmodelingprep.com/api/v3/cash-flow-statement/${symbol}?limit=10`,
//     },
//   })

//   if (loading) return <LoadingCard />
//   if (!data?.FMP.response || data?.FMP.response.length === 0) return null

//   const cashflowStatements = data?.FMP?.response.slice().reverse()
//   const freeCashFlowByYear = cashflowStatements.map((metric: any) => metric.freeCashFlow)
//   const latestBVPS = freeCashFlowByYear[freeCashFlowByYear.length - 1]
//   const { growthRate9Years } = calculateGrowthRateByYear(freeCashFlowByYear)
//   const hasPositiveGrowth = freeCashFlowByYear[0] < latestBVPS

//   // don't show if data is invalid.
//   if (latestBVPS === 0) return null

//   let isConsistentlyGrowing = true
//   freeCashFlowByYear.forEach((value: number, i: number) => {
//     if (i === 0) return
//     if (value < freeCashFlowByYear[i - 1]) {
//       isConsistentlyGrowing = false
//     }
//   })

//   let description = ''
//   let sentiment = 'neutral'

//   if (hasPositiveGrowth) {
//     if (isConsistentlyGrowing) {
//       description = 'Consistently growing YoY'
//       sentiment = 'success'
//       if (growthRate9Years && growthRate9Years >= 10) {
//         description = `Consistently growing YoY with a ${growthRate9Years.toFixed(2)}% growth rate`
//       }
//       if (growthRate9Years && growthRate9Years < 10) {
//         description = `Consistently growing YoY with a ${growthRate9Years.toFixed(2)}% growth rate`
//         sentiment = 'neutral'
//       }
//     }
//     if (!isConsistentlyGrowing) {
//       if (growthRate9Years && growthRate9Years >= 10) {
//         description = `+${growthRate9Years.toFixed(2)}% growth rate (inconsistent)`
//         sentiment = 'success'
//       } else if (growthRate9Years && growthRate9Years < 10) {
//         description = `+${growthRate9Years.toFixed(2)}% growth rate (inconsistent)`
//         sentiment = 'warning'
//       }
//     }
//   } else {
//     description = `${growthRate9Years && growthRate9Years.toFixed(2)}% and declining`
//     sentiment = 'danger'
//   }

//   if (!description) return null

//   return (
//     <CheckCard
//       icon={['fad', hasPositiveGrowth ? 'chart-line' : 'chart-line-down']}
//       title="Free Cash Flow Growth"
//       description={description}
//       // @ts-ignore
//       sentiment={sentiment}
//     ></CheckCard>
//   )
// }
