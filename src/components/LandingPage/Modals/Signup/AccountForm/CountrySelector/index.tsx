import { Form, Select } from 'antd'
import COUNTRY_OPTIONS from './countries'

const { Option } = Select

const CountrySelector = () => {
  return (
    <Form.Item name="country" rules={[{ required: true }]}>
      <Select showSearch placeholder="Country" optionFilterProp="label">
        {COUNTRY_OPTIONS.map((option) => (
          <Option value={option.value} label={option.label}>
            <div>
              <span role="img" style={{ marginRight: 8 }}>
                {option.emoji}
              </span>
              {option.label}
            </div>
          </Option>
        ))}
      </Select>
    </Form.Item>
  )
}

export default CountrySelector
