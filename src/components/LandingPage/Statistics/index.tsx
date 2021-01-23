import React, { useState } from 'react'
import { Space } from 'antd'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { useQuery } from '@apollo/client'
import { transparentize } from 'polished'
import {
    StatisticsCard,
    ActionButton,
    ScalingTitle,
    LandingPageContainer,
    Beside,
    SpaceImage,
    Tag,
    Highlight,
    StockReturn,
    LoadingIndicator,
    LoadingTag,
    ButtonIcon
} from '~/ui-components'
import { useWindowSize } from '~/common/hooks'
import { STATISTICS } from '~/common/queries'
import { StatisticsModal, ReturnsCalculatorModal } from '../Modals'

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 64px;

    @media(max-width: ${p => p.theme.breakpoints.small}) {
        margin-left: 0;
    }
`

const Statistics = () => {
    const { data, loading, error } = useQuery(STATISTICS)
    const [dialogVisible, setDialogVisible] = useState(false)
    const [compoundInterestCalculatorVisible, setCompoundInterestCalculatorVisible] = useState(false)
    const windowSize = useWindowSize()
    const theme = useTheme()

    if (error) return null

    const statistics = data ? data.statisticsList.items[0] : {}
    const expectedReturn = ((statistics.winLossRatio / 100) * statistics.averageGainPerPosition - (1 - statistics.winLossRatio / 100) * statistics.averageLossPerPosition).toFixed(2)

    return (
        <LandingPageContainer marginBottom="4rem" >
            {!loading && <StatisticsModal isVisible={dialogVisible} onClose={() => setDialogVisible(false)} statistics={statistics} />}
            <ReturnsCalculatorModal isVisible={compoundInterestCalculatorVisible} onClose={() => setCompoundInterestCalculatorVisible(false)} />
            <Beside>
                <SpaceImage src="/images/space/space-0.svg" />
                <ContentContainer>
                    <Space direction="vertical" size="large">
                        <ScalingTitle>
                            Statistics & <Highlight>expectations</Highlight>
                        </ScalingTitle>
                        <Space direction="vertical" size="middle">
                            <StatisticsCard icon="percent" color={theme.palette.primary[500]}>
                                <p>stocks sold with a profit</p>
                                {loading ? <LoadingTag /> : <Tag color={theme.palette.primary[500]} backgroundColor={theme.palette.primary[100]}>{statistics.winLossRatio.toFixed(2)}%</Tag>}
                            </StatisticsCard>
                            <StatisticsCard icon="chart-line" color={theme.palette.success[500]}>
                                <p>Average return of the <strong>{loading ? <LoadingIndicator color={theme.palette.text[500]} /> : statistics.winLossRatio.toFixed(2)}%</strong> winning investments</p>
                                {loading ? <LoadingTag /> : <StockReturn percentReturn={statistics.averageGainPerPosition} />}
                            </StatisticsCard>
                            <StatisticsCard icon="chart-line-down" color={theme.palette.danger[500]}>
                                <p>Average loss of the <strong>{loading ? <LoadingIndicator color={theme.palette.text[500]} /> : (100 - statistics.winLossRatio).toFixed(2)}%</strong> losing investments</p>
                                {loading ? <LoadingTag /> : <StockReturn percentReturn={-statistics.averageLossPerPosition} />}
                            </StatisticsCard>
                            <StatisticsCard icon="money-bill-wave" color={theme.palette.success[500]}>
                                <p>Average expected return per investment</p>
                                {loading ? <LoadingTag /> : <StockReturn percentReturn={Number(expectedReturn)} />}
                            </StatisticsCard>
                            <StatisticsCard icon="hourglass-start" color={theme.palette.basic[500]}>
                                <p>Average holding period</p>
                                {loading ? <LoadingTag /> : <Tag color={theme.palette.text[500]} backgroundColor={theme.palette.basic[300]}>{statistics.averageHoldingPeriod} days</Tag>}
                            </StatisticsCard>
                        </Space>
                        <Space style={{ width: '100%' }} direction={windowSize.width < theme.breakpoints.values.small ? 'vertical' : 'horizontal'}>
                            <ActionButton onClick={() => setDialogVisible(true)}><ButtonIcon icon={['fad', 'analytics']} />SEE ADVANCED STATISTICS</ActionButton>
                            <ActionButton backgroundColor="#fff" color={theme.palette.text[500]} shadowColor={transparentize(0.5, theme.palette.basic[600])} onClick={() => setCompoundInterestCalculatorVisible(true)}><ButtonIcon icon={['fad', 'calculator']} />INTEREST CALCULATOR</ActionButton>
                        </Space>
                    </Space>
                </ContentContainer>
            </Beside>
        </LandingPageContainer>
    )
}

export default Statistics
