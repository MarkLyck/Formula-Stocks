import { Select } from 'antd'

const { Option } = Select

const IntervalSelector = ({ interval, setInterval }: any) => (
  <Select value={interval} style={{ width: 120 }} onChange={setInterval}>
    <Option value="daily">Daily</Option>
    <Option value="1hour">1 hour</Option>
    <Option value="30min">30 min</Option>
    <Option value="15min">15 min</Option>
    <Option value="5min">5 min</Option>
    <Option value="1min">1 min</Option>
  </Select>
)

export default IntervalSelector
