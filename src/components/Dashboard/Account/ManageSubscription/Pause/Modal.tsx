import React, { useState } from 'react'
import styled from '@emotion/styled'
import { getUnixTime } from 'date-fns'
import { useLazyQuery } from '@apollo/client'
import { Modal, Button, DatePicker, Space } from 'antd'
import { UPDATE_SUBSCRIPTION } from '~/common/queries'
import Success from './Success'

const ActionContainer = styled.div`
  display: flex;
  > button {
    margin-left: 8px;
  }
`

interface PauseModalType {
  open: boolean
  onModalDismiss: () => void
  user: any
  subscription: any
}

const PauseModal = ({ open, onModalDismiss, subscription }: PauseModalType) => {
  const [date, setDate]: any = useState(null)
  const [executePauseSubscription, { data, loading, error }] = useLazyQuery(UPDATE_SUBSCRIPTION)

  const onChange = (_date: any, dateString: string) => {
    if (dateString) {
      // @ts-ignore
      setDate(new Date(dateString))
    } else {
      setDate(null)
    }
  }

  const onSubmit = () => {
    executePauseSubscription({
      variables: { subscriptionID: subscription.id, pause_collection: String(getUnixTime(date)) },
    })
  }

  return (
    <Modal
      title="Pause subscription"
      visible={open}
      onOk={() => {}}
      onCancel={onModalDismiss}
      width={600}
      footer={[
        <Button key="dismiss" onClick={onModalDismiss}>
          Dismiss
        </Button>,
      ]}
    >
      {!data && error ? <p>Something went wrong, please contact support</p> : null}
      {!data && !error ? (
        <Space direction="vertical">
          <p>Pause subscription until</p>
          <ActionContainer>
            <DatePicker onChange={onChange} />
            <Button type="primary" onClick={onSubmit} disabled={!date} loading={loading}>
              Pause subscription
            </Button>
          </ActionContainer>
        </Space>
      ) : null}
      {data ? <Success date={date} onModalDismiss={onModalDismiss} /> : null}
    </Modal>
  )
}

export default PauseModal
