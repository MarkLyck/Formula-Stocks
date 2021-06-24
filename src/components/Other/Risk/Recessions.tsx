import React from 'react'
import styled from '@emotion/styled'
import { Table } from 'antd'

const Value = styled.span`
  font-weight: bold;
  color: ${(props: { positive?: boolean; value?: any; theme: any }) => {
    if (props.value) {
      return props.positive ? props.theme.palette.success[600] : props.theme.palette.danger[600]
    }
    return props.theme.palette.neutral[600]
  }};
`

const data = [
  {
    key: '1973 - Stock market crash',
    system: ((20005 - 38364) / 38364) * 100,
    market: ((18566 - 32775) / 32775) * 100,
    systemRecover: '15 months',
    marketRecover: '67 months',
  },
  {
    key: '1987 - Black Monday',
    system: ((2599848 - 3929655) / 3929655) * 100,
    market: ((241 - 329.4) / 329.4) * 100,
    systemRecover: '12 months',
    marketRecover: `23 months`,
  },
  {
    key: '1990 - Recession',
    system: ((6164344 - 7473437) / 7473437) * 100,
    market: ((307.12 - 360.39) / 360.39) * 100,
    systemRecover: '6 months',
    marketRecover: '4 months',
  },
  {
    key: '2000-2003 - Dot-com Bubble',
    system: ((1411691190 - 620865298) / 620865298) * 100,
    market: ((837.03 - 1485.46) / 1485.46) * 100,
    systemRecover: '',
    marketRecover: '51 months',
  },
  {
    key: '2007-2009 - Financial Crisis',
    system: ((4959162827 - 8397068637) / 8397068637) * 100,
    market: ((757.13 - 1520.71) / 1520.71) * 100,
    systemRecover: '10 months',
    marketRecover: '47 months',
  },
  {
    key: '2011 - Short bear market',
    system: ((12419348519 - 13977877585) / 13977877585) * 100,
    market: ((1173.88 - 1338.31) / 1338.31) * 100,
    systemRecover: '2 months',
    marketRecover: '10 months',
  },
  {
    key: '2020 - COVID-19 crisis',
    system: ((2529652717 - 2913322334) / 2913322334) * 100,
    market: ((219.23 - 285.1) / 285.1) * 100,
    systemRecover: '2 months',
    marketRecover: '5 months',
  },
]

const columns = [
  {
    title: 'Event',
    dataIndex: 'key',
    key: 'key',
    render: (value: any) => {
      return <Value>{value}</Value>
    },
  },
  {
    title: 'Formula Stocks',
    dataIndex: 'system',
    key: 'key',
    render: (value: any) => {
      // @ts-ignore
      return <Value positive={value > 0} value>{`${value > 0 ? '+' : ''}${value.toFixed(2)}%`}</Value>
    },
  },
  {
    title: 'Time to Recover (FS)',
    dataIndex: 'systemRecover',
    key: 'key',
    render: (value: any) => {
      return <Value>{value}</Value>
    },
  },
  {
    title: 'S&P 500',
    dataIndex: 'market',
    key: 'key',
    render: (value: any) => {
      // @ts-ignore
      return <Value value>{`${value > 0 ? '+' : ''}${value.toFixed(2)}%`}</Value>
    },
  },
  {
    title: 'Time to Recover (Market)',
    dataIndex: 'marketRecover',
    key: 'key',
    render: (value: any) => {
      return <Value>{value}</Value>
    },
  },
]

const Recessions = () => {
  return (
    <div>
      <Table dataSource={data} columns={columns} pagination={false} />
    </div>
  )
}

export default Recessions
