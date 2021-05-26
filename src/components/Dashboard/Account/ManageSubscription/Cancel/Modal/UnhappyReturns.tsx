import React, { useState } from 'react'
import styled from '@emotion/styled'
import { differenceInDays } from 'date-fns'
import { Typography, Button, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReturnsCalculator from 'src/components//LandingPage/Modals/ReturnsCalculator'
import { Title, Bold } from './styles'
import { EXPECTED_RETURN, WIN_RATIO, COMPANY_NAME } from '~/common/constants'
const { Paragraph } = Typography
import { CancelPagePropsType } from './types'

const ButtonIcon = styled(FontAwesomeIcon)`
  margin-right: 8px;
`
const CalculatorButton = styled(Button)`
  margin-bottom: 8px;
`

const UnhappyReturns = ({
  user,
  onCancel,
  cancelLoading,
  onApplyDiscount,
  applyCouponLoading,
}: CancelPagePropsType) => {
  const [calculatorVisible, setCalculatorVisible] = useState(false)
  const percentDiscount = 40
  const discountedPrice = 30
  const discountedMonths = 3

  const daysUserSubscribed = differenceInDays(new Date(), new Date(user.createdAt))
  const timeText =
    daysUserSubscribed < 14 ? `${daysUserSubscribed} days` : `${Math.floor(daysUserSubscribed / 7)} weeks`

  return (
    <div>
      <Title>We're sorry to hear you didn't see the returns you expected.</Title>
      <Paragraph>
        The average return for our stock picks have been <Bold>+{EXPECTED_RETURN}%</Bold>, vastly outperforming the
        stock market.
      </Paragraph>
      <Paragraph>
        But it looks like you have only been subscribed for <Bold>{timeText}</Bold>, and returns like that of course
        takes a lot longer to realize. Please see our returns calculator below for an example.
      </Paragraph>
      {!calculatorVisible ? (
        <CalculatorButton
          icon={<ButtonIcon icon="calculator" />}
          onClick={() => setCalculatorVisible(!calculatorVisible)}
        >
          Show Returns Calculator
        </CalculatorButton>
      ) : null}
      <ReturnsCalculator isVisible={calculatorVisible} onClose={() => setCalculatorVisible(false)} />
      <br />
      <Paragraph>
        We provide an algorithmic value/growth investment strategy. It is impossible to judge such investments in just{' '}
        {timeText}.
      </Paragraph>
      <Paragraph>
        If we sold our stock picks after just 1 week or 1 month. The results would not have any statistical
        significance. On average 55% of them have been positive in the very short term. Where as +{WIN_RATIO}% of them
        will have yielded a positive return a year or two later.
        <Bold>
          It is completely normal that our stock picks drops a bit in price in the short term before later doubling in
          value.
        </Bold>{' '}
        A short term loss for any single signal does not mean it won't have much greater long term gains.
      </Paragraph>
      <Paragraph>
        The system simply cannot be judged so hastily. This is why we are fully transparent about our long-term results,
        as well as providing our 2-year performance guarantee to all members. As that is how any value investment should
        be judged (over a period of years, not days or weeks)
      </Paragraph>
      <Paragraph>
        But we totally understand trust and most importantly patience doesn't come so easily. So we'll prove it to you.
      </Paragraph>
      <Paragraph>
        Simply click the "Yes" button below, and we'll give you a{' '}
        <Bold>
          {discountedMonths} months {percentDiscount}% discount
        </Bold>{' '}
        to {COMPANY_NAME}, allowing you to see how the system performs over a more reasonable period at a much lower
        price.
      </Paragraph>

      <Space direction="vertical">
        <Button type="primary" onClick={onApplyDiscount} loading={applyCouponLoading}>
          Yes, I'll give the system a chance at ${discountedPrice} / month
        </Button>
        <Button type="primary" danger onClick={onCancel} loading={cancelLoading}>
          No I'll pass, cancel my subscription
        </Button>
      </Space>
    </div>
  )
}

export default UnhappyReturns
