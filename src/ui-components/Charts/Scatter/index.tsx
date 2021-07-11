import { Spin, Typography, Space } from 'antd'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import dynamic from 'next/dynamic'

const { Text } = Typography

const Scatter = dynamic(() => import('@ant-design/charts').then((mod) => mod.Scatter) as any, { ssr: false })

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`

const TooltipContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ReturnValue = styled.h2`
  color: ${(p: any) => (p.value < 0 ? p.themeProp.palette.danger[600] : p.themeProp.palette.success[600])};
  font-weight: 900;
  margin-top: 12px;
`

const ActionContainer = styled.div`
  display: flex;
  margin-bottom: 16px;

  .action-ticker {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`

const SellAction = styled.div`
  background-color: ${(p: any) => p.theme.palette.success[600]};
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  font-weight: bold;
`

const TooltipLineText = styled(Text)`
  display: flex;
  justify-content: space-between;
  width: 160px;
`

const chartTooltip = (_title: string, items: any[], theme: any) => {
  if (!items[0]) return null

  const value = items[0].data.percentIncrease
  const buyPrice = items[0].data.buyPrice.toFixed(2)
  const sellPrice = items[0].data.sellPrice.toFixed(2)
  const startDate = items[0].data.startDate
  const daysHeld = items[0].data.daysHeld

  return (
    <TooltipContent>
      <ActionContainer>
        <SellAction theme={theme}>SELL</SellAction>
      </ActionContainer>
      <Space direction="vertical">
        <TooltipLineText>
          First purchase: <b>{startDate}</b>
        </TooltipLineText>
        <TooltipLineText>
          Duration: <b>{daysHeld} days</b>
        </TooltipLineText>
        <TooltipLineText>
          Avg. buy price: <b>${buyPrice}</b>
        </TooltipLineText>
        <TooltipLineText>
          Sold at: <b>${sellPrice}</b>
        </TooltipLineText>
      </Space>
      <Text style={{ marginTop: 16 }}>Return: </Text>
      {/* @ts-ignore */}
      <ReturnValue value={value} themeProp={theme}>
        {value > 0 ? '+' : ''}
        {value}%
      </ReturnValue>
    </TooltipContent>
  )
}

const ScatterChart = ({ data, loading }: any) => {
  const theme = useTheme()
  if (loading) {
    return (
      <LoadingContainer>
        <Spin />
      </LoadingContainer>
    )
  }

  if (!Array.isArray(data) || data.length === 0) return null

  var config = {
    autoFit: true,
    height: 400,
    xField: 'daysHeld',
    xAxis: {
      label: {
        formatter: (value: number) => `${value} days`,
      },
    },
    yField: 'percentIncrease',
    yAxis: {
      min: -100,
      minLimit: -100,
      max: 500,
      label: {
        formatter: (value: number) => `${value > 0 ? '+' : ''}${value}%`,
      },
    },
    size: 6,
    pointStyle: {
      fillOpacity: 0.4,
      stroke: 'rgba(255,255,255,0.2)',
    },
    data: data,
    shape: 'circle',
    colorField: 'percentIncrease',
    color: (point: any) => {
      if (point.percentIncrease >= 0) return theme.palette.primary[600]
      return theme.palette.danger[600]
    },
    tooltip: {
      customContent: (title: string, items: any[]) => chartTooltip(title, items, theme),
    },
    interactions: [{ type: 'element-active' }],
    legend: false,
  }

  // @ts-ignore
  return <Scatter {...config} />
}

export default ScatterChart
