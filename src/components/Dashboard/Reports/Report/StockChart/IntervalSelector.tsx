import { Select } from 'antd'
import styled from '@emotion/styled'

const { Option } = Select

const Container = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 100;
`

const IntervalSelector = ({ interval, setInterval }: any) => (
  <Container>
    <Select value={interval} style={{ width: 120 }} onChange={setInterval}>
      <Option value="daily">Daily</Option>
      <Option value="1hour">1 hour</Option>
      <Option value="30min">30 min</Option>
      <Option value="15min">15 min</Option>
      <Option value="5min">5 min</Option>
      <Option value="1min">1 min</Option>
    </Select>
  </Container>
)

export default IntervalSelector
