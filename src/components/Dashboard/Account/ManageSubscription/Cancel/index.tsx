import { useState } from 'react'
import { Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CancelModal from './Modal'

type CancelSubscriptionProps = {
  subscription: any
  updateUser: any
  user: any
}

const CancelSubscription = ({ subscription, updateUser, user }: CancelSubscriptionProps) => {
  const [cancelModalVisible, setCancelModalVisible] = useState(false)

  if (!subscription?.id || subscription.canceled_at) return null
  if (subscription.cancel_at_period_end) return null

  const handleOnClick = () => {
    setCancelModalVisible(true)
  }

  return (
    <>
      <CancelModal
        open={cancelModalVisible}
        onModalDismiss={() => setCancelModalVisible(false)}
        subscription={subscription}
        updateUser={updateUser}
        user={user}
      />
      <Button
        onClick={handleOnClick}
        type="primary"
        ghost
        danger
        icon={<FontAwesomeIcon icon={['fad', 'times-octagon']} />}
      >
        Cancel subscription
      </Button>
    </>
  )
}

export default CancelSubscription
