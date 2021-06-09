import { Radio } from 'antd'
import styled from '@emotion/styled'

const Container = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 100;
`

const IntervalSelector = ({ interval, setInterval }: any) => (
  <Container>
    <Radio.Group onChange={(e) => setInterval(e.target.value)} value={interval}>
      <Radio.Button value="daily">daily</Radio.Button>
      <Radio.Button value="1hour">1 hour</Radio.Button>
      <Radio.Button value="30min">30 min</Radio.Button>
      <Radio.Button value="15min">15 min</Radio.Button>
      <Radio.Button value="5min">5 min</Radio.Button>
      <Radio.Button value="1min">1 min</Radio.Button>
    </Radio.Group>
  </Container>
)

export default IntervalSelector
