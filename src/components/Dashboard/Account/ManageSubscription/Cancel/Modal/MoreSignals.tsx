import React from 'react'
import { Typography, Button, Space } from 'antd'
import { Title, Bold } from './styles'
import { CancelPagePropsType } from './types'

const { Paragraph } = Typography

const MoreSignals = ({ onCancel, cancelLoading, onModalDismiss }: CancelPagePropsType) => {
  return (
    <div>
      <Title>1 great signal is better than 10 good ones! Here's why.</Title>
      <Paragraph>
        Do you want to sit in front of a computer analyzing 100's of stocks every single week? Trust us when we say that
        takes a long time to do accurately (we've spent over a decade doing just that), in fact, we believe humans are
        inherently bad at this due to the many biases we inhabit, and the last thing you want is to end up buying a bad
        apple because of a "gut feeling".
      </Paragraph>
      <Paragraph>
        The very thing our system accomplishes is to give every single stock a score between -100 to +100 that
        accurately with a high statistical significance shows the future long-term stock performance, from that analysis
        we are able to provide the single best one in our system every week with sufficient diversification and low
        risk.
      </Paragraph>
      <Paragraph>
        We definitely could provide e.g. 10 signals every week, but you would simply see lower win-ratios and lower
        overall performance if you invested in all of them. Our research has proven this time and time again.
      </Paragraph>
      <Paragraph>
        However, if you do want to invest in more signals or do your own research, we've provided full access to our AI
        Reports section, which shows the score of every stock with enough data on to evaluate. You can simply use these
        scores to e.g. invest only in stocks with an AI Score {'>'} 80
      </Paragraph>
      <Title>Some helpful statistics.</Title>
      <Paragraph>
        The common return of the average stock over the last. ~100 years was a loss of -100%. Less than 48.4% of stocks
        out there delivered a monthly positive result.
      </Paragraph>
      <Paragraph>
        Out of all 26,000 stocks analyzed only. 1,000 of them accounted for all of the profits in stocks since 1926 and{' '}
        <Bold>just 86 stocks (one-third of 1%)</Bold> were responsible for half of those gains.
      </Paragraph>
      <Paragraph>
        Our system specializes in finding the tiny percentage of stocks that increase in value significantly over time
        with a high enough statistical probability of doing so. We do not recommend spreading out the investments too
        thinly. It is per definition impossible to beat the market if you are invested in the entire market.
      </Paragraph>
      <Paragraph>
        That being said, obviously don't invest everything in a single stock. We recommend dollar-cost averaging every
        week for longer period, depending on your personal situation.
      </Paragraph>
      <Space direction="vertical">
        <Button onClick={onModalDismiss}>Return to dashboard</Button>
        <Button type="primary" danger onClick={onCancel} loading={cancelLoading}>
          Cancel my subscription anyway
        </Button>
      </Space>
    </div>
  )
}

export default MoreSignals
