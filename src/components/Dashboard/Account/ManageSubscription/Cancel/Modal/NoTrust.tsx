import React from 'react'
import { Typography, Button, Space } from 'antd'
import { Title } from './styles'
import { CancelPagePropsType } from './types'

const { Paragraph } = Typography

const NoTrust = ({ onCancel, cancelLoading, onModalDismiss }: CancelPagePropsType) => {
  return (
    <>
      <Title>We totally understand and we'll help!</Title>
      <Paragraph>
        Short of providing our +100 tightly guarded algorithms to the public, we aim to be fully transparent.
      </Paragraph>
      <Paragraph>
        We started developing the system in 2003 and it's been running live since 2009 (more than a decade!). So in
        turn, we have ample amounts of data and information available. All you have to do is ask.
      </Paragraph>
      <Paragraph>
        Not only do we have statics and information on the basics of how the system works, but our results have been
        verified by PwC (a well known 3rd party financial auditor)
      </Paragraph>
      <Paragraph>
        Beyond that our system has been used by the public for years with the exact same results as we've been seeing.
        In short, it is no longer theory or guesswork whether the algorithms that power Weekly Stocktip works. They do,
        and they are built on timeless principles that will continue to work in the future.
      </Paragraph>
      <Paragraph>
        But we do realize trust doesn't always come that easily. So let's talk! Simply click the "Support button" and
        ask us for any information or proof that we can provide (we likely have it somewhere).
      </Paragraph>
      <Paragraph>
        We also have a large mailing list we have been sending our signals to for over a year now and any sell signals
        that our subscribers see are also published monthly on our homepage for the public to see.
      </Paragraph>
      <Space direction="vertical">
        <Button onClick={onModalDismiss}>Return to dashboard</Button>
        <Button type="primary" danger onClick={onCancel} loading={cancelLoading}>
          Cancel my subscription anyway
        </Button>
      </Space>
    </>
  )
}

export default NoTrust
