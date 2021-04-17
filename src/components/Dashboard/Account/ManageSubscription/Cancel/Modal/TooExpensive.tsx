import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Typography, Button, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReturnsCalculator from 'src/components//LandingPage/Modals/ReturnsCalculator'
import { Title, Bold } from './styles'
import { PRICE } from '~/common/constants'
import { CancelPagePropsType } from './types'

const ButtonIcon = styled(FontAwesomeIcon)`
  margin-right: 8px;
`

const CalculatorButton = styled(Button)`
  margin-bottom: 8px;
`

const { Paragraph } = Typography

const TooExpensive = ({ onCancel, cancelLoading, onApplyDiscount, applyCouponLoading }: CancelPagePropsType) => {
  const [calculatorVisible, setCalculatorVisible] = useState(false)
  const percentDiscount = 40
  const discountedPrice = 30
  const discountedMonths = 3

  return (
    <div>
      <Title>Weekly Stocktip is built to pay for itself in returns & dividends many times over.</Title>
      <Paragraph>Please see our returns calculator to see how the system pays for itself.</Paragraph>
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
        But no matter how good our returns and dividends are, we totally understand that they don't happen overnight,
        and not everyone can afford to pay ${PRICE}/month up front to begin with.
      </Paragraph>
      <Paragraph>
        If we can help you by cutting <Bold>{percentDiscount}% of the price</Bold> every month for the next{' '}
        <Bold>{discountedMonths} months</Bold> to give the system some time to start paying for itself in returns and
        dividends, would you stay?
      </Paragraph>
      <Paragraph>
        Just click "Yes" and we'll take care of the details and make sure you keep getting uninterrupted access to our
        signals at the cheaper rate.
      </Paragraph>
      <Space direction="vertical">
        <Button type="primary" onClick={onApplyDiscount} loading={applyCouponLoading}>
          Yes, I'll stay for the discounted price at ${discountedPrice} / month
        </Button>
        <Button type="primary" danger onClick={onCancel} loading={cancelLoading}>
          No I'll pass, cancel my subscription
        </Button>
      </Space>
    </div>
  )
}

export default TooExpensive
