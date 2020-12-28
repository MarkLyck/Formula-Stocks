import React from 'react'
import styled from '@emotion/styled'
import { Modal, Space } from 'antd';
import { COMPANY_NAME } from '~/common/constants'

interface PerformanceGuaranteeModalProps {
    isVisible: boolean;
    onClose: () => any;
}

const Paragraph = styled.p`
    margin: 0;
`

const Underline = styled.span`
    text-decoration: underline;
    font-weight: bold;
`

const PerformanceGuaranteeModal = ({ isVisible, onClose }: PerformanceGuaranteeModalProps) => (
    <Modal title="Performance Guarantee" visible={isVisible} onOk={onClose} onCancel={onClose} footer={null} width={600}>
        <Space direction="vertical" size="middle">
            <Paragraph>
                If our strategy has not outperformed the S&P500 (SPX) over a period of 24 months from the date of signup. You are eligible for a full refund of all payments made to {COMPANY_NAME}.
                <br />
                <br />
                <Underline>The refund does not include any potential losses you might have incurred investing in the stock market, only payments made to {COMPANY_NAME}*</Underline>
                <br />
                <br />
                Since {COMPANY_NAME} launched in 2009 our strategy has consistently outperfomed the S&P500 index in the vast majority of years.
                <br />
                <br />
                Criteria for eligibility:
                <br />
                <br />
                $1,000 invested in the S&P500 index on the date of your signup, would have to be worth more 24 months later, than $1,000 invested in the {COMPANY_NAME} portfolio over the same time-period.
                <br />
                <br />
                This assumes no trading fees & no slippage, it also and you could invest the $1,000 in partial stocks (to be fully invested). This also assumes you re-invested your dividends as we highly recommend anyway for optimum performance.
                <br />
                <br />
                To be eligible for this guarantee, you must have been subscribed and continuously paid for the service during the first 24 months since your signup-date.
                <br />
                <br />
                If you have any more questions about our performance guarantee, just ask us!
            </Paragraph>
        </Space>
    </Modal >
)

export default PerformanceGuaranteeModal
