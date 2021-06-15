import styled from '@emotion/styled'
import { Typography } from 'antd'
import { transparentize } from 'polished'
import dayjs from 'dayjs'

const { Text } = Typography

const Container = styled.div`
  padding: 8px 0px 0;
`

const Marker = styled.div`
  height: 16px;
  width: 16px;
  border-radius: 4px;
  border: 2px solid ${(p: { color: string }) => p.color};
  background-color: ${(p: { color: string }) => transparentize(0.6, p.color)};
  margin-right: 4px;
`

const Value = styled(Text)`
  font-weight: bold;
  font-size: 14px;
`

const Type = styled(Text)`
  color: ${(p: { color: string }) => p.color};
  margin-right: 16px;
  font-weight: 500;
`

const Tooltip = (
  _title: string,
  items: any[],
  tooltipValueFormatter: (value: number) => string = (value: number) => String(value)
) => {
  if (!items[0]) return null

  return (
    <Container>
      <Text style={{ fontWeight: 500 }}>{dayjs(items[0].data.date).format('MMM YYYY')}</Text>
      <ul style={{ paddingLeft: 0 }}>
        {items?.map((item: any, index: number) => {
          const { name, value, color, data } = item
          return (
            <li
              key={item.title + item.name}
              className="g2-tooltip-list-item"
              data-index={index}
              style={{ marginBottom: 4, display: 'flex', alignItems: 'center' }}
            >
              <Marker color={color} />
              <span style={{ display: 'inline-flex', flex: 1, justifyContent: 'space-between' }}>
                <Type color={color}>{data.label ? data.label : name}:</Type>
                <Value>{tooltipValueFormatter(value)}</Value>
              </span>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}

export default Tooltip
