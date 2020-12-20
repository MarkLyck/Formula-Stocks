import React, { useState } from 'react'
import { Space } from 'antd'
import styled from '@emotion/styled'
import {
    StatisticsCard,
    ActionButton,
    ScalingTitle,
    LandingPageContainer,
    Beside,
    SpaceImage,
    Tag,
    Highlight,
    StockReturn
} from '~/ui-components'
import theme from '~/lib/theme'
import { WIN_RATIO, AVG_GAIN, AVG_LOSS, EXPECTED_RETURN } from '~/common/constants'
import { StatisticsDialog } from '../Dialogs'

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 64px;
`

const Statistics = () => {
    const [dialogVisible, setDialogVisible] = useState(false)

    return (
        <LandingPageContainer marginBottom="8vw" >
            <StatisticsDialog isVisible={dialogVisible} onClose={() => setDialogVisible(false)} />
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
                                <Tag color={theme.palette.primary[500]} backgroundColor={theme.palette.primary[100]}>{WIN_RATIO}%</Tag>
                            </StatisticsCard>
                            <StatisticsCard icon="chart-line" color={theme.palette.success[500]}>
                                <p>Average return of the <strong>{WIN_RATIO}%</strong> winning investments</p>
                                <StockReturn percentReturn={AVG_GAIN} />
                            </StatisticsCard>
                            <StatisticsCard icon="chart-line-down" color={theme.palette.danger[500]}>
                                <p>Average loss of the <strong>{(100 - WIN_RATIO).toFixed(2)}%</strong> losing investments</p>
                                <StockReturn percentReturn={-AVG_LOSS} />
                            </StatisticsCard>
                            <StatisticsCard icon="money-bill-wave" color={theme.palette.success[500]}>
                                <p>Average expected return per investment</p>
                                <StockReturn percentReturn={Number(EXPECTED_RETURN)} />
                            </StatisticsCard>
                            <StatisticsCard icon="hourglass-start" color={theme.palette.basic[500]}>
                                <p>Average holding period</p>
                                <Tag color={theme.palette.text[500]} backgroundColor={theme.palette.basic[300]}>826 days</Tag>
                            </StatisticsCard>
                        </Space>
                        <ActionButton onClick={() => setDialogVisible(true)}>SEE ADVANCED STATISTICS</ActionButton>
                    </Space>
                </ContentContainer>
            </Beside>
        </LandingPageContainer>
    )
}

export default Statistics
