import { Row, Col } from 'antd'
import { useTheme } from '@emotion/react'
import { useQuery } from '@apollo/client'
import useBreakpoint from '@w11r/use-breakpoint'

import { numberFormatter } from 'src/common/utils/formatters'
import { STATISTICS, STATISTICS_SINCE_LAUNCH } from 'src/common/queries'
import { StatBox } from 'src/ui-components'

const GUTTER = 16

const Statistics = () => {
  const theme = useTheme()
  const { data: statisticsData } = useQuery(STATISTICS)
  const { data: launchStatsData } = useQuery(STATISTICS_SINCE_LAUNCH)
  const { 'isTablet-': isTabletMinus } = useBreakpoint()

  const statistics = statisticsData ? statisticsData.statisticsList.items[0] : {}
  const launchStatistics = launchStatsData?.statisticsSinceLaunchesList?.items[0] || {}
  const totalReturn = launchStatistics.totalReturn

  let COL_SPAN = isTabletMinus ? 12 : 6

  return (
    <Row gutter={[GUTTER, GUTTER]} style={{ marginBottom: 24 }}>
      <Col span={COL_SPAN}>
        <StatBox
          label="Total return"
          value={!totalReturn ? '--' : `+${numberFormatter.format(totalReturn?.toFixed(0))}%`}
          backgroundColor={theme.palette.primary[600]}
          color="white"
          icon={['fad', 'chart-line']}
          tooltip="Total portfolio return since launch"
        />
      </Col>
      <Col span={COL_SPAN}>
        <StatBox
          label="Annual growth rate"
          value={statistics.cAGR ? `+${statistics.cAGR}%` : '--'}
          backgroundColor="white"
          color={theme.palette.primary[600]}
          icon={['fad', 'dollar-sign']}
          tooltip="Compounded annual growth rate"
        />
      </Col>
      <Col span={COL_SPAN}>
        <StatBox
          label="Sold with profit"
          value={!statistics.winLossRatio ? '--' : `${statistics.winLossRatio.toFixed(2)}%`}
          backgroundColor={theme.palette.success[600]}
          color="#fff"
          icon={['fad', 'chart-pie']}
          tooltip="% of trades sold with a profit"
        />
      </Col>
      <Col span={COL_SPAN}>
        <StatBox
          label="Gain to Pain ratio"
          value={statistics.gainToPainRatio ? statistics.gainToPainRatio : '--'}
          backgroundColor="white"
          color={theme.palette.success[600]}
          icon={['fad', 'balance-scale-right']}
          tooltip="Higher reward, lower risk"
        />
      </Col>
    </Row>
  )
}

export default Statistics
