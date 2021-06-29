import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Space, Card } from 'antd'

import { AnimationChart } from 'src/ui-components'
import { currencyRoundedFormatter, numberFormatter } from 'src/common/utils/formatters'
import { GraphContainer, ChartLoaderContainer } from './styles'

type AnimatedChartProps = {
  isLoading: boolean
  error: any
  planPerformance: any
}

const BalanceContainer = styled.div`
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
`

const BalanceTag = styled(Card)`
  width: 260px;
  display: flex;
  justify-content: space-between;
  background: ${(p) => p.theme.palette.neutral[200]};
  border-radius: 8px;
  padding: 16px;
  font-weight: bold;
  font-size: 16px;

  .ant-card-body {
    padding: 0;
    display: flex;
  }
`

const CounterText = styled.span`
  text-align: left;
  display: flex;
  align-items: center;
  margin-right: 8px;
`

const PositiveNegative = styled.span`
  display: flex;
  align-items: center;
  color: ${(p: any) =>
    p.final ? p.theme.palette.success[600] : p.theme.palette[p.positive ? 'success' : 'danger'][600]};
`

const BlueCount = styled.span`
  display: flex;
  align-items: center;
  color: ${(p) => p.theme.palette.primary[600]};
`
const IconContainer = styled.div`
  width: 32px;
  height: 32px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  border: 1px solid #f0f0f0;
`

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
          const newChartData = data.slice(0, i + 1)
          setChartData(newChartData)
        }, i * 80)
      })
    }
    setAnimating(true)
  }

  useEffect(() => {
    if (data.length > 0) animateData()
  }, [data.length])

  const renderCounters = () => {
    const startBalance = chartData[0].value
    const currentBalance: number = chartData[chartData.length - 1].value
    const increase = currentBalance - startBalance
    const currentReturn = (increase / startBalance) * 100
    const isPositive = chartData[chartData.length - 2] ? currentBalance > chartData[chartData.length - 2].value : true
    const isFinal = chartData.length === data.length

    return (
      <BalanceContainer>
        <Space>
          <BalanceTag>
            <CounterText>
              <IconContainer>
                <FontAwesomeIcon icon={['fad', 'dollar-sign']} size="1x" />
              </IconContainer>
              Balance:
            </CounterText>{' '}
            {/* @ts-ignore */}
            <BlueCount>{dollarFormatterRounded(currentBalance)}</BlueCount>
          </BalanceTag>
          <BalanceTag>
            <CounterText>
              <IconContainer>
                <FontAwesomeIcon icon={['fad', 'chart-line']} size="1x" />
              </IconContainer>
              Return:
            </CounterText>{' '}
            {/* @ts-ignore */}
            <PositiveNegative positive={isPositive} final={isFinal}>
              +{numberFormatter.format(Math.floor(currentReturn))}%
            </PositiveNegative>
          </BalanceTag>
        </Space>
      </BalanceContainer>
    )
  }

  return (
    <GraphContainer>
      {chartData.length >= 1 && renderCounters()}
      <AnimationChart
        data={chartData}
        dateMask="YYYY"
        min={0}
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
