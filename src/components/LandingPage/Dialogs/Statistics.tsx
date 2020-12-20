import React from 'react'
import styled from '@emotion/styled'
import { Modal, Space } from 'antd';
import { StatisticsCard, Tag } from '~/ui-components'
import theme from '~/lib/theme'

const StyledSpace = styled(Space)`
    width: 100%;
`

interface StatisticsDialogProps {
    isVisible: boolean;
    onClose: () => any;
}

const Paragraph = styled.p`
    margin: 0;
    text-align: center;
`

const StatisticsDialog = ({ isVisible, onClose }: StatisticsDialogProps) => (
    <Modal title="Advanced statistics" visible={isVisible} onOk={onClose} onCancel={onClose} footer={null} width={600}>
        <StyledSpace direction="vertical" size="middle">
            <StatisticsCard icon="chart-line" color={theme.palette.success[500]}>
                <p>CAGR (Compound annual growth rate)</p>
                <Tag color={theme.palette.success[500]} backgroundColor={theme.palette.success[100]}>+30.12%</Tag>
            </StatisticsCard>
            <Paragraph>Ratios</Paragraph>
            <StatisticsCard icon="balance-scale-right" color={theme.palette.primary[500]}>
                <p>Gain to Pain ratio</p>
                <Tag color={theme.palette.primary[500]} backgroundColor={theme.palette.primary[100]}>{2.39697}</Tag>
            </StatisticsCard>
            <StatisticsCard icon="analytics" color={theme.palette.primary[500]}>
                <p>Sortino ratio (monthly)</p>
                <Tag color={theme.palette.primary[500]} backgroundColor={theme.palette.primary[100]}>{2.101927}</Tag>
            </StatisticsCard>
            <StatisticsCard icon="abacus" color={theme.palette.primary[500]}>
                <p>Sharpe ratio (monthly)</p>
                <Tag color={theme.palette.primary[500]} backgroundColor={theme.palette.primary[100]}>1.20</Tag>
            </StatisticsCard>
            <StatisticsCard icon="calculator" color={theme.palette.primary[500]}>
                <p>Calmar ratio (3 year)</p>
                <Tag color={theme.palette.primary[500]} backgroundColor={theme.palette.primary[100]}>{6.4997}</Tag>
            </StatisticsCard>
            <Paragraph>IRR</Paragraph>
            <StatisticsCard icon="percent" color={theme.palette.success[500]}>
                <p>IRR arithmetic mean</p>
                <Tag color={theme.palette.success[500]} backgroundColor={theme.palette.success[100]}>+108.01%</Tag>
            </StatisticsCard>
            <StatisticsCard icon="percent" color={theme.palette.success[500]}>
                <p>IRR geometric mean</p>
                <Tag color={theme.palette.success[500]} backgroundColor={theme.palette.success[100]}>+48.66%</Tag>
            </StatisticsCard>
            <Paragraph>Max drawdown</Paragraph>
            <StatisticsCard icon="chart-line-down" color={theme.palette.danger[500]}>
                <p>Max Drawdown (36 months)</p>
                <Tag color={theme.palette.danger[500]} backgroundColor={theme.palette.danger[100]}>-22.97%</Tag>
            </StatisticsCard>
            <StatisticsCard icon="chart-line-down" color={theme.palette.danger[500]}>
                <p>Max Drawdown (50 years)</p>
                <Tag color={theme.palette.danger[500]} backgroundColor={theme.palette.danger[100]}>-47.85%</Tag>
            </StatisticsCard>
            <Paragraph>Need more statistics? Contact us</Paragraph>
        </StyledSpace>
    </Modal >
)

export default StatisticsDialog
