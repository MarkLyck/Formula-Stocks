import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Space, Modal, Button, Switch, Typography } from 'antd'
import { Element } from 'react-scroll'
import { useQuery } from '@apollo/client'
import { Tabs } from 'antd'
import useBreakpoint from '@w11r/use-breakpoint'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { COMPANY_NAME } from 'src/common/constants'
import { LandingPageContainer, Disclaimer, ScalingTitle, ScalingSubTitle, ButtonIcon } from 'src/ui-components'
import LaunchChart from './LaunchChart'
import AnimatedChart from './AnimatedChart'
import BacktestedChart from './BacktestedChart'
// import FSApolloClient from 'src/common/FSApolloClient'
import { LAUNCH_PERFORMANCE_HISTORY, BACKTESTED_PERFORMANCE_HISTORY, MARKET_PRICE_HISTORY } from 'src/common/queries'
import YearlyReturns from './YearlyReturns'
import { ReturnsCalculatorModal } from 'src/components/LandingPage/Modals'

const { Text } = Typography

const StyledTabs = styled(Tabs)`
  width: 100%;
  margin-top: 16px;
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

// const AuditorLogo = styled.img`
//   height: 24px;
//   width: auto;
//   transform: translateY(-7px);
// `

const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 0;
  }
`

const ButtonContainer = styled(Space)`
  @media (max-width: ${(p) => p.theme.breakpoints.small}) {
    width: 100%;
  }
`

const LogSwitchContainer = styled.div`
  display: inline-flex;
  align-items: center;
  margin-left: auto;
  font-size: 16px;
  position: absolute;
  right: 16px;
`

const Performance = ({ padding }: any) => {
  const [tabKey, setTabKey] = useState('0')
  const [returnsModalVisible, setReturnsModalVisible] = useState(false)
  const [calculatorVisible, setCalculatorVisible] = useState(false)
  const [log, setLog] = useState(true)
  const [chartType, setChartType] = useState('backtested')
  const { 'isMobile-': isMobileMinus } = useBreakpoint()

  const Query = chartType === 'launch' ? LAUNCH_PERFORMANCE_HISTORY : BACKTESTED_PERFORMANCE_HISTORY
  const { data: planData, loading: planLoading, error: planError } = useQuery(Query, {
    variables: {
      plan: 'entry',
    },
    // client: FSApolloClient,
  })

  const { data: marketData } = useQuery(MARKET_PRICE_HISTORY, {
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

  const setTab = (key: string) => {
    setTabKey(key)
    setChartType(key === '2' ? 'launch' : 'backtested')
  }

  const toggleModal = () => setReturnsModalVisible(!returnsModalVisible)

  return (
    <LandingPageContainer align="center" style={{ marginBottom: 32, padding }}>
      <Element name="performance" />
      <>
        <ScalingTitle>Performance</ScalingTitle>
        <StyledTabs activeKey={tabKey} onChange={setTab} type="card">
          <Tabs.TabPane
            tab={
              <>
                <FontAwesomeIcon icon={['fad', 'play-circle']} style={{ marginRight: 8 }} />
                Portfolio simulation
              </>
            }
            key="0"
          >
            <ScalingSubTitle>
              How <b>$25,000</b> invested with Formula Stocks in 1970 would have multiplied.
            </ScalingSubTitle>
            <AnimatedChart
              planPerformance={planPerformance}
              isLoading={planLoading}
              error={planError}
              setTab={setTab}
            />
            <Disclaimer>
              *Historical numbers are based on backtested data. Since our 2009 launch we have observed similar results
              in real-time.
            </Disclaimer>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <>
                <FontAwesomeIcon icon={['fad', 'chart-line']} style={{ marginRight: 8 }} />
                1970 - {new Date().getFullYear()} Backtested Performance
              </>
            }
            key="1"
          >
            <ScalingSubTitle>
              {log && 'Log scale '}chart showing how <b>$25,000</b> would have multiplied since 1970
              <LogSwitchContainer>
                <Text>Logarithmic</Text>
                <Switch checked={log} style={{ marginLeft: 8 }} onChange={setLog} />
              </LogSwitchContainer>
            </ScalingSubTitle>
            {chartType === 'backtested' ? (
              <BacktestedChart
                name={COMPANY_NAME}
                marketName="S&P 500"
                isLoading={planLoading}
                error={planError}
                planPerformance={planPerformance}
                marketPrices={marketPrices}
                log={log}
              />
            ) : null}
            <Disclaimer>
              *Historical numbers are based on backtested data. Since our 2009 launch we have observed similar results
              in real-time.
            </Disclaimer>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <>
                <FontAwesomeIcon icon={['fad', 'stop-circle']} style={{ marginRight: 8 }} />
                2009 - {new Date().getFullYear()} Live Performance
              </>
            }
            key="2"
          >
            <ScalingSubTitle>
              Growth since our 2009 launch, compared to the Dow Jones Industrial Average.
            </ScalingSubTitle>
            {chartType === 'launch' ? (
              <LaunchChart
                name={COMPANY_NAME}
                marketName="DJIA"
                isLoading={planLoading}
                error={planError}
                planPerformance={planPerformance}
                marketPrices={marketPrices}
              />
            ) : null}
            {/* <Disclaimer>*Past performance verified by 3rd party auditor</Disclaimer> */}
          </Tabs.TabPane>
        </StyledTabs>
        <ButtonContainer direction={isMobileMinus ? 'vertical' : 'horizontal'}>
          <Button
            block={isMobileMinus ? true : false}
            size="large"
            icon={<ButtonIcon icon={['fad', 'calculator']} />}
            onClick={() => setCalculatorVisible(true)}
          >
            Interest calculator
          </Button>
          <Button
            block={isMobileMinus ? true : false}
            size="large"
            icon={<ButtonIcon icon={['fad', 'calendar']} />}
            onClick={toggleModal}
          >
            See yearly returns
          </Button>
        </ButtonContainer>
        <ReturnsCalculatorModal isVisible={calculatorVisible} onClose={() => setCalculatorVisible(false)} />
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
    </LandingPageContainer>
  )
}

export default React.memo(Performance)
