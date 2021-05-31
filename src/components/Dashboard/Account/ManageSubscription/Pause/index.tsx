import React, { useState } from 'react'
import { Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { Mixpanel } from '~/common/analytics/mixpanel'
import PauseModal from './Modal'

export interface PauseSubscriptionType {
  subscription: any
  user: any
}

const PauseSubscription = ({ subscription, user }: PauseSubscriptionType) => {
  const [modalVisible, setModalVisible] = useState(false)

  if (!subscription || !subscription.id || subscription.canceled_at) return null
  if (subscription.cancel_at_period_end) return null

  const handleOnClick = () => {
    // Mixpanel.track('Pause subscription click', {
    //   email: user.email,
    // })
    setModalVisible(true)
  }

  return (
    <React.Fragment>
      <PauseModal
        open={modalVisible}
        onModalDismiss={() => setModalVisible(false)}
        subscription={subscription}
        user={user}
      />
      <Button onClick={handleOnClick} icon={<FontAwesomeIcon icon={['fad', 'pause']} />}>
        Pause subscription
      </Button>
    </React.Fragment>
  )
}

export default PauseSubscription
