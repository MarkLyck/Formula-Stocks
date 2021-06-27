import { Typography, Space } from 'antd'
import styled from '@emotion/styled'

import { currencyFormatter } from 'src/common/utils/formatters'

const { Text } = Typography

const TooltipContent = styled.div`
  padding: 24px 0;
  display: flex;
  flex-direction: column;
`

const TooltipItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 120px;
`

export const lineChartTooltip = (_title: string, items: any[]) => {
  if (!items[0]) return null
  const point = items[0].data

  return (
    <TooltipContent>
      <Space direction="vertical" size="middle">
        <Text>
          <b>{point.date}</b>
        </Text>
        <TooltipItem>
          <Text style={{ width: 60 }}>Close:</Text>
          <Text>
            <b>{currencyFormatter.format(point.close)}</b>
          </Text>
        </TooltipItem>
      </Space>
    </TooltipContent>
  )
}

export const stockChartTooltip = (_title: string, items: any[], theme: any) => {
  if (!items[0]) return null
  const point = items[0].data

  return (
    <TooltipContent>
      <Space direction="vertical" size="middle">
        <Text>
          <b>{point.date}</b>
        </Text>
        <TooltipItem>
          <Text style={{ width: 60 }}>Open:</Text>
          <Text>
            <b>{currencyFormatter.format(point.open)}</b>
          </Text>
        </TooltipItem>
        <TooltipItem>
          <Text style={{ width: 60 }}>High:</Text>
          <Text>
            <b>{currencyFormatter.format(point.high)}</b>
          </Text>
        </TooltipItem>
        <TooltipItem>
          <Text style={{ width: 60 }}>Low:</Text>
          <Text>
            <b>{currencyFormatter.format(point.low)}</b>
          </Text>
        </TooltipItem>
        <TooltipItem>
          <Text style={{ width: 60 }}>Close:</Text>
          <Text>
            <b>{currencyFormatter.format(point.close)}</b>
          </Text>
        </TooltipItem>
        <TooltipItem>
          <Text style={{ width: 60 }}>Volume:</Text>
          <Text>
            <b>{point.volume}</b>
          </Text>
        </TooltipItem>
        {point.changePercent && (
          <TooltipItem>
            <Text style={{ width: 60 }}>% Change:</Text>
            <Text style={{ color: point.changePercent >= 0 ? theme.palette.success[600] : theme.palette.danger[600] }}>
              <b>{point.changePercent}%</b>
            </Text>
          </TooltipItem>
        )}
      </Space>
    </TooltipContent>
  )
}
