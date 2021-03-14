import React from 'react'
import styled from '@emotion/styled'
import { Modal, Space } from 'antd'
import { StatisticsCard, Tag } from 'src/ui-components'
import theme from 'src/lib/theme'

const StyledSpace = styled(Space)`
  width: 100%;
`

interface StatisticsModalProps {
  isVisible: boolean
  onClose: () => any
  statistics: any
}

const Paragraph = styled.p`
  margin: 0;
  text-align: center;
`

const StatisticsModal = ({ isVisible, statistics, onClose }: StatisticsModalProps) => (
  <Modal title="Advanced statistics" visible={isVisible} onOk={onClose} onCancel={onClose} footer={null} width={600}>
    <StyledSpace direction="vertical" size="middle">
      <StatisticsCard icon="chart-line" color={theme.palette.success[600]}>
        <p>CAGR (Compound annual growth rate)</p>
        <Tag color={theme.palette.success[600]} backgroundColor={theme.palette.success[100]}>
          +{statistics.cAGR}%
        </Tag>
      </StatisticsCard>
      <Paragraph>Ratios</Paragraph>
      <StatisticsCard icon="balance-scale-right" color={theme.palette.primary[600]}>
        <p>Gain to Pain ratio</p>
        <Tag color={theme.palette.primary[600]} backgroundColor={theme.palette.primary[100]}>
          {statistics.gainToPainRatio}
        </Tag>
      </StatisticsCard>
      <StatisticsCard icon="analytics" color={theme.palette.primary[600]}>
        <p>Sortino ratio</p>
        <Tag color={theme.palette.primary[600]} backgroundColor={theme.palette.primary[100]}>
          {statistics.sortinoRatio}
        </Tag>
      </StatisticsCard>
      <StatisticsCard icon="abacus" color={theme.palette.primary[600]}>
        <p>Sharpe ratio</p>
        <Tag color={theme.palette.primary[600]} backgroundColor={theme.palette.primary[100]}>
          {statistics.sharpeRatio.toFixed(2)}
        </Tag>
      </StatisticsCard>
      <StatisticsCard icon="calculator" color={theme.palette.primary[600]}>
        <p>Calmar ratio (3 year)</p>
        <Tag color={theme.palette.primary[600]} backgroundColor={theme.palette.primary[100]}>
          {statistics.cALMARRatio3Year}
        </Tag>
      </StatisticsCard>
      <Paragraph>IRR</Paragraph>
      <StatisticsCard icon="percent" color={theme.palette.success[600]}>
        <p>IRR arithmetic mean</p>
        <Tag color={theme.palette.success[600]} backgroundColor={theme.palette.success[100]}>
          +{statistics.iRRArithmeticMean}%
        </Tag>
      </StatisticsCard>
      <StatisticsCard icon="percent" color={theme.palette.success[600]}>
        <p>IRR geometric mean</p>
        <Tag color={theme.palette.success[600]} backgroundColor={theme.palette.success[100]}>
          +{statistics.iRRGeometricMean}%
        </Tag>
      </StatisticsCard>
      <Paragraph>Max drawdown</Paragraph>
      <StatisticsCard icon="chart-line-down" color={theme.palette.danger[600]}>
        <p>Max Drawdown (36 months)</p>
        <Tag color={theme.palette.danger[600]} backgroundColor={theme.palette.danger[100]}>
          -{statistics.maxDrawdown36Months.toFixed(2)}%
        </Tag>
      </StatisticsCard>
      <StatisticsCard icon="chart-line-down" color={theme.palette.danger[600]}>
        <p>Max Drawdown (50 years)</p>
        <Tag color={theme.palette.danger[600]} backgroundColor={theme.palette.danger[100]}>
          -{statistics.maxDrawdown45Years.toFixed(2)}%
        </Tag>
      </StatisticsCard>
      <Paragraph>Need more statistics? Contact us</Paragraph>
    </StyledSpace>
  </Modal>
)

export default StatisticsModal
