import { Form, Select } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import COUNTRY_OPTIONS from './countries'

const CountrySelector = () => {
  return (
    <Form.Item name="country" rules={[{ required: true }]}>
      <FontAwesomeIcon icon={['fad', 'globe-americas']} />
      <Select
        size="large"
        mode="multiple"
        placeholder="Country"
        onChange={console.log}
        options={COUNTRY_OPTIONS}
        optionFilterProp="label"
      />
    </Form.Item>
  )
}

export default CountrySelector
