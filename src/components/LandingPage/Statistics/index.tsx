import React from 'react'
import { Space } from 'antd'
import styled from '@emotion/styled'
import { cardStyle, ActionButton, ScalingTitle, LandingPageContainer, Beside, SpaceImage, Tag, Highlight, StockReturn, SmallIconContainer } from '~/ui-components'
import theme from '~/lib/theme'
import { WIN_RATIO, AVG_GAIN, AVG_LOSS, EXPECTED_RETURN } from '~/common/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 64px;
`

const StatContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    p {
        margin: 0;
        margin-right: 16px;
    }
`

const StatCardContainer = styled.div`
    ${cardStyle};
    align-items: center;
    flex-direction: row;
    width: 100%;

    &:hover {
        background: ${p => p.theme.palette.basic[200]};
    }
`
const StatCardContent = styled.div`
    width: 100%;
`

const StatCard = ({ icon, color, children }: any) => (
    <StatCardContainer>
        <SmallIconContainer>
            <FontAwesomeIcon icon={['fad', icon]} color={color} />
        </SmallIconContainer>
        <StatCardContent>{children}</StatCardContent>
    </StatCardContainer>
)

const Statistics = () => (
    <LandingPageContainer marginBottom="8vw" >
        <Beside>
            <SpaceImage src="/images/space/space-0.svg" />
            <ContentContainer>
                <Space direction="vertical" size="large">
                    <ScalingTitle>
                        Statistics & <Highlight>expectations</Highlight>
                    </ScalingTitle>
                    <Space direction="vertical" size="middle">
                        <StatCard icon="percent" color={theme.palette.primary[500]}>
                            <StatContainer>
                                <p>stocks sold with a profit</p>
                                <Tag color={theme.palette.primary[500]} backgroundColor={theme.palette.primary[100]}>{WIN_RATIO}%</Tag>
                            </StatContainer>
                        </StatCard>
                        <StatCard icon="chart-line" color={theme.palette.success[500]}>
                            <StatContainer>
                                <p>Average return of the <strong>{WIN_RATIO}%</strong> winning investments</p>
                                <StockReturn percentReturn={AVG_GAIN} />
                            </StatContainer>
                        </StatCard>
                        <StatCard icon="chart-line-down" color={theme.palette.danger[500]}>
                            <StatContainer>
                                <p>Average loss of the <strong>{(100 - WIN_RATIO).toFixed(2)}%</strong> losing investments</p>
                                <StockReturn percentReturn={-AVG_LOSS} />
                            </StatContainer>
                        </StatCard>
                        <StatCard icon="money-bill-wave" color={theme.palette.success[500]}>
                            <StatContainer>
                                <p>Average expected return per investment</p>
                                <StockReturn percentReturn={Number(EXPECTED_RETURN)} />
                            </StatContainer>
                        </StatCard>
                        <StatCard icon="hourglass-start" color={theme.palette.basic[500]}>
                            <StatContainer>
                                <p>Average holding period</p>
                                <Tag color={theme.palette.text[500]} backgroundColor={theme.palette.basic[300]}>2.4 years</Tag>
                            </StatContainer>
                        </StatCard>
                    </Space>
                    <ActionButton>SEE ADVANCED STATISTICS</ActionButton>
                </Space>
            </ContentContainer>
        </Beside>
    </LandingPageContainer>
)

export default Statistics
