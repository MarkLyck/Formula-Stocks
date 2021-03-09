import { Select } from 'antd'
import styled from '@emotion/styled'
import { useAtom, planAtom } from 'src/atoms'

const { Option } = Select

const Container = styled.div`
  margin: 16px 16px;
`

const PlanSelect = () => {
  const [plan, setPlan] = useAtom(planAtom)

  return (
    <Container>
      <Select value={plan} onChange={setPlan} style={{ width: '100%' }}>
        <Option value="entry">Entry</Option>
        <Option value="premium">Premium</Option>
        <Option value="business">Business</Option>
        <Option value="fund">Fund</Option>
      </Select>
    </Container>
  )
}

export default PlanSelect
