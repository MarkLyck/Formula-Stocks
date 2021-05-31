import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { STRIPE_API_KEY } from '~/common/constants'
import UpdatePaymentDetails from './UpdatePaymentDetails'

const stripePromise = loadStripe(STRIPE_API_KEY)

const Wrapper = (props: any) => (
  <Elements stripe={stripePromise}>
    <UpdatePaymentDetails {...props} />
  </Elements>
)
export default Wrapper
