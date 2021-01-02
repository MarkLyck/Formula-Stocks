import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Modal, Button } from 'antd'
import { Element } from 'react-scroll'
import { useQuery } from '@apollo/client'
import fetch from 'isomorphic-unfetch'
import { Tabs } from 'antd'
import { COMPANY_NAME } from '~/common/constants'

import { LandingPageContainer, Disclaimer, ScalingTitle, ScalingSubTitle } from '~/ui-components'
import LaunchChart from './LaunchChart'
import BacktestedChart from './BacktestedChart'
// import FSApolloClient from '~/common/FSApolloClient'
import { LAUNCH_PERFORMANCE_HISTORY, BACKTESTED_PERFORMANCE_HISTORY, MARKET_PRICE_HISTORY } from '~/common/queries'
import YearlyReturns from './YearlyReturns'

// @ts-ignore
if (!process.browser) {
  // @ts-ignore
  global.fetch = fetch
}

const StyledTabs = styled(Tabs)`
  width: 100%;
  margin-bottom: 32px;

  .ant-tabs-nav-wrap {
    display: flex;
    justify-content: center;
  }

  .ant-tabs-nav-scroll {
    display: flex;
    justify-content: center;
  }

  && {
    .ant-tabs-tabpane {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      @media (max-width: 500px) {
        padding: 0 16px;
      }
    }
  }
`

const AuditorLogo = styled.img`
  height: 24px;
  width: auto;
  transform: translateY(-7px);
`

const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 0;
  }
`

const Performance = () => {
  const [returnsModalVisible, setReturnsModalVisible] = useState(false)
  const [chartType, setChartType] = useState('launch')

  const Query = chartType === 'launch' ? LAUNCH_PERFORMANCE_HISTORY : BACKTESTED_PERFORMANCE_HISTORY
  const { data: planData, loading: planLoading } = useQuery(Query, {
    // client: FSApolloClient,
  })

  const { data: marketData, loading: marketLoading } = useQuery(MARKET_PRICE_HISTORY, {
    variables: {
      marketType: chartType === 'launch' ? 'DJIA' : 'SP500',
      fromDate: chartType === 'launch' ? '2009-01-30' : '1970-01-30',
    },
    // client: FSApolloClient,
  })


  let planPerformance = []
  let marketPrices = []

  if (planData) planPerformance = planData.plan[chartType === 'launch' ? 'launchHistory' : 'backtestedHistory'] || []
  if (marketData) marketPrices = marketData.marketPricingHistoriesList.items || []

  const switchChartType = (key: string) => setChartType(key === '1' ? 'launch' : 'backtested')
  const toggleModal = () => setReturnsModalVisible(!returnsModalVisible)

  return (
    <LandingPageContainer align="center">
      <Element name="performance" />
      {/* <StyledLazyLoad height={690} width="100%" offset={500} once> */}
      <>
        <ScalingTitle>Performance</ScalingTitle>
        <StyledTabs defaultActiveKey="1" onChange={switchChartType}>
          <Tabs.TabPane tab="2009 - 2020 Live Performance" key="1">
            <ScalingSubTitle>Growth since our 2009 launch, compared to the Dow Jones Industrial Average.</ScalingSubTitle>
            {chartType === 'launch' ? (
              <LaunchChart
                id={`single-launch-performance-graph`}
                name={COMPANY_NAME}
                marketName="DJIA"
                isLoading={!planPerformance.length || !marketPrices.length}
                planPerformance={planPerformance}
                marketPrices={marketPrices}
              />
            ) : null}
            {/* <Disclaimer>*Past performance verified by 3rd party auditor</Disclaimer> */}
            <Button onClick={toggleModal}>See yearly returns</Button>
          </Tabs.TabPane>
          <Tabs.TabPane tab="1970 - 2020 Backtested Performance" key="2">
            <ScalingSubTitle>
              Backtested Logarithmic Chart showing how <b>$25,000</b> would have grown since 1970
              </ScalingSubTitle>
            {chartType === 'backtested' ? (
              <BacktestedChart
                id={`single-backtested-performance-graph`}
                name={`${COMPANY_NAME} (backtested)`}
                marketName="S&P 500"
                isLoading={planLoading || marketLoading || !planPerformance.length || !marketPrices.length}
                planPerformance={planPerformance}
                marketPrices={marketPrices}
              />
            ) : null}
            <Disclaimer>
              *Historical numbers are based on backtested data. Since our 2009 launch we have observed similar results
              in real time.
              </Disclaimer>
            <Button onClick={toggleModal}>See yearly returns</Button>
          </Tabs.TabPane>
        </StyledTabs>
        <StyledModal
          title="Yearly returns"
          visible={returnsModalVisible}
          onCancel={toggleModal}
          footer={[
            <Button key="back" onClick={toggleModal} size="large">
              Dismiss
              </Button>,
          ]}
        >
          <YearlyReturns monthlyPerformance={planPerformance} chartType={chartType} />
        </StyledModal>
      </>
      {/* </StyledLazyLoad> */}
    </LandingPageContainer>
  )
}

export default React.memo(Performance)
