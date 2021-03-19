import React from 'react'
import { useQuery } from '@apollo/client'
import { Row } from 'antd'
import { useAtom, planAtom } from 'src/atoms'
import { SUGGESTIONS_QUERY } from 'src/common/queries'
import { LoadingError } from 'src/ui-components'
import Trade from './Suggestion'

const Suggestions = () => {
  const [plan] = useAtom(planAtom)

  const { data, error } = useQuery(SUGGESTIONS_QUERY, {
    variables: {
      planName: plan,
    },
  })

  if (error) return <LoadingError error={error} />

  return (
    <Row gutter={16}>
      {data?.signalsList.items.map((trade: any) => (
        <Trade trade={trade} key={trade.ticker + trade.action} />
      ))}
    </Row>
  )
}

export default Suggestions
