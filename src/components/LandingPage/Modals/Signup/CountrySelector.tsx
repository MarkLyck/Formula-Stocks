import { Form, Select } from 'antd'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import COUNTRY_OPTIONS from './countries'

const { Option } = Select

const lookupIP = async () => {
  const response = await fetch('https://extreme-ip-lookup.com/json/')
  const json = await response.json()
  return json
}

const CountrySelector = (props: any) => {
  console.log('🔈 ~ props', props)
  const [countryCode, setCountryCode] = useState('')
  console.log('🔈 ~ countryCode', countryCode)
  const getCountry = async () => {
    const data = await lookupIP()
    setCountryCode(data.countryCode)
  }

  const handleSelect = (value: string) => {
    setCountryCode(value)
  }

  useEffect(() => {
    getCountry()
  }, [])

  return (
    <Form.Item name="country" rules={[{ required: true }]}>
      <Select size="large" showSearch placeholder="Country" onChange={handleSelect} optionFilterProp="label">
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
