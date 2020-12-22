import React from 'react'
import styled from '@emotion/styled'
import { Modal, Space } from 'antd';

const StyledSpace = styled(Space)`
    width: 100%;
`

interface GuaranteeDialogProps {
    isVisible: boolean;
    onClose: () => any;
}

const Paragraph = styled.p`
    margin: 0;
    text-align: center;
`

const StatisticsDialog = ({ isVisible, onClose }: GuaranteeDialogProps) => (
    <Modal title="Advanced statistics" visible={isVisible} onOk={onClose} onCancel={onClose} footer={null} width={600}>
        <StyledSpace direction="vertical" size="middle">
            <Paragraph>Need more statistics? Contact us</Paragraph>
        </StyledSpace>
    </Modal >
)

export default StatisticsDialog
