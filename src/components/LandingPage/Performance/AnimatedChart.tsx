import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'

import { AnimationChart } from 'src/ui-components'
import { currencyRoundedFormatter } from 'src/common/utils/formatters'
import { GraphContainer, ChartLoaderContainer } from './styles'

type AnimatedChartProps = {
  isLoading: boolean
  error: any
  planPerformance: any
}

const createPlanData = (data: any[]) => {
  return data.map((point: any, i: number) => {
    const balance = data[i].balance
    const dayjsDate = dayjs(point.date).startOf('day')

    return {
      value: Number(balance),
      backtested: dayjsDate.isAfter(dayjs('2009-01-01')) ? false : true,
      type: `Formula Stocks`,
      date: dayjsDate.toDate(),
    }
  })
}

const dollarFormatterRounded = (value: number) => currencyRoundedFormatter.format(value)

const AnimatedChart = ({ data }: any) => {
  const [animating, setAnimating] = useState(false)
  const [chartData, setChartData]: any = useState([])

  const animateData = async () => {
    if (!animating) {
      data.forEach((_item: any, i: number) => {
        setTimeout(() => {
          const newChartData = data.slice(0, i)
          setChartData(newChartData)
        }, i * 100)
      })
    }
    setAnimating(true)
  }

  useEffect(() => {
    if (data.length > 0) {
      console.log('🔈 ~ START LOOPING')
      animateData()
    }
  }, [data.length])

  return (
    <GraphContainer>
      <AnimationChart
        data={chartData}
        dateMask="YYYY"
        min={24500}
        labelFormatter={dollarFormatterRounded}
        tooltipValueFormatter={dollarFormatterRounded}
      />
    </GraphContainer>
  )
}

const AnimatedChartProvider = ({ isLoading, error, planPerformance }: AnimatedChartProps) => {
  if (error) {
    return (
      <ChartLoaderContainer>
        <FontAwesomeIcon icon={['fad', 'exclamation-triangle']} size="4x" />
        <p>Error loading chart</p>
      </ChartLoaderContainer>
    )
  }
  if (isLoading) {
    return (
      <ChartLoaderContainer>
        <FontAwesomeIcon icon="spinner-third" spin size="4x" />
        <p>Loading chart</p>
      </ChartLoaderContainer>
    )
  }

  const fullChartData: any[] = createPlanData(planPerformance)

  return <AnimatedChart data={fullChartData} />
}

export default AnimatedChartProvider
