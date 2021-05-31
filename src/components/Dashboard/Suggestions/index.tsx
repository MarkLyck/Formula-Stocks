import React from 'react'
import { useQuery } from '@apollo/client'
import { Row, Col } from 'antd'
import useBreakpoint from '@w11r/use-breakpoint'
import useStore from 'src/lib/useStore'
import { SUGGESTIONS_QUERY } from 'src/common/queries'
import { LoadingError, DashboardHeader } from 'src/ui-components'
import Suggestion from './Suggestion'

const Suggestions = () => {
  const { 'isMobile-': isMobileMinus, 'isTablet-': isTabletMinus } = useBreakpoint()
  const plan = useStore((state: any) => state.plan)

  const { data, error } = useQuery(SUGGESTIONS_QUERY, {
    variables: {
      planName: plan,
    },
  })

  if (error) return <LoadingError error={error} />

  let colSpan = 8
  if (isTabletMinus) {
    colSpan = 12
  }
  if (isMobileMinus) {
    colSpan = 24
  }

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <DashboardHeader />
        </Col>
      </Row>
      <Row gutter={16}>
        {data?.signalsList.items.map((trade: any) => (
          <Suggestion trade={trade} key={trade.ticker + trade.action} colSpan={colSpan} />
        ))}
      </Row>
    </>
  )
}

export default Suggestions
