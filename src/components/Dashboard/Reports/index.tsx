import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import Highlighter from 'react-highlight-words'
import { Row, Col, Table, Input, Button, Typography } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useWindowSize } from 'src/common/hooks'
import { getIndustryIcon } from 'src/components/Dashboard/Reports/utils'
import { ButtonIcon, DashboardHeader, Ticker, LoadingError } from 'src/ui-components'
import { DASHBOARD_GUTTER_SIZE } from 'src/common/constants'
import { SEARCH_REPORTS_QUERY } from 'src/common/queries'
import { AIScoreValue } from 'src/ui-components'
const { Text } = Typography
const { Search } = Input

const AIScoreBox = styled.div`
  display: flex;
  background-color: #fff;
  border: 1px solid #ebedf5;
  border-radius: 4px;
  box-shadow: 0 4px 14px 0 rgba(111, 120, 156, 0.08);
  box-sizing: border-box;

  .ant-table-wrapper {
    width: 100%;
  }

  .ant-table-pagination.ant-pagination {
    margin-right: 16px;
  }
`

export const HowToUseThisButton = styled(Button)`
  color: ${(props: any) => props.theme.palette.primary[600]};
  margin: 24px auto 0;

  &:hover {
    text-decoration: underline;
  }
`

const FilterIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const Reports = () => {
  const router = useRouter()
  const windowSize = useWindowSize()
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')

  const { loading, error, data } = useQuery(SEARCH_REPORTS_QUERY, {
    variables: {
      search: searchText,
    },
  })

  const onMainSearch = (val: string) => {
    setSearchedColumn('')
    setSearchText(val)
  }

  if (error) return <LoadingError error={error} />

  const handleSearch = (selectedKeys: any[], confirm: () => void, dataIndex: any) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  let searchInput: any

  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e: any) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          // @ts-ignore
          icon={<ButtonIcon icon="search" buttonSize="small" />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <FilterIconContainer>
        <FontAwesomeIcon icon="search" style={{ color: filtered ? '#1890ff' : undefined }} />
      </FilterIconContainer>
    ),
    onFilter: (value: any, record: any) => {
      return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
    },
    onFilterDropdownVisibleChange: (visible?: boolean) => {
      if (visible) {
        setTimeout(() => searchInput.select())
      }
    },
    render: (text: any) => {
      const displayText = dataIndex === 'ticker' ? text.replace('_', '.') : text
      return searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={displayText.toString()}
        />
      ) : (
        displayText
      )
    },
  })

  const columns = [
    {
      title: 'Ticker',
      dataIndex: 'ticker',
      width: windowSize.width > 600 ? 160 : 120,
      sorter: (a: any, b: any) => (a.ticker < b.ticker ? 1 : -1),
      ...getColumnSearchProps('ticker'),
      render: (ticker: string) => <Ticker ticker={ticker} />,
    },
    {
      title: 'AI Score',
      dataIndex: 'aIScore',
      defaultSortOrder: 'descend',
      width: 130,
      sorter: (a: any, b: any) => a.aIScore - b.aIScore,
      render: (aiScore: number) => <AIScoreValue score={aiScore * 100} />,
    },
  ]

  if (windowSize.width > 460) {
    columns.splice(1, 0, {
      title: 'Name',
      dataIndex: 'name',
      // @ts-ignore
      ellipsis: true,
      sorter: (a: any, b: any) => (a.ticker < b.ticker ? 1 : -1),
      ...getColumnSearchProps('name'),
    })
  }

  if (windowSize.width > 720) {
    // @ts-ignore
    columns.splice(2, 0, {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a: any, b: any) => a.price - b.price,
      render: (price: any) => <Text>{formatter.format(price)}</Text>,
    })
  }

  if (windowSize.width > 1000) {
    columns.splice(2, 0, {
      title: 'Sector',
      dataIndex: 'sector',
      // @ts-ignore
      ellipsis: true,
      sorter: (a: any, b: any) => (a.sector < b.sector ? 1 : -1),
      ...getColumnSearchProps('sector'),
    })
  }

  if (windowSize.width > 1200) {
    columns.splice(3, 0, {
      title: 'Industry',
      dataIndex: 'industry',
      // @ts-ignore
      ellipsis: true,
      sorter: (a: any, b: any) => (a.industry < b.industry ? 1 : -1),
      ...getColumnSearchProps('industry'),
      render: (sector: string) => (
        <div>
          {/* @ts-ignore */}
          <FontAwesomeIcon icon={['fad', getIndustryIcon(sector)]} style={{ marginRight: 8 }} />
          {sector}
        </div>
      ),
    })
  }

  const reports =
    data && data.aIReportsList
      ? data.aIReportsList.items.map((report: any) => ({
          key: report.ticker,
          ...report,
        }))
      : []

  return (
    <>
      <Row gutter={DASHBOARD_GUTTER_SIZE}>
        <Col span={18}>
          <DashboardHeader showExchangeStatuses={false} />
        </Col>
        <Col span={6}>
          <Search placeholder="search for a stock" onSearch={onMainSearch} />
        </Col>
      </Row>
      <Row gutter={[DASHBOARD_GUTTER_SIZE, DASHBOARD_GUTTER_SIZE]}>
        <Col span={24}>
          <AIScoreBox>
            <Table
              // @ts-ignore
              columns={columns}
              dataSource={reports}
              loading={loading}
              ellipsis={true}
              onRow={(record) => ({
                onClick: () => router.push(`/dashboard/reports/${record.ticker.replace('_', '.')}`),
              })}
              pagination={{ simple: windowSize.width < 600 ? true : false }}
            />
          </AIScoreBox>
        </Col>
      </Row>
    </>
  )
}

export default Reports
