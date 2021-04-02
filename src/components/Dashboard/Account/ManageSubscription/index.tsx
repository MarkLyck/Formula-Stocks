import React from 'react'
import styled from '@emotion/styled'
import { Card } from 'antd'

import Error from './Error'
import Cancel from './Cancel'
import Pause from './Pause'
import ReActivate from './ReActivate'

import { subscriptionType } from './types'

interface SubscriptionPropsType {
  subscription?: subscriptionType
  updateUser: () => void
  user: any
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  > button {
    width: calc(50% - 4px);
  }

  svg {
    margin-right: 8px;
  }
`

const Subscription = ({ subscription, updateUser, user }: SubscriptionPropsType) => {
  return (
    <Card title="Manage Subscription">
      <Error subscription={subscription} />
      <ButtonContainer>
        <Pause subscription={subscription} user={user} />
        <Cancel subscription={subscription} updateUser={updateUser} user={user} />
      </ButtonContainer>
      <ReActivate subscription={subscription} user={user} />
    </Card>
  )
}

export default Subscription
