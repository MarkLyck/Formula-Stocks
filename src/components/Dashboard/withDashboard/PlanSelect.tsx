import { Select } from 'antd'
import styled from '@emotion/styled'
import useStore from 'src/lib/useStore'

const { Option } = Select

const Container = styled.div`
  margin: 16px 16px;
`

const PlanSelect = () => {
  const { plan, setPlan } = useStore((state: any) => ({ setPlan: state.setPlan, plan: state.plan }))

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
