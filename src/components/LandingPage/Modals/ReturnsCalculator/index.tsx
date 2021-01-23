import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { useQuery } from '@apollo/client'
import { Modal, Space, Typography, Table, Divider } from 'antd'
import { PlusMinusInput, Disclaimer } from '~/ui-components'
import CompoundInterestChart from './CompoundInterestChart'
import { currencyRoundedFormatter } from '~/common/utils/formatters'
import { STATISTICS } from '~/common/queries'

const { Title, Paragraph } = Typography

interface ReturnsCalculatorModalProps {
  isVisible: boolean
  onClose: () => any
}

const Beside = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 48px;

  @media (max-width: ${(p) => p.theme.breakpoints.small}) {
    flex-direction: column;
  }
`

const StyledSpace = styled(Space)`
  width: 100%;
  max-width: 240px;
  margin-right: 32px;

  @media (max-width: ${(p) => p.theme.breakpoints.small}) {
    max-width: 100%;
    margin-right: 0;
  }
`

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;

  h2 {
    margin-bottom: 64px;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.small}) {
    margin-top: 48px;
  }
`

const Highlight = styled.span`
  color: ${(p) => p.theme.palette.success[500]};
`

const TableValue = styled.p`
  margin: 0;
  color: ${(p: any) => p.theme.palette[p.color][500]};
  ${(p: any) => (p.bold ? 'font-weight: 500;' : '')}
`

const ReturnsCalculatorModal = ({ isVisible, onClose }: ReturnsCalculatorModalProps) => {
  const { data } = useQuery(STATISTICS)
  const [initialDeposit, setInitialDeposit] = useState(1000)
  const [monthlyContribution, setMonthlyContribution] = useState(200)
  const [years, setYears] = useState(20)
  const [rateOfReturn, setRateOfReturn] = useState(20)

  const columns = [
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: `Future Value (${rateOfReturn.toFixed(2)}%)`,
      dataIndex: 'value',
      key: 'value',
      // @ts-ignore
      render: (value: number) => (
        <TableValue color="success" bold>
          {currencyRoundedFormatter.format(Math.floor(Number(value)))}
        </TableValue>
      ),
    },
    {
      title: 'Increase',
      dataIndex: 'difference',
      key: 'difference',
      render: (value: number) =>
        value > 0 ? (
          <TableValue color="text">+{currencyRoundedFormatter.format(Math.floor(Number(value)))}</TableValue>
        ) : (
          ''
        ),
    },
    {
      title: 'Total Contribution',
      dataIndex: 'totalContribution',
      key: 'totalContribution',
      render: (value: number) => (
        <TableValue color="primary">{currencyRoundedFormatter.format(Math.floor(Number(value)))}</TableValue>
      ),
    },
  ]

  useEffect(() => {
    if (data) setRateOfReturn(Math.floor(data.statisticsList.items[0].cAGR))
  }, [data])

  let yearByYearReturns = [...Array(years + 1).keys()].reduce((acc: any, _curr: number, i: number) => {
    if (i === 0) {
      acc[i] = {
        year: i,
        difference: 0,
        value: initialDeposit,
        totalContribution: initialDeposit,
      }
    } else {
      const yearlyContribution = monthlyContribution * 12
      const contribution = acc[i - 1].totalContribution + yearlyContribution
      const value = acc[i - 1].value * (1 + rateOfReturn / 100) + yearlyContribution
      acc[i] = {
        year: i,
        value,
        difference: value - acc[i - 1].value,
        totalContribution: contribution,
      }
    }

    return acc
  }, [])

  const futureBalance = yearByYearReturns[yearByYearReturns.length - 1].value

  return (
    <Modal
      title="Compound interest calculator"
      visible={isVisible}
      onOk={onClose}
      onCancel={onClose}
      footer={null}
      width={1000}
    >
      <Beside>
        <StyledSpace direction="vertical" size="middle">
          <div>
            <Title level={5}>Initial investment</Title>
            <Paragraph>Amount that you have available to invest initially.</Paragraph>
            <PlusMinusInput
              onChange={setInitialDeposit}
              value={initialDeposit}
              step={1000}
              min={0}
              formatter={(value: any) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
            />
          </div>
          <div>
            <Title level={5}>Monthly contribution</Title>
            <Paragraph>Amount that you plan to add to the principal every month.</Paragraph>
            <PlusMinusInput
              onChange={setMonthlyContribution}
              value={monthlyContribution}
              step={100}
              min={0}
              formatter={(value: any) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
            />
          </div>
          <div>
            <Title level={5}>Time in years</Title>
            <Paragraph>How many years you plan to invest.</Paragraph>
            <PlusMinusInput min={0} onChange={setYears} value={years} />
          </div>
          <div>
            <Title level={5}>Estimated rate of return</Title>
            <Paragraph>
              <strong>{data?.statisticsList?.items[0].cAGR}%</strong> was the average annual return for our strategy in
              the past.*
            </Paragraph>
            <PlusMinusInput
              min={0}
              onChange={setRateOfReturn}
              value={rateOfReturn}
              formatter={(value: any) => `${value}%`}
              parser={(value: any) => value.replace('%', '')}
            />
          </div>
        </StyledSpace>
        <ChartContainer>
          <Title level={2}>
            Balance in {years} year{years === 1 ? '' : 's'}:{' '}
            <Highlight>{currencyRoundedFormatter.format(Math.floor(Number(futureBalance)))}</Highlight>
          </Title>
          <CompoundInterestChart data={yearByYearReturns} />
        </ChartContainer>
      </Beside>
      <Divider />
      <Table
        size="small"
        dataSource={yearByYearReturns}
        columns={columns}
        pagination={{ hideOnSinglePage: true, pageSize: years + 1 }}
      />
      <Disclaimer>*Past returns does not guarantee similar future results.</Disclaimer>
    </Modal>
  )
}

export default ReturnsCalculatorModal
