import React from 'react'
import { useLazyQuery } from '@apollo/client'
import { format } from 'date-fns'
import { Button } from 'antd'
import { CANCEL_SUBSCRIPTION } from '~/common/queries'
import { subscriptionType } from '../types'
import { StatusLine, Description } from '../styles'

type executeReactivateSubscriptionArgsType = {
  variables: {
    subscriptionID: string
    cancel_at_period_end: boolean
    email: string
  }
}

type executeReactivateSubscription = (arg0: executeReactivateSubscriptionArgsType) => Promise<any>

const reactivateSubscription = async (
  subscription: subscriptionType,
  executeReactivateSubscription: executeReactivateSubscription,
  user: any
) => {
  await executeReactivateSubscription({
    variables: { subscriptionID: subscription.id, cancel_at_period_end: false, email: user.email },
  })
}

const ReactivateSubscription = ({ subscription, user }: any) => {
  if (!subscription || !subscription.canceled_at) return null
  //  || subscription.status !== 'active'
  const [executeReactivateSubscription, { called, data, loading, error }] = useLazyQuery(CANCEL_SUBSCRIPTION)

  const nowInUnixSeconds = Date.now() / 1000

  if (error && error.graphQLErrors.length) {
    const stripeError = JSON.parse(error.graphQLErrors[0].message)
    console.error(stripeError)
    alert(stripeError.raw.message)
  }

  const success = called && data && !error
  // if success force page refresh
  if (success) setTimeout(() => location.reload(), 200)

  return (
    <>
      {subscription.cancel_at_period_end && subscription.current_period_end > nowInUnixSeconds && (
        <>
          <StatusLine>
            Your subscription is ending on: {format(new Date(subscription.current_period_end * 1000), 'MMMM do yyyy')}
          </StatusLine>
        </>
      )}
      {subscription.ended_at && (
        <>
          <StatusLine>
            Your subscription ended on: {format(new Date(subscription.ended_at * 1000), 'MMMM do yyyy')}
          </StatusLine>
          <Description>Contact support to re-activate your subscription</Description>
        </>
      )}
      {subscription.cancel_at_period_end && subscription.current_period_end > nowInUnixSeconds && (
        <Button
          type="primary"
          color={success ? 'secondary' : 'primary'}
          disabled={success}
          loading={loading}
          // @ts-ignore
          onClick={() => reactivateSubscription(subscription, executeReactivateSubscription, user)}
        >
          {loading && 'Reactivating subscription'}
          {success && 'Successfully reactivated subscription!'}
          {!loading && !success && 'Reactivate subscription'}
        </Button>
      )}
    </>
  )
}

export default ReactivateSubscription
