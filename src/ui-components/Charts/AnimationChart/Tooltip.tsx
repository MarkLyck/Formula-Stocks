import styled from '@emotion/styled'
import { Typography } from 'antd'
import { transparentize } from 'polished'
import dayjs from 'dayjs'

const { Title, Text } = Typography

const Container = styled.div`
  padding: 16px 8px 8px;
  display: flex;
  flex-direction: column;
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
  font-size: 15px;
`

const Type = styled(Text)`
  color: ${(p: { color: string }) => p.color};
  margin-right: 16px;
  font-weight: 500;
  font-size: 15px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Date = styled(Title)`
  && {
    font-size: 14px;
    margin-bottom: 0;
  }
`

const BacktestedTag = styled.div`
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 12px;
  background: #d6e6ff;
  color: #3366ff;
`
const LiveTag = styled.div`
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 12px;
  background: #e6fff2;
  color: #00b07b;
`

const Tooltip = (
  _title: string,
  items: any[],
  tooltipValueFormatter: (value: number) => string = (value: number) => String(value)
) => {
  if (!items[0]) return null
  console.log('🔈 ~ items', items)
  const isBacktested = items[0]?.data?.backtested

  const FSValue = Number(items[0]?.value)
  const marketValue = Number(items[1]?.value)
  const comparisonValue = FSValue / marketValue

  return (
    <Container>
      <Header>
        <Date level={5}>{dayjs(items[0].data.date).format('MMM YYYY')}</Date>
        {isBacktested ? <BacktestedTag>Backtested</BacktestedTag> : <LiveTag>Observed real-time</LiveTag>}
      </Header>
      <ul style={{ paddingLeft: 0 }}>
        {items?.map((item: any, index: number) => {
          const { name, value, color } = item
          return (
            <li
              key={item.title + item.name}
              data-index={index}
              style={{ margin: index === 0 ? '16px 0' : '0', display: 'flex', alignItems: 'center' }}
            >
              <Marker color={color} />
              <span style={{ display: 'inline-flex', flex: 1, justifyContent: 'space-between' }}>
                <Type color={color}>{name}:</Type>
                <Value>{tooltipValueFormatter(value)}</Value>
              </span>
            </li>
          )
        })}
      </ul>
      {comparisonValue >= 2 && (
        <Text>
          FS outperforms S&P500 by a factor of: <b>{comparisonValue.toFixed(0)}x</b>
        </Text>
      )}
    </Container>
  )
}

export default Tooltip
