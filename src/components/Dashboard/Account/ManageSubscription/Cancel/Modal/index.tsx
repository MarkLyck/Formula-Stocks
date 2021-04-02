import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import { useLazyQuery } from '@apollo/client'
import { CANCEL_SUBSCRIPTION, UPDATE_SUBSCRIPTION } from '~/common/queries'

// pages
import CancelOptions from './CancelOptions'
import TooExpensive from './TooExpensive'
import UnhappyReturns from './UnhappyReturns'
import MoreSignals from './MoreSignals'
import NoTrust from './NoTrust'
import Other from './Other'
import Error from './Error'
import Success from './Success'
import DiscountSuccess from './DiscountSuccess'

type onCancelType = () => void

type CancelModalPropsType = {
  open: boolean
  onModalDismiss: () => void
  user: any
  subscription: any
  updateUser: (arg0: { variables: { id: string; cancelReason: string } }) => Promise<any>
}

const CancelModal = ({ open, onModalDismiss, user, subscription, updateUser }: CancelModalPropsType) => {
  let [page, setPage] = useState('OPTIONS')
  const [cancelReason, setCancelReason] = useState('')
  const [
    executeCancelSubscription,
    { called: cancelCalled, data: cancelData, loading: cancelLoading, error: cancelError },
  ] = useLazyQuery(CANCEL_SUBSCRIPTION)

  const [
    executeApplySubscriptionCoupon,
    { called: applyCouponCalled, data: applyCouponData, loading: applyCouponLoading, error: applyCouponError },
  ] = useLazyQuery(UPDATE_SUBSCRIPTION)

  if (cancelCalled && cancelError && page !== 'ERROR') {
    setPage('ERROR')
  } else if (cancelCalled && cancelData && !cancelError && page !== 'SUCCESS') {
    setPage('SUCCESS')
  } else if (applyCouponCalled && applyCouponData && page !== 'DISCOUNT_SUCCESS') {
    setPage('DISCOUNT_SUCCESS')
  }

  if (applyCouponError) {
    console.error('applyCouponError', applyCouponError)
  }

  const onCancel: onCancelType = async () => {
    executeCancelSubscription({
      variables: { subscriptionID: subscription.id, cancel_at_period_end: true, email: user.email },
    })

    await updateUser({ variables: { id: user.id, cancelReason } })
  }

  const onApplyDiscount = async () => {
    executeApplySubscriptionCoupon({
      variables: { subscriptionID: subscription.id, coupon: 'CANCEL_DISCOUNT_12_WEEKS' },
    })
  }

  const Pages = {
    OPTIONS: <CancelOptions setPage={setPage} />,
    TOO_EXPENSIVE: (
      <TooExpensive
        cancelLoading={cancelLoading}
        onCancel={onCancel}
        onApplyDiscount={onApplyDiscount}
        applyCouponLoading={applyCouponLoading}
      />
    ),
    UNHAPPY_RETURNS: (
      <UnhappyReturns
        user={user}
        cancelLoading={cancelLoading}
        onCancel={onCancel}
        onApplyDiscount={onApplyDiscount}
        applyCouponLoading={applyCouponLoading}
      />
    ),
    WANT_MORE_SIGNALS: (
      <MoreSignals cancelLoading={cancelLoading} onCancel={onCancel} onModalDismiss={onModalDismiss} />
    ),
    NO_TRUST: <NoTrust onCancel={onCancel} cancelLoading={cancelLoading} onModalDismiss={onModalDismiss} />,
    OTHER: (
      <Other
        setCancelReason={setCancelReason}
        cancelReason={cancelReason}
        cancelLoading={cancelLoading}
        onCancel={onCancel}
      />
    ),
    ERROR: <Error onModalDismiss={onModalDismiss} />,
    SUCCESS: <Success cancelReason={cancelReason} onModalDismiss={onModalDismiss} />,
    DISCOUNT_SUCCESS: <DiscountSuccess onModalDismiss={onModalDismiss} />,
  }

  const titleMap = {
    OPTIONS: "We're sorry to see you go!",
    TOO_EXPENSIVE: 'We can help with that!',
    UNHAPPY_RETURNS: "It's a little early...",
    WANT_MORE_SIGNALS: 'more signals?',
    NO_TRUST: 'How can we fix that?',
    OTHER: 'Please tell us!',
    ERROR: 'Whoops...',
    SUCCESS: "We're sorry to see you go!",
    DISCOUNT_SUCCESS: 'Discount applied!',
  }

  return (
    <Modal
      // @ts-ignore
      title={titleMap[page]}
      visible={open}
      onOk={() => {}}
      onCancel={onModalDismiss}
      width={page === 'OPTIONS' || page === 'OTHER' || page === 'SUCCESS' || page === 'DISCOUNT_SUCCESS' ? 500 : 800}
      footer={[
        <Button key="dismiss" onClick={onModalDismiss}>
          Dismiss
        </Button>,
      ]}
    >
      {/* @ts-ignore */}
      {Pages[page]}
    </Modal>
  )
}

export default CancelModal
