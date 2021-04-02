import React from 'react'
import { Button } from 'antd'
import { Title } from './styles'
import { Space } from '~/ui-components'
import { Mixpanel } from '~/common/analytics/mixpanel'

type CancelOptionsPropsType = {
  setPage: any
}

const CancelOptions = ({ setPage }: CancelOptionsPropsType) => {
  const handleClick = (reason: string) => {
    Mixpanel.track('Cancel Reason Click', {
      reason,
    })
    setPage(reason)
  }

  return (
    <>
      <Title>Please let us know why you are canceling your subscription</Title>
      <Space direction="vertical" fullWidth>
        <Button block type="default" onClick={() => handleClick('TOO_EXPENSIVE')}>
          It's too expensive
        </Button>
        <Button block type="default" onClick={() => handleClick('UNHAPPY_RETURNS')}>
          Not happy with returns
        </Button>
        <Button block type="default" onClick={() => handleClick('WANT_MORE_SIGNALS')}>
          I want more signals
        </Button>
        <Button block type="default" onClick={() => handleClick('NO_TRUST')}>
          I don't trust it
        </Button>
        <Button block type="dashed" onClick={() => handleClick('OTHER')}>
          Other
        </Button>
      </Space>
    </>
  )
}

export default CancelOptions
