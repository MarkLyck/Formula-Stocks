import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Modal, Space, Typography, Table } from 'antd';
import { PlusMinusInput } from '~/ui-components'
import CompoundInterestChart from './CompoundInterestChart'
import { currencyRoundedFormatter } from '~/common/utils/formatters'

const { Title, Paragraph } = Typography

interface ReturnsCalculatorModalProps {
    isVisible: boolean;
    onClose: () => any;
}

const Beside = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 24px;
`

const StyledSpace = styled(Space)`
    width: 100%;
    max-width: 240px;
    margin-right: 32px;
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
`

const Highlight = styled.span`
    color: ${p => p.theme.palette.success[500]};
`

const columns = [
    {
        title: 'Years',
        dataIndex: 'year',
        key: 'year',
    },
    {
        title: 'Future Value (20.00%)',
        dataIndex: 'value',
        key: 'value',
        render: value => <p>{currencyRoundedFormatter.format(Math.floor(Number(value)))}</p>,
    },
    {
        title: 'Your Contributions',
        dataIndex: 'totalContribution',
        key: 'totalContribution',
        render: value => <p>{currencyRoundedFormatter.format(Math.floor(Number(value)))}</p>,
    },
]


const ReturnsCalculatorModal = ({ isVisible, onClose }: ReturnsCalculatorModalProps) => {
    const [initialDeposit, setInitialDeposit] = useState(1000)
    const [monthlyContribution, setMonthlyContribution] = useState(200)
    const [years, setYears] = useState(20)
    const [rateOfReturn, setRateOfReturn] = useState(20)

    let yearByYearReturns = [...Array(years + 1).keys()].reduce((acc: any, _curr: number, i: number) => {
        if (i === 0) {
            acc[i] = {
                year: i,
                value: initialDeposit,
                totalContribution: initialDeposit
            }
        } else {
            const yearlyContribution = monthlyContribution * 12
            const contribution = acc[i - 1].totalContribution + yearlyContribution
            const value = (acc[i - 1].value) * (1 + (rateOfReturn / 100)) + yearlyContribution
            acc[i] = {
                year: i,
                value,
                totalContribution: contribution
            }
        }


        return acc
    }, [])

    const futureBalance = yearByYearReturns[yearByYearReturns.length -1].value

    return (
        <Modal title="Compound interest calculator" visible={isVisible} onOk={onClose} onCancel={onClose} footer={null} width={1000}>
            <Beside >
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
                        <Paragraph>Amount that you plan to add to the principal every month.</Paragraph>
                        <PlusMinusInput
                            min={0}
                            onChange={setYears}
                            value={years}
                        />
                    </div>
                    <div>
                        <Title level={5}>Estimated rate of return</Title>
                        <Paragraph>Annual interest rate.</Paragraph>
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
                    <Title level={2}>Future balance: <Highlight>{currencyRoundedFormatter.format(Math.floor(Number(futureBalance)))}</Highlight></Title>
                    <CompoundInterestChart data={yearByYearReturns} />
                </ChartContainer>
            </Beside>
            <Table dataSource={yearByYearReturns} columns={columns} pagination={{ hideOnSinglePage: true, pageSize: years + 1 }} />
        </Modal >
    )
}

export default ReturnsCalculatorModal
