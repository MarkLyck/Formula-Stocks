import React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Space, Typography } from 'antd'

const { Title, Paragraph } = Typography;

export interface CardProps {
    children: any;
    title: string;
    color: string;
    icon: string;
}

const IconContainer = styled.div`
    border-radius: 50%;
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 5px 30px rgba(18, 62, 138, 0.1);
    margin: 16px;
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    border-radius: 4px;
    border: 1px solid #ebedf5;
    box-shadow: 0 4px 14px 0 rgba(111, 120, 156, 0.08);
    box-sizing: border-box;
    padding: 16px 24px;
    text-align: center;
`

export const FeatureCard = ({ children, title, color, icon }: CardProps) => (
    <Card>
        <Space direction="vertical" align="center">
            <IconContainer>
                <FontAwesomeIcon icon={['fad', icon]} color={color} size="2x" />
            </IconContainer>
            <Title level={4}>{title}</Title>
            <Paragraph>
                {children}
            </Paragraph>
        </Space>
    </Card>
)
