import React from 'react'
import styled from '@emotion/styled'
import { Button, Input, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Title } from './styles'
import { CancelPagePropsType } from './types'

const { TextArea } = Input

const ButtonIcon = styled(FontAwesomeIcon)`
  margin-right: 8px;
`

const Other = ({ setCancelReason, cancelReason, onCancel, cancelLoading }: CancelPagePropsType) => {
  // @ts-ignore
  const handleTextAreaChange = (event: any) => setCancelReason(event.target.value)

  return (
    <>
      <Title>Please give us some feedback on what we could do better.</Title>
      <Space direction="vertical" style={{ width: '100%' }}>
        <TextArea onChange={handleTextAreaChange} placeholder="Feedback" value={cancelReason} />
        <Button type="primary" danger block disabled={!cancelReason} onClick={onCancel} loading={cancelLoading}>
          <ButtonIcon icon={['fad', 'times-octagon']} />
          Cancel subscription
        </Button>
      </Space>
    </>
  )
}

export default Other
