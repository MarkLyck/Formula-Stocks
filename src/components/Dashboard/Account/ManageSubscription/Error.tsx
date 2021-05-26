import React from 'react'
import { StatusLine, Description } from './styles'
import { subscriptionType } from './types'

const SubscriptionError = ({ subscription }: { subscription?: subscriptionType }) => {
  if (subscription && subscription.id) return null

  return (
    <>
      <StatusLine>Something went wrong retrieving your subscription information.</StatusLine>
      <Description>Please contact support if you'd like to cancel / re-activate your subscription</Description>
    </>
  )
}

export default SubscriptionError
