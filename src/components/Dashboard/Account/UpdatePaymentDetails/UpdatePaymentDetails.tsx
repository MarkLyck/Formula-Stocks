import React, { useState } from 'react'
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useLazyQuery } from '@apollo/client'
import { Card, Form, Space, Button } from 'antd'
// import { Mixpanel } from '~/common/analytics/mixpanel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from '@emotion/styled'
import { UPDATE_PAYMENT_DETAILS } from '~/common/queries'
import theme from 'src/lib/theme'
import { ErrorMessage } from '~/ui-components'

const stripeElementOptions = {
  style: {
    base: {
      padding: 12,
      fontSize: '1rem',
      fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: theme.palette.danger[600],
    },
  },
}

const Field = styled.div`
  position: relative;
`

const FieldIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
`

const StripeInputsContainer = styled.div`
  .stripe-input {
    padding: 16px 8px;
    padding-left: 38px;
    border: 1px solid gray;
    border-radius: 2px;
    color: rgba(0, 0, 0, 0.65);
    line-height: 1.5715;
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    transition: all 0.3s;
    margin-bottom: 20px;
    height: 51px;
    overflow: hidden;
  }
`

const StyledSpace = styled(Space)`
  width: 100%;
  .ant-space-item {
    width: 100%;
  }
`

const StyledForm = styled(Form)`
  .ant-form-item:last-child {
    margin-bottom: 0;
  }
  .ant-input-affix-wrapper-focused {
    svg {
      color: ${(props: any) => props.theme.palette.primary[600]};
    }
  }
`

const PaymentDetails = ({ customerID }: { customerID: string }) => {
  const [loading, setLoading] = useState(false)
  const [stripeError, setStripeError]: any = useState(null)
  const stripe = useStripe()
  const elements: any = useElements()
  const [
    executeUpdatePaymentDetails,
    { data: paymentDetailsData, loading: paymentDetailsLoading, error: paymentDetailsError },
  ] = useLazyQuery(UPDATE_PAYMENT_DETAILS)

  const handleSubmit = async () => {
    setLoading(true)
    // Mixpanel.track('Click update payment details')

    // Stripe uses this  to get all the card data
    const cardNumberElement = elements.getElement(CardNumberElement)
    stripe?.createToken(cardNumberElement).then((payload) => {
      if (payload.error) {
        setStripeError(payload.error.message)
        setLoading(false)
        return null
      }

      if (payload.token) {
        executeUpdatePaymentDetails({
          variables: {
            customerID,
            token: payload.token.id,
          },
        })
      }
    })
  }

  return (
    <Card title="Update payment details">
      {stripeError ? <ErrorMessage>{stripeError}</ErrorMessage> : null}
      {paymentDetailsError ? (
        <ErrorMessage>Something went wrong, please check your details and try again</ErrorMessage>
      ) : null}
      <StyledForm name="update-payment-details" onFinish={handleSubmit} size="large">
        <StripeInputsContainer>
          <Field>
            <FieldIcon icon={['fad', 'credit-card']} />
            {/* @ts-ignore */}
            <CardNumberElement className="stripe-input" options={stripeElementOptions} />
          </Field>

          <StyledSpace size="middle">
            <Field>
              <FieldIcon icon={['fad', 'calendar']} />
              {/* @ts-ignore */}
              <CardExpiryElement className="stripe-input" options={stripeElementOptions} />
            </Field>
            <Field>
              <FieldIcon icon={['fad', 'lock-alt']} />
              {/* @ts-ignore */}
              <CardCvcElement className="stripe-input" options={stripeElementOptions} />
            </Field>
          </StyledSpace>
        </StripeInputsContainer>

        {!paymentDetailsData ? (
          <Button htmlType="submit" loading={loading || paymentDetailsLoading}>
            Update payment details
          </Button>
        ) : (
          <div>success</div>
        )}
      </StyledForm>
    </Card>
  )
}

export default PaymentDetails
